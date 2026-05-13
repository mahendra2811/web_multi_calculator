export const SITE = {
  name: "CalcMaster",
  shortName: "CalcMaster",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://calcmaster.pooniya.com",
  defaultLocale: "en" as const,
  locales: ["en", "hi"] as const,
  twitterHandle: "@calcmaster",
  author: {
    name: "Mahendra Singh Puniya",
    email: "mahendrapuniya92@gmail.com",
  },
  themeColor: "#0D9488",
  description:
    "65+ free finance, math, health, conversion, date and crypto calculators. Fast, private, beautiful — works offline.",
};

export function absoluteUrl(path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
