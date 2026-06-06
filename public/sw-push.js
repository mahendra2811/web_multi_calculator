// Push notification handler — imported by the main service worker
// @ducanh2912/next-pwa merges this with its generated SW

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "CalcMaster", body: event.data.text() };
  }

  const { title, body, icon, badge, url, tag } = payload;

  event.waitUntil(
    self.registration.showNotification(title ?? "CalcMaster", {
      body: body ?? "",
      icon: icon ?? "/icons/icon-192.png",
      badge: badge ?? "/icons/icon-96.png",
      tag: tag ?? "calcmaster",
      renotify: true,
      data: { url: url ?? "/" },
      actions: [
        { action: "open", title: "Open" },
        { action: "dismiss", title: "Dismiss" },
      ],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "dismiss") return;

  const url = event.notification.data?.url ?? "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.navigate(url);
            return client.focus();
          }
        }
        return clients.openWindow(url);
      })
  );
});

// Allow SW to skip waiting immediately when told
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
