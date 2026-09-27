"use client";

import { useEffect } from "react";

/**
 * Registers the Serwist-generated service worker.
 *
 * The previous @ducanh2912/next-pwa setup registered it for us via
 * `register: true`. Serwist's webpack plugin only *builds* public/sw.js — the
 * registration is ours to do, and without it the app is not installable.
 */
export function ServiceWorkerRegister(): null {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      // Registration failures are non-fatal — the site still works online.
    });
  }, []);

  return null;
}
