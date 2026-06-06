import { NextRequest, NextResponse } from "next/server";
import { saveSubscription, deleteSubscription } from "@/lib/push";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      endpoint: string;
      keys: { p256dh: string; auth: string };
    };

    if (!body.endpoint || !body.keys?.p256dh || !body.keys?.auth) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }

    await saveSubscription({
      endpoint: body.endpoint,
      p256dh: body.keys.p256dh,
      auth: body.keys.auth,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { endpoint } = (await req.json()) as { endpoint: string };
    if (endpoint) await deleteSubscription(endpoint);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
