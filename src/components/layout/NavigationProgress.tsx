"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Slim progress bar pinned to the bottom edge of the sticky header. Starts
 * sweeping left → right when the user clicks an internal link (or uses
 * back/forward), and completes + fades when the new route renders.
 *
 * No dependencies: a document-level click listener detects same-origin
 * navigations, and a pathname/searchParams effect detects completion.
 */
function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [runId, setRunId] = useState(0); // re-keys the bar so the CSS animation restarts

  // Route rendered → complete. State-adjustment-during-render pattern: when
  // the route key changes while the bar is loading, mark it done.
  const routeKey = `${pathname}?${searchParams}`;
  const [prevRouteKey, setPrevRouteKey] = useState(routeKey);
  if (routeKey !== prevRouteKey) {
    setPrevRouteKey(routeKey);
    if (phase === "loading") setPhase("done");
  }

  // Detect internal link clicks → start. Capture phase: Next's <Link> calls
  // preventDefault() for client routing, so by the bubble phase the event
  // already looks "cancelled" — we must observe it before React's handler.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;
      const a = anchor as HTMLAnchorElement;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page (hash-only or identical) → no navigation, no bar.
      if (url.pathname === location.pathname && url.search === location.search) return;
      setPhase("loading");
      setRunId((n) => n + 1);
    };
    // Back/forward navigations.
    const onPopState = () => {
      setPhase("loading");
      setRunId((n) => n + 1);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Fade out after completing; safety net for aborted/failed navigations.
  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(() => setPhase("idle"), 400);
      return () => clearTimeout(t);
    }
    if (phase === "loading") {
      const t = setTimeout(() => setPhase("idle"), 10000);
      return () => clearTimeout(t);
    }
  }, [phase, runId]);

  return (
    <div
      aria-hidden
      data-nav-progress={phase}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-0.5"
    >
      {phase !== "idle" && (
        <div
          key={runId}
          className={cn(
            "bg-primary h-full rounded-r-full",
            phase === "loading" && "nav-progress-loading",
            phase === "done" && "nav-progress-done",
          )}
        />
      )}
    </div>
  );
}

export function NavigationProgress() {
  // useSearchParams requires a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  );
}
