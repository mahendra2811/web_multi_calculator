import type { Metadata } from "next";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline — CalcMaster",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="bg-surface mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
        <WifiOff className="text-text-secondary h-8 w-8" aria-hidden />
      </div>
      <h1 className="mb-2 text-2xl font-bold">You&apos;re offline</h1>
      <p className="text-text-secondary max-w-sm">
        This page isn&apos;t cached yet. Reconnect and it will load — every calculator runs on your
        device, so anything already open keeps working.
      </p>
    </div>
  );
}
