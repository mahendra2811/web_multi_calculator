"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import { track } from "@/lib/analytics/events";

export function WebVitals() {
  useEffect(() => {
    const report = (metric: { name: string; value: number; rating: string }) =>
      track.webVital(metric.name, Math.round(metric.value), metric.rating);

    onCLS(report);
    onFCP(report);
    onINP(report);
    onLCP(report);
    onTTFB(report);
  }, []);

  return null;
}
