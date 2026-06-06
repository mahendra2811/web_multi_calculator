"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Smartphone, Monitor, CheckCircle2, Wifi, Zap, Shield } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Platform = "ios" | "android" | "desktop" | "installed";

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(display-mode: standalone)").matches) return "installed";
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

const BENEFITS = [
  { icon: Wifi, label: "Works Offline", color: "text-success" },
  { icon: Zap, label: "Instant Access", color: "text-accent" },
  { icon: Shield, label: "100% Private", color: "text-primary" },
];

const IOS_STEPS = [
  { icon: "🌐", label: "Open in Safari", sub: "Chrome on iOS won't work" },
  { icon: "⬆️", label: "Tap the Share button", sub: "Bottom toolbar in Safari" },
  { icon: "➕", label: "Add to Home Screen", sub: "Scroll down in the sheet" },
  { icon: "✅", label: "Tap Add", sub: "App appears on your Home Screen" },
];

export function PwaInstallSection() {
  const [platform, setPlatform] = useState<Platform>(() =>
    typeof window !== "undefined" ? detectPlatform() : "desktop",
  );
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [state, setState] = useState<"idle" | "installing" | "done">("idle");

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setPlatform((p) => (p === "installed" ? "installed" : "android"));
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    setState("installing");
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === "accepted") {
      setState("done");
      setPlatform("installed");
    } else {
      setState("idle");
    }
  };

  if (platform === "installed") {
    return (
      <div className="border-success/20 bg-success/5 flex items-center justify-center gap-3 rounded-2xl border px-6 py-4">
        <CheckCircle2 className="text-success h-5 w-5 shrink-0" />
        <p className="text-success text-sm font-medium">
          CalcMaster is installed — enjoy instant offline access!
        </p>
      </div>
    );
  }

  return (
    <section className="border-primary/20 from-primary/5 via-surface to-secondary/5 relative overflow-hidden rounded-3xl border bg-gradient-to-br p-6 sm:p-8">
      {/* Background orbs */}
      <div className="bg-primary/8 pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl" />
      <div className="bg-secondary/8 pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <Image
              src="/icons/icon-96.png"
              alt="CalcMaster"
              width={60}
              height={60}
              className="ring-primary/20 rounded-2xl shadow-lg ring-2"
            />
            <span className="bg-success ring-background absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2">
              ✓
            </span>
          </div>
          <div>
            <h2 className="text-text text-xl font-bold">
              Install <span className="text-primary">CalcMaster</span>
            </h2>
            <p className="text-text-secondary text-sm">65+ calculators — use like an app</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          {BENEFITS.map(({ icon: Icon, label, color }) => (
            <span
              key={label}
              className="border-border bg-background/60 text-text-secondary flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
            >
              <Icon className={`h-3.5 w-3.5 shrink-0 ${color}`} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Platform cards */}
      <div
        className={`relative grid gap-4 ${platform === "ios" ? "mx-auto max-w-md grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
      >
        {/* Android / Desktop */}
        {platform !== "ios" && (
          <div className="border-border bg-background/60 space-y-4 rounded-2xl border p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-xl">
                {platform === "android" ? (
                  <Smartphone className="text-primary h-5 w-5" />
                ) : (
                  <Monitor className="text-primary h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-text text-sm font-semibold">
                  {platform === "android" ? "Android / Chrome" : "Desktop Browser"}
                </p>
                <p className="text-text-secondary text-xs">One-tap install</p>
              </div>
            </div>

            {deferred ? (
              <button
                onClick={handleInstall}
                disabled={state === "installing"}
                className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <Download className="h-4 w-4 shrink-0" />
                {state === "installing" ? "Installing…" : "Install App — It's Free"}
              </button>
            ) : (
              <ol className="space-y-2">
                {[
                  { n: "1", t: "Open this site in Chrome" },
                  { n: "2", t: "Click the ⊕ icon in the address bar" },
                  { n: "3", t: 'Click "Install" in the popup' },
                ].map(({ n, t }) => (
                  <li key={n} className="flex items-start gap-2.5 text-sm">
                    <span className="bg-primary/15 text-primary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold">
                      {n}
                    </span>
                    <span className="text-text-secondary">{t}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        {/* iOS */}
        <div className="border-border bg-background/60 space-y-4 rounded-2xl border p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="bg-surface flex h-9 w-9 items-center justify-center rounded-xl">
              <Smartphone className="text-text-secondary h-5 w-5" />
            </div>
            <div>
              <p className="text-text text-sm font-semibold">iPhone / iPad</p>
              <p className="text-text-secondary text-xs">Add to Home Screen via Safari</p>
            </div>
          </div>
          <ol className="space-y-3">
            {IOS_STEPS.map(({ icon, label, sub }, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="bg-surface flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl leading-none">
                  {icon}
                </span>
                <div>
                  <p className="text-text text-sm leading-tight font-medium">{label}</p>
                  <p className="text-text-secondary text-xs">{sub}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="text-text-tertiary relative mt-5 text-center text-xs">
        No App Store · No download · Works on Android, iOS &amp; Desktop
      </p>
    </section>
  );
}
