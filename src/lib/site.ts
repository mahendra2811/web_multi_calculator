const env = (key: string): string | undefined => {
  const v = process.env[key];
  return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
};

const SITE_NAME = env("NEXT_PUBLIC_SITE_NAME") ?? "CalcMaster";
const SITE_SHORT_NAME = env("NEXT_PUBLIC_SITE_SHORT_NAME") ?? SITE_NAME;
const SITE_URL = (env("NEXT_PUBLIC_SITE_URL") ?? "https://calcmaster.pooniya.com").replace(
  /\/$/,
  "",
);
const SITE_AUTHOR_NAME = env("NEXT_PUBLIC_SITE_AUTHOR") ?? "Mahendra Singh Puniya";
const SITE_AUTHOR_EMAIL = env("NEXT_PUBLIC_SITE_AUTHOR_EMAIL") ?? "mahendrapuniya92@gmail.com";
const SITE_TWITTER = env("NEXT_PUBLIC_SITE_TWITTER") ?? "@calcmaster";
const SITE_THEME_COLOR = env("NEXT_PUBLIC_SITE_THEME_COLOR") ?? "#0D9488";

export const SITE = {
  name: SITE_NAME,
  shortName: SITE_SHORT_NAME,
  url: SITE_URL,
  defaultLocale: "en" as const,
  locales: ["en", "hi"] as const,
  twitterHandle: SITE_TWITTER,
  author: {
    name: SITE_AUTHOR_NAME,
    email: SITE_AUTHOR_EMAIL,
  },
  themeColor: SITE_THEME_COLOR,
  /**
   * Tagline only. The "X+ calculators" count is injected at render time
   * from {@link CALCULATOR_COUNT_LABEL} so it stays in sync as we ship more.
   */
  description:
    "Free finance, math, health, conversion, date and crypto calculators. Fast, private, beautiful — works offline.",
};

export function absoluteUrl(path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
