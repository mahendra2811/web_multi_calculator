import webpush from "web-push";

let configured = false;

export function configurePush() {
  if (configured) return;
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  const sub = process.env.VAPID_SUBJECT;
  if (!pub || !priv || !sub) return;
  webpush.setVapidDetails(sub, pub, priv);
  configured = true;
}

export { webpush };

export interface PushSubscriptionRecord {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
}

// In-memory store when Supabase is not configured (works for single-server dev/preview)
const memoryStore: PushSubscriptionRecord[] = [];

// Server-side Supabase client — uses service role key, never exposed to browser
function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // SUPABASE_SERVICE_ROLE_KEY is server-only (no NEXT_PUBLIC_ prefix)
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export async function saveSubscription(sub: PushSubscriptionRecord): Promise<void> {
  const cfg = getServerSupabase();
  if (cfg) {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(cfg.url, cfg.key);
    await sb
      .from("push_subscriptions")
      .upsert(
        { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
        { onConflict: "endpoint" },
      );
    return;
  }
  // Fallback: memory (dev without Supabase only)
  const idx = memoryStore.findIndex((s) => s.endpoint === sub.endpoint);
  if (idx >= 0) memoryStore[idx] = sub;
  else memoryStore.push(sub);
}

export async function getAllSubscriptions(): Promise<PushSubscriptionRecord[]> {
  const cfg = getServerSupabase();
  if (cfg) {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(cfg.url, cfg.key);
    const { data } = await sb.from("push_subscriptions").select("endpoint, p256dh, auth");
    return (data as PushSubscriptionRecord[]) ?? [];
  }
  return [...memoryStore];
}

export async function deleteSubscription(endpoint: string): Promise<void> {
  const cfg = getServerSupabase();
  if (cfg) {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(cfg.url, cfg.key);
    await sb.from("push_subscriptions").delete().eq("endpoint", endpoint);
    return;
  }
  const idx = memoryStore.findIndex((s) => s.endpoint === endpoint);
  if (idx >= 0) memoryStore.splice(idx, 1);
}

export async function sendPushToAll(
  payload: PushPayload,
): Promise<{ sent: number; failed: number }> {
  configurePush();
  const subs = await getAllSubscriptions();
  let sent = 0;
  let failed = 0;
  const body = JSON.stringify(payload);

  await Promise.allSettled(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          body,
        );
        sent++;
      } catch (err: unknown) {
        failed++;
        // Remove expired / invalid subscriptions
        if (err && typeof err === "object" && "statusCode" in err) {
          const code = (err as { statusCode: number }).statusCode;
          if (code === 410 || code === 404) {
            await deleteSubscription(sub.endpoint);
          }
        }
      }
    }),
  );

  return { sent, failed };
}
