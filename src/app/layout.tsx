import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeScript } from "@/components/ThemeScript";
import { Providers } from "@/contexts/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { Analytics } from "@/components/analytics/Analytics";
import { WebVitals } from "@/components/analytics/WebVitals";
import { SearchPalette } from "@/components/search/SearchPalette";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";
import { CALCULATOR_COUNT_LABEL } from "@/constants/stats";
import "./globals.css";

const HEADLINE = `${SITE.name} — ${CALCULATOR_COUNT_LABEL} calculators in one place`;
const META_DESCRIPTION = `${CALCULATOR_COUNT_LABEL} ${SITE.description}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HEADLINE,
    template: `%s · ${SITE.name}`,
  },
  description: META_DESCRIPTION,
  applicationName: SITE.name,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "default",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      hi: "/",
    },
  },
  keywords: [
    "calculator",
    "SIP calculator",
    "EMI calculator",
    "BMI calculator",
    "currency converter",
    "GST calculator",
    "compound interest",
    "finance calculator",
    "math calculator",
    "health calculator",
  ],
  authors: [{ name: SITE.author.name }],
  creator: SITE.author.name,
  publisher: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: SITE.url,
    title: HEADLINE,
    description: META_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — every calculator in one place`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HEADLINE,
    description: META_DESCRIPTION,
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={[websiteSchema(), organizationSchema()]} />
      </head>
      <body className="bg-background text-text flex min-h-full flex-col">
        <Providers locale={locale} messages={messages as Record<string, unknown>}>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileTabBar />
          <SearchPalette />
        </Providers>
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}
