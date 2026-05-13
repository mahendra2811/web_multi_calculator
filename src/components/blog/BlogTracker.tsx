"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

export function BlogTracker({ slug, kind }: { slug: string; kind: string }) {
  useEffect(() => {
    track.blogOpen(slug, kind);
  }, [slug, kind]);
  return null;
}
