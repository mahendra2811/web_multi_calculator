"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Home, Shuffle, RefreshCw, Calculator } from "lucide-react";
import { CALCULATORS } from "@/constants/calculators";
import { CALCULATOR_COUNT_LABEL, TOTAL_CALCULATORS } from "@/constants/stats";
import { IMPLEMENTED_SLUGS } from "@/lib/calculators/registry";

const SARCASTIC_MESSAGES = [
  "Carry the 1... divide by zero... nope, still gone.",
  'I asked the calculator. It said "NaN, bro".',
  "404 = (you) − (the page you wanted). Math doesn't lie.",
  "This page tried compound interest and disappeared into infinity.",
  "Our SIP Calculator invested this URL. It's still vesting.",
  "We checked behind the EMI Calculator. Just dust and regrets.",
  "Plot twist: the page rounded itself down to zero.",
  "If x = this page and x = 404, solve for therapy.",
  "Maybe it eloped with the Currency Converter. Last seen in EUR.",
  `Statistics say 1 in ${TOTAL_CALCULATORS} pages goes missing. You found it. Congrats?`,
  "We integrated. We differentiated. Still no page.",
  "The BMI Calculator says this page is underweight on existence.",
  "Pythagoras called — even he can't square this one.",
  "Tried CAGR on its lifespan. Result: extinct.",
  "Page = lim(x→404). Limit does not exist.",
  "Net Worth of this URL: ₹0. Liabilities: your patience.",
] as const;

const ATTEMPTS = [
  "Calculating coordinates",
  "Asking the Loan Calculator",
  "Dividing by enthusiasm",
  "Square-rooting the void",
  "Computing route ETA",
  "Running Monte Carlo simulation",
  "Solving for X",
  "Checking the Pomodoro timer",
] as const;

function pickRandom<T>(arr: readonly T[], not?: T): T {
  if (arr.length <= 1) return arr[0];
  let next = arr[Math.floor(Math.random() * arr.length)];
  while (next === not) next = arr[Math.floor(Math.random() * arr.length)];
  return next;
}

export default function NotFound() {
  const liveCalcs = useMemo(() => CALCULATORS.filter((c) => IMPLEMENTED_SLUGS.has(c.id)), []);

  const [taps, setTaps] = useState(0);
  const [message, setMessage] = useState<string>(SARCASTIC_MESSAGES[0]);
  const [attempt, setAttempt] = useState<string>(ATTEMPTS[0]);
  const [progress, setProgress] = useState(0);
  // Random pick is hydrated lazily on first client render to avoid setState-in-effect.
  // The SSR pass uses the first calc; the client picks a random one on mount via
  // useState initializer, which only runs once.
  const [randomSlug, setRandomSlug] = useState<string | null>(() =>
    typeof window === "undefined"
      ? (liveCalcs[0]?.id ?? null)
      : (liveCalcs[Math.floor(Math.random() * liveCalcs.length)]?.id ?? null),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setMessage((m) => pickRandom(SARCASTIC_MESSAGES, m));
    }, 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setAttempt((a) => pickRandom(ATTEMPTS, a));
      setProgress((p) => (p + Math.floor(Math.random() * 18) + 5) % 100);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const reroll = () => {
    setMessage(pickRandom(SARCASTIC_MESSAGES, message));
    setRandomSlug(liveCalcs[Math.floor(Math.random() * liveCalcs.length)]?.id ?? null);
    setTaps((t) => t + 1);
  };

  return (
    <main className="bg-background relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.18), transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--accent) / 0.15), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="text-text-tertiary/10 pointer-events-none absolute inset-0 -z-10 font-mono text-[10px] leading-4 select-none"
        style={{
          background:
            "repeating-linear-gradient(transparent 0 18px, hsl(var(--border) / 0.15) 18px 19px)",
        }}
      />

      <section className="container-page flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center">
        <span className="border-border bg-surface-elevated/70 text-text-secondary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs backdrop-blur">
          <Calculator className="text-primary h-3.5 w-3.5" />
          ERROR: PAGE_NOT_DEFINED
        </span>

        <button
          type="button"
          onClick={reroll}
          aria-label="Reroll 404"
          className="group relative cursor-pointer select-none"
        >
          <div className="border-border bg-surface-elevated mx-auto inline-flex items-end justify-end rounded-2xl border px-6 py-4 font-mono text-7xl font-bold tracking-tighter shadow-lg sm:text-8xl md:text-9xl">
            <span className="text-text-tertiary/40 group-hover:text-text-tertiary/70 mr-3 text-2xl transition">
              =
            </span>
            <span className="text-primary group-active:animate-pulse">4</span>
            <span className="text-accent inline-block transition-transform duration-500 group-hover:[transform:rotate(180deg)]">
              0
            </span>
            <span className="text-primary group-active:animate-pulse">4</span>
          </div>
          <span className="text-text-tertiary mt-2 block font-mono text-[11px]">
            tap to recompute · taps: {taps}
          </span>
        </button>

        <h1 className="text-text mt-8 max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Oh no — this page got lost <span className="text-primary">between two calculators</span>.
        </h1>

        <p className="text-text-secondary mt-4 max-w-xl text-balance">
          We ran {CALCULATOR_COUNT_LABEL} calculators on its whereabouts. None of them helped.
          Honestly, they were judgmental.
        </p>

        <div
          key={message}
          className="border-border bg-surface-elevated/60 text-text animate-in fade-in slide-in-from-bottom-2 mx-auto mt-6 inline-flex max-w-xl items-start gap-3 rounded-xl border px-4 py-3 text-sm backdrop-blur duration-500"
        >
          <span className="text-accent mt-0.5">»</span>
          <span className="text-left italic">{message}</span>
        </div>

        <div className="border-border bg-surface-elevated/40 mx-auto mt-6 w-full max-w-md rounded-xl border p-4 text-left backdrop-blur">
          <div className="text-text-secondary mb-2 flex items-center justify-between font-mono text-[11px]">
            <span className="flex items-center gap-2">
              <RefreshCw className="h-3 w-3 animate-spin [animation-duration:2.4s]" />
              {attempt}…
            </span>
            <span>{progress}%</span>
          </div>
          <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-text-tertiary mt-2 font-mono text-[10px]">
            (Spoiler: this progress bar is also lying to you.)
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group bg-primary text-primary-foreground shadow-primary/20 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Take me home
          </Link>

          {randomSlug ? (
            <Link
              href={`/calculator/${randomSlug}`}
              className="border-border bg-surface-elevated text-text hover:border-primary inline-flex h-11 items-center gap-2 rounded-xl border px-5 text-sm font-semibold transition"
            >
              <Shuffle className="h-4 w-4" />
              Try a random calculator
            </Link>
          ) : null}

          <button
            type="button"
            onClick={reroll}
            className="text-text-secondary hover:text-text inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium transition"
          >
            <RefreshCw className="h-4 w-4" />
            New joke, please
          </button>
        </div>

        {taps >= 7 ? (
          <p className="text-text-tertiary mt-8 max-w-sm font-mono text-xs italic">
            You&apos;ve tapped {taps} times. The page is still not here. But your persistence has
            been logged. Statistically speaking, you should go outside.
          </p>
        ) : (
          <p className="text-text-tertiary mt-8 font-mono text-xs">
            Tip: clicking the 404 won&apos;t bring the page back. But it&apos;s therapeutic.
          </p>
        )}
      </section>
    </main>
  );
}
