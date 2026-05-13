import type { CalculatorMeta, Category, CategoryMeta } from "@/types/calculator";

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "finance",
    name: "Finance",
    shortDesc: "SIP, EMI, taxes, investments",
    icon: "TrendingUp",
    color: "finance",
  },
  {
    id: "math",
    name: "Math",
    shortDesc: "Basic, scientific, algebra",
    icon: "Sigma",
    color: "math",
  },
  {
    id: "health",
    name: "Health",
    shortDesc: "BMI, calories, body metrics",
    icon: "HeartPulse",
    color: "health",
  },
  {
    id: "converter",
    name: "Converters",
    shortDesc: "Units, currency, more",
    icon: "ArrowLeftRight",
    color: "converter",
  },
  {
    id: "datetime",
    name: "Date & Time",
    shortDesc: "Age, duration, time zones",
    icon: "Calendar",
    color: "datetime",
  },
  {
    id: "crypto",
    name: "Crypto & Stock",
    shortDesc: "Crypto PnL, staking, stocks",
    icon: "Coins",
    color: "crypto",
  },
];

export const CALCULATORS: CalculatorMeta[] = [
  // Finance (24)
  {
    id: "sip",
    name: "SIP Calculator",
    shortDesc: "Monthly mutual-fund SIP returns",
    category: "finance",
    icon: "TrendingUp",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "lumpsum",
    name: "Lumpsum Calculator",
    shortDesc: "One-time investment growth",
    category: "finance",
    icon: "Wallet",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "emi",
    name: "EMI Calculator",
    shortDesc: "Monthly loan installment",
    category: "finance",
    icon: "CreditCard",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "simple-interest",
    name: "Simple Interest",
    shortDesc: "Flat interest calculation",
    category: "finance",
    icon: "Banknote",
    hasChart: true,
  },
  {
    id: "compound-interest",
    name: "Compound Interest",
    shortDesc: "Power of compounding",
    category: "finance",
    icon: "Layers",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "fd-rd",
    name: "FD / RD Calculator",
    shortDesc: "Fixed & recurring deposits",
    category: "finance",
    icon: "Lock",
    hasChart: true,
  },
  {
    id: "ppf",
    name: "PPF Calculator",
    shortDesc: "Public provident fund",
    category: "finance",
    icon: "ShieldCheck",
    hasChart: true,
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    shortDesc: "Live FX rates",
    category: "finance",
    icon: "ArrowLeftRight",
  },
  {
    id: "gst",
    name: "GST Calculator",
    shortDesc: "Inclusive / exclusive GST",
    category: "finance",
    icon: "Receipt",
  },
  {
    id: "profit-loss",
    name: "Profit & Loss",
    shortDesc: "Trading & business margins",
    category: "finance",
    icon: "BarChart3",
    hasChart: true,
  },
  {
    id: "discount",
    name: "Discount Calculator",
    shortDesc: "Sale-price savings",
    category: "finance",
    icon: "Tag",
  },
  {
    id: "salary",
    name: "Salary Calculator",
    shortDesc: "CTC to in-hand",
    category: "finance",
    icon: "Briefcase",
    hasChart: true,
  },
  {
    id: "income-tax",
    name: "Income Tax",
    shortDesc: "Old vs new tax regime",
    category: "finance",
    icon: "FileText",
    hasChart: true,
  },
  {
    id: "mortgage",
    name: "Mortgage",
    shortDesc: "Home loan EMI & total interest",
    category: "finance",
    icon: "Home",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "retirement",
    name: "Retirement Planner",
    shortDesc: "Corpus you need",
    category: "finance",
    icon: "Sun",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "roi",
    name: "ROI Calculator",
    shortDesc: "Return on investment",
    category: "finance",
    icon: "Activity",
  },
  {
    id: "nps",
    name: "NPS Calculator",
    shortDesc: "National pension scheme",
    category: "finance",
    icon: "Umbrella",
    hasChart: true,
  },
  {
    id: "cagr",
    name: "CAGR Calculator",
    shortDesc: "Compound annual growth rate",
    category: "finance",
    icon: "LineChart",
  },
  {
    id: "hra",
    name: "HRA Calculator",
    shortDesc: "House rent allowance exemption",
    category: "finance",
    icon: "Building",
  },
  {
    id: "gratuity",
    name: "Gratuity",
    shortDesc: "End-of-service gratuity",
    category: "finance",
    icon: "Gift",
  },
  {
    id: "epf",
    name: "EPF Calculator",
    shortDesc: "Employee provident fund",
    category: "finance",
    icon: "Users",
    hasChart: true,
  },
  {
    id: "home-loan-vs-rent",
    name: "Home Loan vs Rent",
    shortDesc: "Buy vs rent comparison",
    category: "finance",
    icon: "GitCompare",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "net-worth",
    name: "Net Worth",
    shortDesc: "Assets minus liabilities",
    category: "finance",
    icon: "PieChart",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "break-even",
    name: "Break-Even",
    shortDesc: "Break-even point",
    category: "finance",
    icon: "Flag",
    hasChart: true,
  },

  // Math (12)
  {
    id: "basic",
    name: "Basic Calculator",
    shortDesc: "Everyday arithmetic",
    category: "math",
    icon: "Calculator",
  },
  {
    id: "scientific",
    name: "Scientific Calculator",
    shortDesc: "Trig, log, exp",
    category: "math",
    icon: "FlaskConical",
  },
  {
    id: "percentage",
    name: "Percentage",
    shortDesc: "Percent of, increase, decrease",
    category: "math",
    icon: "Percent",
  },
  {
    id: "fraction",
    name: "Fraction Calculator",
    shortDesc: "Add / multiply fractions",
    category: "math",
    icon: "Divide",
  },
  {
    id: "number-system",
    name: "Number System",
    shortDesc: "Bin / oct / dec / hex",
    category: "math",
    icon: "Code",
  },
  {
    id: "prime-checker",
    name: "Prime Checker",
    shortDesc: "Is N prime? + factors",
    category: "math",
    icon: "Search",
  },
  {
    id: "gcd-lcm",
    name: "GCD / LCM",
    shortDesc: "Greatest common divisor / LCM",
    category: "math",
    icon: "GitMerge",
  },
  {
    id: "statistics",
    name: "Statistics",
    shortDesc: "Mean, median, mode, stddev",
    category: "math",
    icon: "BarChart2",
    hasChart: true,
  },
  {
    id: "matrix",
    name: "Matrix Calculator",
    shortDesc: "Add / multiply / determinant",
    category: "math",
    icon: "Grid3x3",
  },
  {
    id: "quadratic",
    name: "Quadratic Solver",
    shortDesc: "Roots of ax² + bx + c",
    category: "math",
    icon: "Sigma",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "logarithm",
    name: "Logarithm",
    shortDesc: "log₂, log₁₀, ln",
    category: "math",
    icon: "Infinity",
  },
  {
    id: "permutation-combination",
    name: "Permutation & Combination",
    shortDesc: "nPr and nCr",
    category: "math",
    icon: "Shuffle",
  },

  // Health (8)
  {
    id: "bmi",
    name: "BMI Calculator",
    shortDesc: "Body mass index",
    category: "health",
    icon: "HeartPulse",
    hasChart: true,
  },
  {
    id: "bmr",
    name: "BMR Calculator",
    shortDesc: "Basal metabolic rate",
    category: "health",
    icon: "Flame",
  },
  {
    id: "calorie",
    name: "Calorie Needs",
    shortDesc: "TDEE & daily calories",
    category: "health",
    icon: "Apple",
  },
  {
    id: "body-fat",
    name: "Body Fat %",
    shortDesc: "US Navy method",
    category: "health",
    icon: "User",
  },
  {
    id: "ideal-weight",
    name: "Ideal Weight",
    shortDesc: "Healthy weight range",
    category: "health",
    icon: "Scale",
  },
  {
    id: "water-intake",
    name: "Water Intake",
    shortDesc: "Daily hydration goal",
    category: "health",
    icon: "Droplet",
  },
  {
    id: "pregnancy",
    name: "Pregnancy Due Date",
    shortDesc: "EDD & trimester",
    category: "health",
    icon: "Baby",
  },
  {
    id: "macro",
    name: "Macro Splitter",
    shortDesc: "Protein / carbs / fats split",
    category: "health",
    icon: "PieChart",
    hasChart: true,
    has3DView: true,
  },

  // Converters (10)
  {
    id: "length",
    name: "Length",
    shortDesc: "m, ft, mi, km, in...",
    category: "converter",
    icon: "Ruler",
  },
  {
    id: "mass",
    name: "Mass / Weight",
    shortDesc: "kg, lb, oz, g...",
    category: "converter",
    icon: "Weight",
  },
  {
    id: "temperature",
    name: "Temperature",
    shortDesc: "°C, °F, K",
    category: "converter",
    icon: "Thermometer",
  },
  {
    id: "area",
    name: "Area",
    shortDesc: "m², ft², acre...",
    category: "converter",
    icon: "Square",
  },
  { id: "volume", name: "Volume", shortDesc: "L, gal, m³...", category: "converter", icon: "Box" },
  {
    id: "speed",
    name: "Speed",
    shortDesc: "km/h, mph, m/s...",
    category: "converter",
    icon: "Gauge",
  },
  {
    id: "time-units",
    name: "Time Units",
    shortDesc: "sec, min, hr, day...",
    category: "converter",
    icon: "Clock",
  },
  {
    id: "data-storage",
    name: "Data Storage",
    shortDesc: "B, KB, MB, GB, TB",
    category: "converter",
    icon: "Database",
  },
  { id: "energy", name: "Energy", shortDesc: "J, kWh, cal...", category: "converter", icon: "Zap" },
  {
    id: "pressure",
    name: "Pressure",
    shortDesc: "Pa, bar, psi, atm",
    category: "converter",
    icon: "Wind",
  },

  // Date & Time (5)
  {
    id: "age",
    name: "Age Calculator",
    shortDesc: "Years, months, days",
    category: "datetime",
    icon: "Cake",
  },
  {
    id: "date-diff",
    name: "Date Difference",
    shortDesc: "Days between two dates",
    category: "datetime",
    icon: "CalendarDays",
  },
  {
    id: "date-add",
    name: "Add / Subtract Days",
    shortDesc: "Date arithmetic",
    category: "datetime",
    icon: "CalendarPlus",
  },
  {
    id: "working-days",
    name: "Working Days",
    shortDesc: "Business days between dates",
    category: "datetime",
    icon: "Briefcase",
  },
  {
    id: "timezone",
    name: "Time Zone Converter",
    shortDesc: "Convert between zones",
    category: "datetime",
    icon: "Globe",
  },

  // Crypto & Stock (6)
  {
    id: "crypto-profit",
    name: "Crypto Profit",
    shortDesc: "Entry → exit profit/loss",
    category: "crypto",
    icon: "Coins",
    hasChart: true,
  },
  {
    id: "staking-yield",
    name: "Staking Yield",
    shortDesc: "APY rewards projection",
    category: "crypto",
    icon: "TrendingUp",
    hasChart: true,
  },
  {
    id: "dca",
    name: "Dollar-Cost Averaging",
    shortDesc: "DCA simulation",
    category: "crypto",
    icon: "Repeat",
    hasChart: true,
    has3DView: true,
  },
  {
    id: "stock-average",
    name: "Stock Average",
    shortDesc: "Average price down/up",
    category: "crypto",
    icon: "Activity",
  },
  {
    id: "pe-ratio",
    name: "P/E Ratio",
    shortDesc: "Price-earnings ratio",
    category: "crypto",
    icon: "BarChart",
  },
  {
    id: "position-size",
    name: "Position Size",
    shortDesc: "Risk-based position sizing",
    category: "crypto",
    icon: "Target",
  },
];

const categoryIndex = new Map<Category, CalculatorMeta[]>();
const slugIndex = new Map<string, CalculatorMeta>();
for (const c of CALCULATORS) {
  slugIndex.set(c.id, c);
  const list = categoryIndex.get(c.category) ?? [];
  list.push(c);
  categoryIndex.set(c.category, list);
}

export function getCalculatorsByCategory(category: Category): CalculatorMeta[] {
  return categoryIndex.get(category) ?? [];
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return slugIndex.get(slug);
}

export function getAllCalculators(): CalculatorMeta[] {
  return CALCULATORS;
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === slug);
}
