import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeScript } from "@/components/ThemeScript";
import { Providers } from "@/contexts/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CalcMaster — 65+ calculators in one place",
    template: "%s · CalcMaster",
  },
  description:
    "Finance, math, health, conversion, date and crypto calculators. Fast, private, beautiful — works offline.",
  applicationName: "CalcMaster",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "CalcMaster",
    statusBarStyle: "default",
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
      </head>
      <body className="bg-background text-text flex min-h-full flex-col">
        <Providers locale={locale} messages={messages as Record<string, unknown>}>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileTabBar />
        </Providers>
      </body>
    </html>
  );
}
