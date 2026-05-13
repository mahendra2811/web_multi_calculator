"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="bg-surface h-full w-full" />,
});

function StaticFallback() {
  return (
    <div
      aria-hidden
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, hsl(173 80% 36% / 0.35), transparent 40%), radial-gradient(circle at 70% 70%, hsl(239 84% 67% / 0.35), transparent 40%)",
      }}
    />
  );
}

export function HeroSceneClient() {
  const reduced = useReducedMotion();
  if (reduced) return <StaticFallback />;
  return <HeroScene />;
}
