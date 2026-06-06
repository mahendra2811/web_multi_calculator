"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "calcmaster:install-dismissed";
const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000;

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed && Date.now() - Number(dismissed) < DISMISS_TTL) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 8000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    setShow(false);
    if (outcome === "dismissed") localStorage.setItem(DISMISS_KEY, Date.now().toString());
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  };

  if (!show) return null;

  return (
    <div className="animate-in slide-in-from-bottom-4 fixed right-4 bottom-20 left-4 z-50 mx-auto max-w-sm duration-300 md:right-6 md:bottom-6 md:left-auto">
      <div className="border-border bg-surface-elevated/95 rounded-2xl border p-4 shadow-2xl shadow-black/30 backdrop-blur-md">
        <div className="mb-3 flex items-start gap-3">
          <Image
            src="/icons/icon-96.png"
            alt="CalcMaster"
            width={44}
            height={44}
            className="shrink-0 rounded-xl"
          />
          <div className="min-w-0 flex-1">
            <p className="text-text text-sm leading-tight font-semibold">Install CalcMaster</p>
            <p className="text-text-secondary mt-0.5 text-xs">
              Works offline · Instant access · Free
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-text-secondary hover:text-text hover:bg-surface shrink-0 rounded-lg p-1 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="bg-primary text-primary-foreground flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold shadow transition-opacity hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5 shrink-0" />
            Install Free
          </button>
          <button
            onClick={handleDismiss}
            className="text-text-secondary hover:bg-surface rounded-xl px-4 py-2.5 text-xs transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
