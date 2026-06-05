import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const DATETIME_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "time-arith",
    inputs: [
      { id: "h1", label: "Hours 1", kind: "number", default: 2 },
      { id: "m1", label: "Min 1", kind: "number", default: 30 },
      { id: "h2", label: "Hours 2", kind: "number", default: 1 },
      { id: "m2", label: "Min 2", kind: "number", default: 45 },
      {
        id: "op",
        label: "Operation",
        kind: "select",
        default: "add",
        options: [
          { value: "add", label: "Add" },
          { value: "sub", label: "Subtract" },
        ],
      },
    ],
    outputs: [{ id: "result", label: "Result", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const total1 = numF(i.h1) * 60 + numF(i.m1);
      const total2 = numF(i.h2) * 60 + numF(i.m2);
      let r = i.op === "add" ? total1 + total2 : total1 - total2;
      const sign = r < 0 ? "-" : "";
      r = Math.abs(r);
      return { result: `${sign}${Math.floor(r / 60)}h ${r % 60}m` };
    },
  },
  {
    slug: "timesheet",
    inputs: [
      { id: "monIn", label: "Mon clock in (HH:MM)", kind: "text", default: "09:00" },
      { id: "monOut", label: "Mon clock out", kind: "text", default: "18:00" },
      { id: "daysWorked", label: "Days worked this week", kind: "number", default: 5 },
      { id: "overtimeAfter", label: "Overtime after (hours/day)", kind: "number", default: 8 },
    ],
    outputs: [
      { id: "perDay", label: "Hours per day", format: "number", suffix: " hr", fractionDigits: 2 },
      {
        id: "weekly",
        label: "Weekly hours",
        format: "number",
        suffix: " hr",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      {
        id: "overtime",
        label: "Overtime hours/week",
        format: "number",
        suffix: " hr",
        tone: "accent",
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const [hIn, mIn] = String(i.monIn).split(":").map(Number);
      const [hOut, mOut] = String(i.monOut).split(":").map(Number);
      const perDay = (hOut * 60 + mOut - (hIn * 60 + mIn)) / 60;
      const weekly = perDay * numF(i.daysWorked);
      const ot = Math.max(0, perDay - numF(i.overtimeAfter)) * numF(i.daysWorked);
      return { perDay, weekly, overtime: ot };
    },
  },
  {
    slug: "hours-between",
    inputs: [
      { id: "start", label: "Start (HH:MM)", kind: "text", default: "09:00" },
      { id: "end", label: "End (HH:MM)", kind: "text", default: "17:30" },
    ],
    outputs: [{ id: "hours", label: "Duration", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const [h1, m1] = String(i.start).split(":").map(Number);
      const [h2, m2] = String(i.end).split(":").map(Number);
      let mins = h2 * 60 + m2 - (h1 * 60 + m1);
      if (mins < 0) mins += 24 * 60;
      return { hours: `${Math.floor(mins / 60)}h ${mins % 60}m` };
    },
  },
  {
    slug: "day-of-week",
    inputs: [{ id: "date", label: "Date", kind: "date" }],
    outputs: [{ id: "day", label: "Day of week", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const d = new Date(String(i.date));
      if (isNaN(d.getTime())) return {};
      return { day: d.toLocaleDateString("en-US", { weekday: "long" }) };
    },
  },
  {
    slug: "day-counter",
    inputs: [
      { id: "start", label: "Start", kind: "date" },
      { id: "end", label: "End", kind: "date" },
    ],
    outputs: [{ id: "days", label: "Days between", format: "integer", tone: "primary", big: true }],
    compute: (i) => {
      const s = new Date(String(i.start));
      const e = new Date(String(i.end));
      if (isNaN(s.getTime()) || isNaN(e.getTime())) return {};
      return { days: Math.floor((e.getTime() - s.getTime()) / 86400000) };
    },
  },
  {
    slug: "countdown",
    inputs: [{ id: "target", label: "Target date", kind: "date" }],
    outputs: [
      { id: "days", label: "Days remaining", format: "integer", tone: "primary", big: true },
      { id: "weeks", label: "Weeks", format: "number", fractionDigits: 1 },
      { id: "hours", label: "Hours", format: "integer" },
    ],
    compute: (i) => {
      const t = new Date(String(i.target));
      if (isNaN(t.getTime())) return {};
      const diff = t.getTime() - Date.now();
      const days = Math.ceil(diff / 86400000);
      return { days, weeks: days / 7, hours: Math.ceil(diff / 3600000) };
    },
  },
  {
    slug: "stopwatch",
    inputs: [{ id: "elapsedMs", label: "Elapsed ms", kind: "number", default: 90000 }],
    outputs: [{ id: "formatted", label: "Time", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const ms = numF(i.elapsedMs);
      const total = Math.floor(ms / 1000);
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      return {
        formatted: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms % 1000).padStart(3, "0")}`,
      };
    },
  },
  {
    slug: "pomodoro",
    inputs: [
      { id: "sessions", label: "Sessions", kind: "number", default: 4 },
      { id: "workMin", label: "Work session (min)", kind: "number", default: 25 },
      { id: "breakMin", label: "Short break (min)", kind: "number", default: 5 },
      { id: "longBreak", label: "Long break (min)", kind: "number", default: 15 },
    ],
    outputs: [{ id: "total", label: "Total cycle", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const total =
        numF(i.sessions) * numF(i.workMin) +
        (numF(i.sessions) - 1) * numF(i.breakMin) +
        numF(i.longBreak);
      return { total: `${Math.floor(total / 60)}h ${total % 60}m` };
    },
  },
  {
    slug: "gestational-age",
    inputs: [{ id: "lmp", label: "LMP", kind: "date" }],
    outputs: [
      { id: "weeks", label: "Weeks pregnant", format: "integer", tone: "primary", big: true },
      { id: "trimester", label: "Trimester", format: "text" },
      { id: "due", label: "Estimated due date", format: "date", tone: "success" },
    ],
    compute: (i) => {
      const lmp = new Date(String(i.lmp));
      if (isNaN(lmp.getTime())) return {};
      const days = Math.floor((Date.now() - lmp.getTime()) / 86400000);
      const weeks = Math.max(0, Math.floor(days / 7));
      const tri = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;
      const due = new Date(lmp);
      due.setDate(due.getDate() + 280);
      return { weeks, trimester: `Trimester ${tri}`, due: due.toISOString() };
    },
  },
  // ── batch 4 — date & time ─────────────────────────────────────────────────
  {
    slug: "day-of-year",
    inputs: [{ id: "date", label: "Date", kind: "date" }],
    outputs: [
      { id: "dayNumber", label: "Day of year", format: "integer", tone: "primary", big: true },
      { id: "daysRemaining", label: "Days remaining in year", format: "integer" },
      { id: "leap", label: "Leap year?", format: "text" },
    ],
    compute: (i) => {
      const d = new Date(String(i.date));
      if (isNaN(d.getTime())) return {};
      const y = d.getFullYear();
      const start = new Date(y, 0, 1);
      const dayNumber = Math.floor((d.getTime() - start.getTime()) / 86400000) + 1;
      const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      const total = isLeap ? 366 : 365;
      return {
        dayNumber,
        daysRemaining: total - dayNumber,
        leap: isLeap ? "Yes (366 days)" : "No (365 days)",
      };
    },
    formula: "Day number since Jan 1 (= 1); Dec 31 = 365 or 366 in a leap year",
  },
  {
    slug: "iso-week-number",
    inputs: [{ id: "date", label: "Date", kind: "date" }],
    outputs: [
      { id: "isoWeek", label: "ISO week number", format: "integer", tone: "primary", big: true },
      { id: "isoYear", label: "ISO week-year", format: "integer" },
      { id: "weekday", label: "Day of week", format: "text" },
    ],
    compute: (i) => {
      const d = new Date(String(i.date));
      if (isNaN(d.getTime())) return {};
      // ISO 8601: week containing the first Thursday of the year is week 1
      const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = t.getUTCDay() || 7;
      t.setUTCDate(t.getUTCDate() + 4 - dayNum);
      const isoYear = t.getUTCFullYear();
      const yearStart = new Date(Date.UTC(isoYear, 0, 1));
      const isoWeek = Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
      return {
        isoWeek,
        isoYear,
        weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
      };
    },
    formula: "ISO 8601 — weeks start Monday; week 1 contains January 4",
  },
  {
    slug: "add-business-days",
    inputs: [
      { id: "startDate", label: "Start date", kind: "date" },
      { id: "daysToAdd", label: "Business days to add", kind: "number", default: 10 },
      {
        id: "holidays",
        label: "Holidays — one YYYY-MM-DD per line (optional)",
        kind: "textarea",
        default: "",
      },
    ],
    outputs: [
      { id: "resultDate", label: "Resulting date", format: "date", tone: "primary", big: true },
      { id: "skipped", label: "Weekend/holiday days skipped", format: "integer" },
    ],
    compute: (i) => {
      const start = new Date(String(i.startDate));
      if (isNaN(start.getTime())) return {};
      const holidays = new Set(
        String(i.holidays)
          .split(/\n+/)
          .map((l) => l.trim())
          .filter(Boolean),
      );
      const target = Math.min(10000, Math.max(0, Math.floor(numF(i.daysToAdd))));
      const d = new Date(start);
      let added = 0;
      let skipped = 0;
      while (added < target) {
        d.setDate(d.getDate() + 1);
        const dow = d.getDay();
        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        if (dow === 0 || dow === 6 || holidays.has(iso)) skipped++;
        else added++;
      }
      return { resultDate: d.toISOString(), skipped };
    },
    formula: "Walk forward day by day, skipping Saturdays, Sundays and listed holidays",
  },
  {
    slug: "time-until-birthday",
    inputs: [{ id: "dob", label: "Date of birth", kind: "date" }],
    outputs: [
      {
        id: "countdown",
        label: "Time until next birthday",
        format: "text",
        tone: "primary",
        big: true,
      },
      { id: "turningAge", label: "You'll turn", format: "integer" },
      { id: "nextDate", label: "Next birthday", format: "date" },
    ],
    compute: (i) => {
      const dob = new Date(String(i.dob));
      if (isNaN(dob.getTime())) return {};
      const now = new Date();
      const next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
      if (next.getTime() <= now.getTime()) next.setFullYear(next.getFullYear() + 1);
      const ms = next.getTime() - now.getTime();
      const days = Math.floor(ms / 86400000);
      const hours = Math.floor((ms % 86400000) / 3600000);
      const mins = Math.floor((ms % 3600000) / 60000);
      return {
        countdown: `${days}d ${hours}h ${mins}m`,
        turningAge: next.getFullYear() - dob.getFullYear(),
        nextDate: next.toISOString(),
      };
    },
    formula: "Difference between now and the next occurrence of your birth date",
  },
];
