"use client";

import { useState } from "react";
import { Bell, BellOff, Check, X } from "lucide-react";
import {
  setReminder,
  clearReminder,
  hasReminder,
  scheduleSameSessionReminder,
  type Reminder,
} from "@/lib/reminders";

interface ReminderButtonProps {
  calculatorSlug: string;
  calculatorName: string;
}

type TimeOption = Reminder["time"];
type FreqOption = Reminder["frequency"];

export function ReminderButton({ calculatorSlug, calculatorName }: ReminderButtonProps) {
  const [active, setActive] = useState(() =>
    typeof window !== "undefined" ? hasReminder(calculatorSlug) : false,
  );
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<TimeOption>("09:00");
  const [freq, setFreq] = useState<FreqOption>("daily");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    // Request notification permission if needed
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }

    const reminder = setReminder({ calculatorSlug, calculatorName, time, frequency: freq });
    scheduleSameSessionReminder(reminder);
    setActive(true);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setOpen(false);
    }, 1500);
  };

  const handleRemove = () => {
    clearReminder(calculatorSlug);
    setActive(false);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={active ? "Reminder set" : "Set reminder"}
        className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
          active
            ? "bg-primary/10 text-primary"
            : "text-text-secondary hover:bg-surface hover:text-text"
        }`}
      >
        {active ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        {/* {active ? "Reminder on" : "Remind me"} */}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Popover */}
          <div className="border-border bg-surface-elevated animate-in zoom-in-95 absolute top-full right-0 z-50 mt-2 w-72 space-y-4 rounded-2xl border p-4 shadow-2xl duration-150">
            <div className="flex items-center justify-between">
              <p className="text-text text-sm font-semibold">Set Reminder</p>
              <button
                onClick={() => setOpen(false)}
                className="text-text-secondary hover:text-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-text-secondary mb-1.5 text-xs font-medium">Time</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["09:00", "12:00", "18:00"] as TimeOption[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                        time === t
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface text-text-secondary hover:text-text"
                      }`}
                    >
                      {t === "09:00" ? "9 AM" : t === "12:00" ? "12 PM" : "6 PM"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-text-secondary mb-1.5 text-xs font-medium">Frequency</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["daily", "weekly"] as FreqOption[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFreq(f)}
                      className={`rounded-lg py-1.5 text-xs font-medium capitalize transition-colors ${
                        freq === f
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface text-text-secondary hover:text-text"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {saved ? (
                <div className="bg-success/10 text-success flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold">
                  <Check className="h-3.5 w-3.5" /> Reminder set!
                </div>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-primary text-primary-foreground flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-opacity hover:opacity-90"
                >
                  <Bell className="h-3.5 w-3.5" /> Save Reminder
                </button>
              )}
              {active && !saved && (
                <button
                  onClick={handleRemove}
                  className="text-error hover:bg-error/10 rounded-xl px-3 py-2 text-xs transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
