import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

const COOKIE_KEY = "mcw:locale";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_KEY)?.value as Locale | undefined;
  const locale: Locale =
    cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : DEFAULT_LOCALE;

  const messages = (await import(`./messages/${locale}.json`)).default;
  return { locale, messages };
});
