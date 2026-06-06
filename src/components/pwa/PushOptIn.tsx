"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

const OPT_IN_KEY = "calcmaster:push-dismissed";
const SUBSCRIBED_KEY = "calcmaster:push-subscribed";
const USE_COUNT_KEY = "calcmaster:use-count";

export function usePushSubscription() {
  const [subscribed, setSubscribed] = useState(
    () => typeof window !== "undefined" && localStorage.getItem(SUBSCRIBED_KEY) === "1",
  );

  const subscribe = async (): Promise<boolean> => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return false;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return false;

    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) return false;

    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    const sub =
      existing ??
      (await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey,
      }));

    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub.toJSON()),
    });

    localStorage.setItem(SUBSCRIBED_KEY, "1");
    setSubscribed(true);
    return true;
  };

  const unsubscribe = async () => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      await fetch("/api/push/subscribe", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: sub.endpoint }),
      });
      await sub.unsubscribe();
    }
    localStorage.removeItem(SUBSCRIBED_KEY);
    setSubscribed(false);
  };

  return { subscribed, subscribe, unsubscribe };
}

export function PushOptIn() {
  const [show, setShow] = useState(false);
  const { subscribed, subscribe } = usePushSubscription();

  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") return;
    if (localStorage.getItem(OPT_IN_KEY)) return;
    if (subscribed) return;

    // Show after user has used 3+ calculators
    const count = Number(localStorage.getItem(USE_COUNT_KEY) ?? "0");
    if (count < 3) return;

    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, [subscribed]);

  const handleAllow = async () => {
    const ok = await subscribe();
    setShow(false);
    if (!ok) localStorage.setItem(OPT_IN_KEY, "1");
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(OPT_IN_KEY, "1");
  };

  if (!show || subscribed) return null;

  return (
    <div className="animate-in slide-in-from-top-4 fixed top-20 right-4 left-4 z-50 mx-auto max-w-sm duration-300">
      <div className="border-primary/20 bg-surface-elevated/95 rounded-2xl border p-4 shadow-xl backdrop-blur-md">
        <div className="mb-3 flex items-start gap-3">
          <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <Bell className="text-primary h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-text text-sm font-semibold">Get daily calculator tips</p>
            <p className="text-text-secondary mt-0.5 text-xs">
              SIP insights, tax reminders & more — once a day, no spam
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-text-secondary hover:text-text rounded-lg p-1 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAllow}
            className="bg-primary text-primary-foreground flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
          >
            <Bell className="h-3.5 w-3.5" />
            Allow Notifications
          </button>
          <button
            onClick={handleDismiss}
            className="text-text-secondary hover:bg-surface rounded-xl px-4 py-2.5 text-xs transition-colors"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
