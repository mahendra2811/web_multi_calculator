"use client";

/**
 * Typed analytics events. Emitted via window.gtag if GA is loaded; no-op otherwise.
 *
 * Keep this list of events **short and stable** — every new event creates a new
 * column in GA4 Explore reports. Prefer parameters over event names.
 */

type GtagFn = (
  command: "event" | "config" | "set",
  target: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

function send(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}

export const track = {
  calculatorOpen(slug: string, category: string) {
    send("calculator_open", { calculator_slug: slug, category });
  },
  calculatorCalculate(slug: string) {
    send("calculator_calculate", { calculator_slug: slug });
  },
  calculatorShare(slug: string, channel: "native" | "copy") {
    send("calculator_share", { calculator_slug: slug, channel });
  },
  favoriteToggle(slug: string, favorited: boolean) {
    send("favorite_toggle", { calculator_slug: slug, favorited });
  },
  view3DToggle(slug: string, view: "2d" | "3d") {
    send("view_3d_toggle", { calculator_slug: slug, view });
  },
  searchQuery(query: string, resultCount: number) {
    send("search", { search_term: query, result_count: resultCount });
  },
  themeChange(theme: "light" | "dark" | "system") {
    send("theme_change", { theme });
  },
  localeChange(locale: string) {
    send("locale_change", { locale });
  },
  blogOpen(slug: string, kind: string) {
    send("blog_open", { blog_slug: slug, blog_kind: kind });
  },
  blogShare(slug: string, channel: "native" | "copy") {
    send("blog_share", { blog_slug: slug, channel });
  },
  outboundClick(href: string, label?: string) {
    send("outbound_click", { href, label });
  },
  pwaInstall() {
    send("pwa_install");
  },
  webVital(name: string, value: number, rating: string) {
    send("web_vital", { metric_name: name, metric_value: value, metric_rating: rating });
  },
};
