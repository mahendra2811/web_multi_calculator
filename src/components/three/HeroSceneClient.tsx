"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="bg-surface h-full w-full" />,
});

export function HeroSceneClient() {
  return <HeroScene />;
}
