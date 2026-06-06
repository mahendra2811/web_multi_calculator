"use client";

import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";

export function OfflineBanner() {
  const [status, setStatus] = useState<"online" | "offline" | "back-online">(() =>
    typeof window !== "undefined" && !navigator.onLine ? "offline" : "online",
  );

  useEffect(() => {
    const onOffline = () => setStatus("offline");
    const onOnline = () => {
      setStatus("back-online");
      setTimeout(() => setStatus("online"), 3000);
    };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  if (status === "online") return null;

  return (
    <div
      role="status"
      className={`animate-in slide-in-from-top-2 fixed top-16 right-4 left-4 z-50 mx-auto flex max-w-sm items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium shadow-lg duration-300 ${
        status === "offline" ? "bg-error/90 text-white" : "bg-success/90 text-white"
      }`}
    >
      {status === "offline" ? (
        <WifiOff className="h-4 w-4 shrink-0" />
      ) : (
        <Wifi className="h-4 w-4 shrink-0" />
      )}
      {status === "offline" ? "You're offline — cached calculators still work" : "Back online!"}
    </div>
  );
}
