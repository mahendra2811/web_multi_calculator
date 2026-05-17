import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "CalcMaster privacy policy — covers the Android app and the website.",
};

const FEEDBACK_EMAIL = "mahendrapuniya92@gmail.com";
const LAST_UPDATED = "18 May 2026";

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-text text-3xl font-bold">Privacy Policy</h1>
      <p className="text-text-tertiary mt-2 text-sm">Last updated: {LAST_UPDATED}</p>

      <p className="text-text-secondary mt-4">
        This policy applies to CalcMaster — both the Android app (package{" "}
        <code>com.calcmaster.app</code>, published on Google Play) and the website at{" "}
        calcmaster.pooniya.com. Both run entirely on your own device. We do not collect, store,
        transmit, or share any personal data.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">What we store on your device</h2>
      <ul className="text-text-secondary mt-3 list-disc space-y-1 pl-5">
        <li>
          Your theme &amp; language preference — saved locally (localStorage on the web,
          AsyncStorage in the Android app).
        </li>
        <li>
          Your favorites &amp; calculation history — saved locally (localStorage on the web,
          AsyncStorage in the Android app).
        </li>
      </ul>
      <p className="text-text-secondary mt-3">
        All of this stays on your device. It is never sent to a server. You can clear it anytime by
        clearing browser data (web) or uninstalling / clearing app data (Android).
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">What we do NOT do</h2>
      <ul className="text-text-secondary mt-3 list-disc space-y-1 pl-5">
        <li>No analytics or telemetry.</li>
        <li>No advertising or ad networks.</li>
        <li>No third-party trackers, no cookies for tracking.</li>
        <li>No user accounts, sign-in, or sign-up.</li>
        <li>No network requests for your calculations — everything runs on-device.</li>
        <li>No location, contacts, camera, microphone, or any sensitive permissions.</li>
      </ul>

      <h2 className="text-text mt-8 text-lg font-semibold">Permissions the Android app uses</h2>
      <p className="text-text-secondary mt-3">
        Only the minimum required by Android to install and run an app. The app does not request
        runtime permissions for location, contacts, storage of user files, camera, microphone, or
        any other sensitive resource.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Children&apos;s privacy</h2>
      <p className="text-text-secondary mt-3">
        CalcMaster does not collect data from anyone, including children. The app is safe for all
        ages.
      </p>

      <h2 className="text-text mt-8 text-lg font-semibold">Changes to this policy</h2>
      <p className="text-text-secondary mt-3">
        If anything material changes (for example, if a future version adds analytics or ads), this
        page will be updated and the &quot;Last updated&quot; date above will change.
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
