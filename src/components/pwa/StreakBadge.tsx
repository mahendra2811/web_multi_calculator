"use client";

import { useState } from "react";
import { Flame } from "lucide-react";

const STREAK_KEY = "calcmaster:streak";
const LAST_USE_KEY = "calcmaster:last-use-date";

function computeStreak(): number {
  if (typeof window === "undefined") return 0;
  const today = new Date().toDateString();
  const lastUse = localStorage.getItem(LAST_USE_KEY);
  const current = Number(localStorage.getItem(STREAK_KEY) ?? "0");

  if (!lastUse) {
    localStorage.setItem(LAST_USE_KEY, today);
    localStorage.setItem(STREAK_KEY, "1");
    return 1;
  }

  const diffDays = Math.floor((new Date().getTime() - new Date(lastUse).getTime()) / 86400000);

  if (diffDays === 0) return current;

  const next = diffDays === 1 ? current + 1 : 1;
  localStorage.setItem(STREAK_KEY, String(next));
  localStorage.setItem(LAST_USE_KEY, today);
  return next;
}

export function useStreak() {
  const [streak] = useState(computeStreak);
  return streak;
}

export function StreakBadge() {
  const streak = useStreak();

  if (streak < 2) return null;

  return (
    <div
      title={`${streak}-day streak! Keep going 🔥`}
      className="bg-accent/10 border-accent/20 text-accent flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold"
    >
      <Flame className="h-3.5 w-3.5" />
      {streak}
    </div>
  );
}
