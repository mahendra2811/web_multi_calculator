export interface DailyTip {
  title: string;
  body: string;
  url: string;
  tag: string;
}

export const DAILY_TIPS: DailyTip[] = [
  {
    title: "💰 SIP Tip of the Day",
    body: "₹5,000/month SIP at 12% for 20 years = ₹49.9 Lakh. Start early, retire rich.",
    url: "/calculator/sip",
    tag: "tip-sip",
  },
  {
    title: "🏦 EMI Insight",
    body: "A 1% lower interest rate on a ₹50L home loan saves ₹3,300/month in EMI.",
    url: "/calculator/emi",
    tag: "tip-emi",
  },
  {
    title: "⚖️ BMI Check",
    body: "BMI between 18.5–24.9 is healthy. Check yours in seconds with our BMI Calculator.",
    url: "/calculator/bmi",
    tag: "tip-bmi",
  },
  {
    title: "📈 Compound Interest",
    body: "₹1 Lakh at 10% compounded for 10 years = ₹2.59 Lakh. Compounding = magic.",
    url: "/calculator/compound-interest",
    tag: "tip-compound",
  },
  {
    title: "🧾 GST Reminder",
    body: "Price ₹10,000 + 18% GST = ₹11,800 total. Always calculate before invoicing.",
    url: "/calculator/gst",
    tag: "tip-gst",
  },
  {
    title: "💹 PPF Returns",
    body: "₹1.5L/year in PPF for 15 years at 7.1% gives ₹40.7L tax-free corpus.",
    url: "/calculator/ppf",
    tag: "tip-ppf",
  },
  {
    title: "🍎 Calorie Budget",
    body: "Know your TDEE before cutting calories. Use our BMR Calculator to find your maintenance calories.",
    url: "/calculator/bmr",
    tag: "tip-bmr",
  },
];

export function getTipForDate(date: Date = new Date()): DailyTip {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
}
