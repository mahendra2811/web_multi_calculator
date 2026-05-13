"use client";

import { type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./ThemeProvider";

interface ProvidersProps {
  locale: string;
  messages: Record<string, unknown>;
  children: ReactNode;
}

export function Providers({ locale, messages, children }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlClientProvider>
  );
}
