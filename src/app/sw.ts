/// <reference lib="webworker" />

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, NetworkFirst, Serwist, StaleWhileRevalidate } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: { cleanupOutdatedCaches: true },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  disableDevLogs: true,
  runtimeCaching: [
    // Content-hashed, so immutable by construction.
    {
      matcher: ({ url }) => url.pathname.startsWith("/_next/static/"),
      handler: new CacheFirst({
        cacheName: "next-static-cache",
        plugins: [new ExpirationPlugin({ maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 365 })],
      }),
    },
    {
      matcher: ({ url }) => url.pathname.startsWith("/icons/") || url.pathname.startsWith("/logo/"),
      handler: new CacheFirst({
        cacheName: "static-images-cache",
        plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 })],
      }),
    },
    {
      matcher: ({ url }) =>
        url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com",
      handler: new StaleWhileRevalidate({
        cacheName: "google-fonts-cache",
        plugins: [new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 })],
      }),
    },
    // Fresh when online, instant when not. The 5s timeout is what makes a bad
    // connection feel offline-fast rather than hung.
    {
      matcher: ({ request }) => request.mode === "navigate",
      handler: new NetworkFirst({
        cacheName: "pages-cache",
        networkTimeoutSeconds: 5,
        plugins: [new ExpirationPlugin({ maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 7 })],
      }),
    },
    ...defaultCache,
  ],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();

// ---------------------------------------------------------------------------
// Web push. Ported from the old public/sw-push.js, which @ducanh2912/next-pwa
// used to merge in via importScripts. Serwist has no equivalent merge step, so
// the handlers live here directly.
// ---------------------------------------------------------------------------
interface PushPayload {
  title?: string;
  body?: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
}

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload: PushPayload;
  try {
    payload = event.data.json() as PushPayload;
  } catch {
    payload = { title: "CalcMaster", body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(payload.title ?? "CalcMaster", {
      body: payload.body ?? "",
      icon: payload.icon ?? "/icons/icon-192.png",
      badge: payload.badge ?? "/icons/icon-96.png",
      tag: payload.tag ?? "calcmaster",
      data: { url: payload.url ?? "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;

  const url = (event.notification.data as { url?: string } | undefined)?.url ?? "/";

  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          await client.navigate(url);
          await client.focus();
          return;
        }
      }
      await self.clients.openWindow(url);
    })(),
  );
});

self.addEventListener("message", (event) => {
  const data = (event as ExtendableMessageEvent).data as { type?: string } | null;
  if (data?.type === "SKIP_WAITING") {
    void self.skipWaiting();
  }
});
