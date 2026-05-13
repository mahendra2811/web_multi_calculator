import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { GA_ID, GTM_ID } from "@/lib/site";

export function Analytics() {
  return (
    <>
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
    </>
  );
}
