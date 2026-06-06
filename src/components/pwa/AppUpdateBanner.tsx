"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export function AppUpdateBanner() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.ready.then((reg) => {
      const check = () => {
        if (reg.waiting) setWaiting(reg.waiting);
      };
      check();
      reg.addEventListener("updatefound", () => {
        const newSW = reg.installing;
        newSW?.addEventListener("statechange", () => {
          if (newSW.state === "installed" && navigator.serviceWorker.controller) {
            setWaiting(newSW);
          }
        });
      });
    });
  }, []);

  const handleUpdate = () => {
    if (!waiting) return;
    waiting.postMessage({ type: "SKIP_WAITING" });
    waiting.addEventListener("statechange", () => {
      if (waiting.state === "activated") window.location.reload();
    });
  };

  if (!waiting) return null;

  return (
    <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-24 left-4 z-50 mx-auto max-w-sm duration-300 md:right-6 md:bottom-8 md:left-auto">
      <div className="border-primary/30 bg-surface-elevated/95 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md">
        <RefreshCw className="text-primary h-4 w-4 shrink-0" />
        <p className="text-text flex-1 text-xs font-medium">New version available</p>
        <button
          onClick={handleUpdate}
          className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
