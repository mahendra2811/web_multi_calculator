"use client";

import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTheme, type Theme } from "@/contexts/ThemeProvider";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/i18n/config";

const THEMES: Theme[] = ["light", "dark", "system"];

function persistLocale(l: Locale) {
  document.cookie = `mcw:locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  window.location.reload();
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container-page py-10">
      <header className="mb-6 flex items-center gap-3">
        <SettingsIcon className="text-text-secondary h-6 w-6" />
        <h1 className="text-text text-2xl font-bold">Settings</h1>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Light, dark, or follow system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {THEMES.map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? "primary" : "secondary"}
                  onClick={() => setTheme(t)}
                  className="flex-1 capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language</CardTitle>
            <CardDescription>Interface language for the entire site.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {LOCALES.map((l) => (
                <Button
                  key={l}
                  variant="secondary"
                  onClick={() => persistLocale(l)}
                  className="flex-1"
                >
                  {LOCALE_LABELS[l]}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cloud sync</CardTitle>
            <CardDescription>Sign in to sync history and favorites across devices.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" disabled>
              Coming soon
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
