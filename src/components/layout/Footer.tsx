import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border bg-surface/40 mt-12 border-t">
      <div className="container-page text-text-secondary flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} CalcMaster. All calculations are educational; verify before
          use.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-text">
            About
          </Link>
          <Link href="/privacy" className="hover:text-text">
            Privacy
          </Link>
          <Link href="/settings" className="hover:text-text">
            Settings
          </Link>
          <a href="mailto:mahendrapuniya92@gmail.com" className="hover:text-text">
            Feedback
          </a>
        </div>
      </div>
    </footer>
  );
}
