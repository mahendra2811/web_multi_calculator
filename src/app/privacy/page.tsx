import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "CalcMaster privacy policy — covers the Android app and the website.",
};

const FEEDBACK_EMAIL = "mahendrapuniya92@gmail.com";
const LAST_UPDATED = "27 September 2026";

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-text text-3xl font-bold">Privacy Policy</h1>
      <p className="text-text-tertiary mt-2 text-sm">Last updated: {LAST_UPDATED}</p>

      <p className="text-text-secondary mt-4">
        This policy applies to CalcMaster — both the Android app (package{" "}
        <code>com.pooniya.calcmaster</code>) and the website at calcmaster.pooniya.com. The Android
        app opens this website in your browser. Calculator formulas run on your device; loading the
        site, analytics, and optional notifications use network services as described below.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">What we store on your device</h2>
      <ul className="text-text-secondary mt-3 list-disc space-y-1 pl-5">
        <li>
          Your theme, language, and display preferences — saved in browser storage and a language
          cookie.
        </li>
        <li>
          Your favorites, recent calculators, and calculation history — saved in browser storage on
          your device, including when you use the Android app.
        </li>
      </ul>
      <p className="text-text-secondary mt-3">
        Saved calculation history stays on your device. You can clear favorites and history from the
        app, or remove the site&apos;s data through your browser settings. Because the Android app
        uses your browser, uninstalling it may leave browser storage and cookies in place.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Analytics and cookies</h2>
      <p className="text-text-secondary mt-3">
        We use Google Analytics to understand how people use CalcMaster and improve the service. It
        can collect page visits, interactions, browser and device information, approximate location,
        and cookie identifiers. This also applies to the website opened by the Android app.
        Analytics data is processed by Google. Learn more in{" "}
        <a href="https://policies.google.com/privacy" className="text-primary hover:underline">
          Google&apos;s Privacy Policy
        </a>{" "}
        and its explanation of{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          className="text-primary hover:underline"
        >
          data from sites and apps that use Google services
        </a>
        . You can manage cookies through your browser settings.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Hosting and optional notifications</h2>
      <p className="text-text-secondary mt-3">
        Our hosting and content delivery providers process requests, including IP addresses,
        requested URLs, and browser information, to deliver and secure the service. Loading external
        images or fonts also sends requests to their providers.
      </p>
      <p className="text-text-secondary mt-3">
        If notifications are available and you choose to enable them, your browser asks for
        permission. We receive a push subscription endpoint and encryption keys to deliver
        notifications through your browser&apos;s push provider. You can unsubscribe in Settings or
        block notifications in your browser settings.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Retention and your choices</h2>
      <p className="text-text-secondary mt-3">
        Local preferences remain until you clear them; saved history is limited to the latest 200
        entries. Analytics retention follows the settings of our Google Analytics property.
        Unsubscribing in the app requests deletion of your stored push subscription. If you email
        us, we receive your email address and message to handle your request. Contact us below with
        questions or requests about access to or deletion of data held by us.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Permissions the Android app uses</h2>
      <p className="text-text-secondary mt-3">
        The Android wrapper does not request access to your contacts, camera, microphone, or precise
        location. Optional website notifications use your browser&apos;s permission flow.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Children&apos;s privacy</h2>
      <p className="text-text-secondary mt-3">
        CalcMaster does not require an account or ask for your age. If you believe a child has
        provided personal information to us, please contact us so we can investigate and address the
        request.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Changes to this policy</h2>
      <p className="text-text-secondary mt-3">
        When our data practices change, we will update this page and the &quot;Last updated&quot;
        date above.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Contact</h2>
      <p className="text-text-secondary mt-3">
        For any privacy-related question, email{" "}
        <a href={`mailto:${FEEDBACK_EMAIL}`} className="text-primary font-medium hover:underline">
          {FEEDBACK_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
