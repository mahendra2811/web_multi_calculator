const MS_PER_DAY = 86_400_000;

export function ageFrom(dobIso: string, nowIso?: string) {
  const dob = new Date(dobIso);
  const now = nowIso ? new Date(nowIso) : new Date();
  if (Number.isNaN(dob.getTime())) return null;
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalDays = Math.floor((now.getTime() - dob.getTime()) / MS_PER_DAY);
  // Next birthday
  const next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (next.getTime() < now.getTime()) next.setFullYear(next.getFullYear() + 1);
  const daysToBirthday = Math.ceil((next.getTime() - now.getTime()) / MS_PER_DAY);
  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalMonths: years * 12 + months,
    daysToBirthday,
    dayOfWeek: dob.toLocaleDateString("en-US", { weekday: "long" }),
  };
}

export function dateDifference(startIso: string, endIso: string, includeEnd = false) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  const days = Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY) + (includeEnd ? 1 : 0);
  return {
    days,
    weeks: days / 7,
    months: days / 30.4375,
    years: days / 365.25,
  };
}

export function addToDate(
  startIso: string,
  amount: number,
  unit: "day" | "week" | "month" | "year",
) {
  const d = new Date(startIso);
  if (Number.isNaN(d.getTime())) return null;
  if (unit === "day") d.setDate(d.getDate() + amount);
  else if (unit === "week") d.setDate(d.getDate() + amount * 7);
  else if (unit === "month") d.setMonth(d.getMonth() + amount);
  else d.setFullYear(d.getFullYear() + amount);
  return d;
}

export function workingDaysBetween(startIso: string, endIso: string, holidaysIso: string[] = []) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  const holidays = new Set(holidaysIso.map((d) => new Date(d).toDateString()));
  let count = 0;
  let weekendCount = 0;
  let holidayCount = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const day = cur.getDay();
    const isWeekend = day === 0 || day === 6;
    const isHoliday = holidays.has(cur.toDateString());
    if (isWeekend) weekendCount++;
    else if (isHoliday) holidayCount++;
    else count++;
    cur.setDate(cur.getDate() + 1);
  }
  return { workingDays: count, weekendDays: weekendCount, holidayDays: holidayCount };
}

export function convertTimezone(dateIso: string, timeZone: string): string {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export const COMMON_TIMEZONES = [
  { id: "Asia/Kolkata", label: "Mumbai / Delhi (IST)" },
  { id: "UTC", label: "UTC" },
  { id: "America/New_York", label: "New York (ET)" },
  { id: "America/Los_Angeles", label: "Los Angeles (PT)" },
  { id: "Europe/London", label: "London (GMT/BST)" },
  { id: "Europe/Paris", label: "Paris / Berlin (CET)" },
  { id: "Asia/Tokyo", label: "Tokyo (JST)" },
  { id: "Asia/Singapore", label: "Singapore (SGT)" },
  { id: "Asia/Dubai", label: "Dubai (GST)" },
  { id: "Australia/Sydney", label: "Sydney (AEST)" },
];
