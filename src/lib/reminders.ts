const REMINDERS_KEY = "calcmaster:reminders";

export interface Reminder {
  id: string;
  calculatorSlug: string;
  calculatorName: string;
  time: "09:00" | "12:00" | "18:00";
  frequency: "daily" | "weekly";
  createdAt: number;
}

export function getReminders(): Reminder[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(REMINDERS_KEY) ?? "[]") as Reminder[];
  } catch {
    return [];
  }
}

export function setReminder(reminder: Omit<Reminder, "id" | "createdAt">): Reminder {
  const all = getReminders();
  const existing = all.findIndex((r) => r.calculatorSlug === reminder.calculatorSlug);
  const full: Reminder = { ...reminder, id: crypto.randomUUID(), createdAt: Date.now() };
  if (existing >= 0) all[existing] = full;
  else all.push(full);
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(all));
  return full;
}

export function clearReminder(calculatorSlug: string): void {
  const all = getReminders().filter((r) => r.calculatorSlug !== calculatorSlug);
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(all));
}

export function hasReminder(calculatorSlug: string): boolean {
  return getReminders().some((r) => r.calculatorSlug === calculatorSlug);
}

// Schedule a browser notification using Notification API (same-session only)
export function scheduleSameSessionReminder(reminder: Reminder): void {
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const [h, m] = reminder.time.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(h, m ?? 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);

  const delay = target.getTime() - now.getTime();

  setTimeout(() => {
    new Notification(`⏰ ${reminder.calculatorName} Reminder`, {
      body: `Time to use ${reminder.calculatorName} on CalcMaster`,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-96.png",
      tag: `reminder-${reminder.calculatorSlug}`,
    });
  }, delay);
}
