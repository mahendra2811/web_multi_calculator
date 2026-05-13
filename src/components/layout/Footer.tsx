import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border bg-surface/40 mt-12 border-t">
      <div className="container-page text-text-secondary flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} MultiCalc. All calculations are educational; verify before
          use.
        </p>
        <div className="flex gap-4">
          <Link href="/settings" className="hover:text-text">
            Settings
          </Link>
          <Link href="/privacy" className="hover:text-text">
            Privacy
          </Link>
          <Link href="/about" className="hover:text-text">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
