import type { CalculatorSchema } from "../schema-types";
import { calculateNewRegimeTax, calculateOldRegimeTax } from "../finance";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const FINANCE_INDIA_SCHEMAS: CalculatorSchema[] = [
  // ── NSC ────────────────────────────────────────────────────────────────
  {
    slug: "nsc",
    inputs: [
      { id: "amount", label: "Investment", kind: "currency", default: 100000, prefix: "₹" },
      { id: "rate", label: "Interest rate", kind: "percent", default: 7.7 },
      {
        id: "tenure",
        label: "Tenure",
        kind: "select",
        default: 5,
        options: [
          { value: 5, label: "5 years" },
          { value: 10, label: "10 years" },
        ],
      },
    ],
    outputs: [
      {
        id: "maturity",
        label: "Maturity amount",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "interest", label: "Total interest", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const mat = numF(i.amount) * Math.pow(1 + numF(i.rate) / 100, numF(i.tenure));
      return { maturity: mat, interest: mat - numF(i.amount) };
    },
  },

  // ── KVP ────────────────────────────────────────────────────────────────
  {
    slug: "kvp",
    inputs: [
      { id: "amount", label: "Investment", kind: "currency", default: 100000 },
      { id: "rate", label: "Current rate", kind: "percent", default: 7.5 },
    ],
    outputs: [
      {
        id: "doubleMonths",
        label: "Doubling period",
        format: "integer",
        suffix: " months",
        tone: "primary",
        big: true,
      },
      { id: "doubleYears", label: "Doubling years", format: "number", suffix: " yr" },
      { id: "maturity", label: "Maturity amount", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const yrs = 72 / numF(i.rate);
      return { doubleMonths: Math.round(yrs * 12), doubleYears: yrs, maturity: numF(i.amount) * 2 };
    },
  },

  // ── SSY ────────────────────────────────────────────────────────────────
  {
    slug: "ssy",
    inputs: [
      { id: "yearly", label: "Yearly deposit", kind: "currency", default: 50000 },
      { id: "rate", label: "Interest rate", kind: "percent", default: 8.2 },
      { id: "depositYears", label: "Deposit years", kind: "number", default: 15 },
    ],
    outputs: [
      {
        id: "maturity",
        label: "Maturity (at 21 yr)",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "deposit", label: "Total deposited", format: "currency-inr" },
      { id: "interest", label: "Interest earned", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const r = numF(i.rate) / 100;
      let bal = 0;
      for (let y = 1; y <= 21; y++) {
        if (y <= numF(i.depositYears)) bal += numF(i.yearly);
        bal *= 1 + r;
      }
      const deposit = numF(i.yearly) * numF(i.depositYears);
      return { maturity: bal, deposit, interest: bal - deposit };
    },
  },

  // ── APY ────────────────────────────────────────────────────────────────
  {
    slug: "apy",
    inputs: [
      { id: "age", label: "Current age", kind: "number", default: 30 },
      { id: "monthly", label: "Desired pension/mo", kind: "currency", default: 5000 },
    ],
    outputs: [
      {
        id: "monthlyContrib",
        label: "Approx monthly contribution",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "pensionMonthly", label: "Pension @ 60", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      // Rough table: at 30, ₹1k/mo pension needs ~291/mo contribution
      const factor = Math.max(40 / Math.max(1, 60 - numF(i.age)), 1) * 291;
      return { monthlyContrib: (numF(i.monthly) / 1000) * factor, pensionMonthly: numF(i.monthly) };
    },
  },

  // ── SCSS ───────────────────────────────────────────────────────────────
  {
    slug: "scss",
    inputs: [
      { id: "amount", label: "Investment", kind: "currency", default: 1500000 },
      { id: "rate", label: "Interest rate", kind: "percent", default: 8.2 },
    ],
    outputs: [
      {
        id: "quarterly",
        label: "Quarterly payout",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "annual", label: "Annual income", format: "currency-inr", tone: "success" },
      { id: "totalInterest5y", label: "Total interest (5 yr)", format: "currency-inr" },
    ],
    compute: (i) => {
      const annual = (numF(i.amount) * numF(i.rate)) / 100;
      return { quarterly: annual / 4, annual, totalInterest5y: annual * 5 };
    },
  },

  // ── POMIS ──────────────────────────────────────────────────────────────
  {
    slug: "pomis",
    inputs: [
      { id: "amount", label: "Investment", kind: "currency", default: 900000 },
      { id: "rate", label: "Rate", kind: "percent", default: 7.4 },
    ],
    outputs: [
      {
        id: "monthly",
        label: "Monthly payout",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "totalInterest5y", label: "Total interest (5 yr)", format: "currency-inr" },
    ],
    compute: (i) => {
      const annual = (numF(i.amount) * numF(i.rate)) / 100;
      return { monthly: annual / 12, totalInterest5y: annual * 5 };
    },
  },

  // ── EPF Final ──────────────────────────────────────────────────────────
  {
    slug: "epf-final",
    inputs: [
      { id: "basic", label: "Current basic+DA", kind: "currency", default: 30000 },
      { id: "currentBalance", label: "Current EPF balance", kind: "currency", default: 0 },
      { id: "currentAge", label: "Current age", kind: "number", default: 30 },
      { id: "retireAge", label: "Retirement age", kind: "number", default: 58 },
      { id: "growthRate", label: "Salary growth", kind: "percent", default: 8 },
    ],
    outputs: [
      {
        id: "maturity",
        label: "EPF at retirement",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const monthlyRate = 8.15 / 12 / 100;
      let bal = numF(i.currentBalance);
      let basic = numF(i.basic);
      const months = (numF(i.retireAge) - numF(i.currentAge)) * 12;
      for (let m = 1; m <= months; m++) {
        bal += basic * (0.12 + 0.0367);
        bal *= 1 + monthlyRate;
        if (m % 12 === 0) basic *= 1 + numF(i.growthRate) / 100;
      }
      return { maturity: bal };
    },
  },

  // ── NPS Withdrawal ─────────────────────────────────────────────────────
  {
    slug: "nps-withdraw",
    inputs: [
      { id: "corpus", label: "NPS corpus at 60", kind: "currency", default: 5000000 },
      { id: "annuityRate", label: "Annuity rate", kind: "percent", default: 6 },
    ],
    outputs: [
      {
        id: "lumpsum",
        label: "60% lumpsum (tax-free)",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "annuityCorpus", label: "40% annuity corpus", format: "currency-inr" },
      { id: "monthlyPension", label: "Monthly pension", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const lump = numF(i.corpus) * 0.6;
      const ann = numF(i.corpus) * 0.4;
      return {
        lumpsum: lump,
        annuityCorpus: ann,
        monthlyPension: (ann * numF(i.annuityRate)) / 100 / 12,
      };
    },
  },

  // ── LTCG (Equity) ──────────────────────────────────────────────────────
  {
    slug: "ltcg-equity",
    inputs: [
      { id: "buy", label: "Buy price", kind: "currency", default: 100 },
      { id: "sell", label: "Sell price", kind: "currency", default: 250 },
      { id: "qty", label: "Quantity", kind: "number", default: 1000 },
    ],
    outputs: [
      { id: "gain", label: "Total gain", format: "currency-inr" },
      { id: "exempt", label: "Exempt (₹1.25 L)", format: "currency-inr", tone: "success" },
      { id: "tax", label: "LTCG @12.5%", format: "currency-inr", tone: "error", big: true },
      { id: "netAfterTax", label: "Net after tax", format: "currency-inr", tone: "primary" },
    ],
    compute: (i) => {
      const gain = (numF(i.sell) - numF(i.buy)) * numF(i.qty);
      const taxable = Math.max(0, gain - 125000);
      const tax = taxable * 0.125;
      return { gain, exempt: Math.min(125000, Math.max(0, gain)), tax, netAfterTax: gain - tax };
    },
  },

  // ── STCG (Equity) ──────────────────────────────────────────────────────
  {
    slug: "stcg-equity",
    inputs: [
      { id: "buy", label: "Buy price", kind: "currency", default: 100 },
      { id: "sell", label: "Sell price", kind: "currency", default: 150 },
      { id: "qty", label: "Quantity", kind: "number", default: 500 },
    ],
    outputs: [
      { id: "gain", label: "Total gain", format: "currency-inr" },
      { id: "tax", label: "STCG @20%", format: "currency-inr", tone: "error", big: true },
      { id: "netAfterTax", label: "Net after tax", format: "currency-inr", tone: "primary" },
    ],
    compute: (i) => {
      const gain = (numF(i.sell) - numF(i.buy)) * numF(i.qty);
      const tax = Math.max(0, gain) * 0.2;
      return { gain, tax, netAfterTax: gain - tax };
    },
  },

  // ── Property Gains (indexed) ───────────────────────────────────────────
  {
    slug: "property-gains",
    inputs: [
      { id: "buy", label: "Buy price", kind: "currency", default: 3000000 },
      { id: "sell", label: "Sell price", kind: "currency", default: 5000000 },
      { id: "buyYear", label: "Year of purchase", kind: "number", default: 2015 },
      { id: "sellYear", label: "Year of sale", kind: "number", default: 2025 },
    ],
    outputs: [
      { id: "indexedCost", label: "Indexed cost", format: "currency-inr" },
      { id: "gain", label: "Indexed LTCG", format: "currency-inr" },
      {
        id: "tax",
        label: "Tax @20% with indexation",
        format: "currency-inr",
        tone: "error",
        big: true,
      },
    ],
    compute: (i) => {
      // Rough: CII ~ 6% inflation
      const factor = Math.pow(1.06, Math.max(0, numF(i.sellYear) - numF(i.buyYear)));
      const indexed = numF(i.buy) * factor;
      const gain = Math.max(0, numF(i.sell) - indexed);
      return { indexedCost: indexed, gain, tax: gain * 0.2 };
    },
  },

  // ── Advance Tax ────────────────────────────────────────────────────────
  {
    slug: "advance-tax",
    inputs: [
      { id: "income", label: "Estimated annual income", kind: "currency", default: 1500000 },
      { id: "deduction", label: "Total deduction", kind: "currency", default: 175000 },
      {
        id: "regime",
        label: "Regime",
        kind: "select",
        default: "new",
        options: [
          { value: "new", label: "New" },
          { value: "old", label: "Old" },
        ],
      },
    ],
    outputs: [
      {
        id: "totalTax",
        label: "Total tax liability",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "june15", label: "By 15 June (15%)", format: "currency-inr" },
      { id: "sep15", label: "By 15 Sep (45%)", format: "currency-inr" },
      { id: "dec15", label: "By 15 Dec (75%)", format: "currency-inr" },
      { id: "mar15", label: "By 15 Mar (100%)", format: "currency-inr" },
    ],
    compute: (i) => {
      const taxable = Math.max(
        0,
        numF(i.income) - numF(i.deduction) - (i.regime === "new" ? 75000 : 50000),
      );
      const tax =
        i.regime === "new" ? calculateNewRegimeTax(taxable) : calculateOldRegimeTax(taxable);
      return {
        totalTax: tax,
        june15: tax * 0.15,
        sep15: tax * 0.45,
        dec15: tax * 0.75,
        mar15: tax,
      };
    },
  },

  // ── TDS ────────────────────────────────────────────────────────────────
  {
    slug: "tds",
    inputs: [
      { id: "amount", label: "Payment amount", kind: "currency", default: 50000 },
      { id: "rate", label: "TDS rate", kind: "percent", default: 10 },
    ],
    outputs: [
      { id: "tds", label: "TDS deducted", format: "currency-inr", tone: "error", big: true },
      { id: "net", label: "Net payable", format: "currency-inr", tone: "primary" },
    ],
    compute: (i) => ({
      tds: (numF(i.amount) * numF(i.rate)) / 100,
      net: numF(i.amount) * (1 - numF(i.rate) / 100),
    }),
  },

  // ── 80C Tax Saver ──────────────────────────────────────────────────────
  {
    slug: "section-80c",
    inputs: [
      { id: "ppf", label: "PPF", kind: "currency", default: 50000 },
      { id: "elss", label: "ELSS", kind: "currency", default: 50000 },
      { id: "epf", label: "EPF (employee)", kind: "currency", default: 40000 },
      { id: "life", label: "Life insurance premium", kind: "currency", default: 10000 },
      { id: "principal", label: "Home loan principal repayment", kind: "currency", default: 0 },
    ],
    outputs: [
      { id: "total", label: "Total 80C investments", format: "currency-inr" },
      {
        id: "eligible",
        label: "Deduction (capped ₹1.5L)",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "taxSaved", label: "Tax saved (30% slab)", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const total = numF(i.ppf) + numF(i.elss) + numF(i.epf) + numF(i.life) + numF(i.principal);
      const elig = Math.min(150000, total);
      return { total, eligible: elig, taxSaved: elig * 0.312 };
    },
  },

  // ── New vs Old Regime ──────────────────────────────────────────────────
  {
    slug: "regime-compare",
    inputs: [
      { id: "income", label: "Annual income", kind: "currency", default: 1500000 },
      { id: "deduction", label: "Total deduction (old)", kind: "currency", default: 175000 },
    ],
    outputs: [
      { id: "old", label: "Old regime tax", format: "currency-inr" },
      { id: "newRegime", label: "New regime tax", format: "currency-inr" },
      { id: "savings", label: "You save", format: "currency-inr", tone: "success", big: true },
      { id: "better", label: "Better regime", format: "text", tone: "primary" },
    ],
    compute: (i) => {
      const oldTax = calculateOldRegimeTax(Math.max(0, numF(i.income) - 50000 - numF(i.deduction)));
      const newTax = calculateNewRegimeTax(Math.max(0, numF(i.income) - 75000));
      return {
        old: oldTax,
        newRegime: newTax,
        savings: Math.abs(oldTax - newTax),
        better: oldTax <= newTax ? "Old" : "New",
      };
    },
  },

  // ── Form 16 In-hand ────────────────────────────────────────────────────
  {
    slug: "form-16",
    inputs: [
      { id: "ctc", label: "Annual CTC", kind: "currency", default: 1500000 },
      {
        id: "regime",
        label: "Regime",
        kind: "select",
        default: "new",
        options: [
          { value: "new", label: "New" },
          { value: "old", label: "Old" },
        ],
      },
    ],
    outputs: [
      { id: "annualInHand", label: "Annual in-hand", format: "currency-inr" },
      {
        id: "monthlyInHand",
        label: "Monthly in-hand",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const basic = numF(i.ctc) * 0.4;
      const epfEmp = basic * 0.12;
      const epfEmer = basic * 0.12;
      const gross = numF(i.ctc) - epfEmer;
      const taxable = Math.max(0, gross - (i.regime === "new" ? 75000 : 50000));
      const tax =
        i.regime === "new" ? calculateNewRegimeTax(taxable) : calculateOldRegimeTax(taxable);
      const inHand = gross - epfEmp - tax;
      return { annualInHand: inHand, monthlyInHand: inHand / 12 };
    },
  },

  // ── XIRR (irregular IRR, simplified) ───────────────────────────────────
  {
    slug: "xirr",
    inputs: [
      {
        id: "cashFlows",
        label: "Cash flows (comma)",
        kind: "text",
        default: "-100000, -100000, -100000, 400000",
      },
      { id: "yearsPerStep", label: "Years per step", kind: "number", default: 1, step: 0.25 },
    ],
    outputs: [
      { id: "xirr", label: "XIRR (annualized)", format: "percent", tone: "primary", big: true },
    ],
    compute: (i) => {
      const flows = String(i.cashFlows)
        .split(/[,\s]+/)
        .map(Number)
        .filter((x) => !Number.isNaN(x));
      if (flows.length < 2) return { xirr: 0 };
      let lo = -0.99,
        hi = 5;
      const step = numF(i.yearsPerStep);
      for (let it = 0; it < 80; it++) {
        const mid = (lo + hi) / 2;
        const npv = flows.reduce((acc, cf, idx) => acc + cf / Math.pow(1 + mid, idx * step), 0);
        if (npv > 0) lo = mid;
        else hi = mid;
      }
      return { xirr: ((lo + hi) / 2) * 100 };
    },
  },

  // ── SWP ────────────────────────────────────────────────────────────────
  {
    slug: "swp",
    inputs: [
      { id: "corpus", label: "Corpus", kind: "currency", default: 5000000 },
      { id: "monthly", label: "Monthly withdrawal", kind: "currency", default: 30000 },
      { id: "rate", label: "Annual return", kind: "percent", default: 9 },
    ],
    outputs: [
      {
        id: "monthsLast",
        label: "Corpus lasts",
        format: "integer",
        suffix: " months",
        tone: "primary",
        big: true,
      },
      { id: "yearsLast", label: "Years", format: "number" },
      { id: "totalDrawn", label: "Total withdrawn", format: "currency-inr" },
    ],
    compute: (i) => {
      const r = numF(i.rate) / 12 / 100;
      let bal = numF(i.corpus);
      const w = numF(i.monthly);
      let months = 0;
      let total = 0;
      while (bal > 0 && months < 1200) {
        bal = bal * (1 + r) - w;
        total += w;
        months++;
        if (bal < 0) {
          total += bal;
          break;
        }
      }
      return { monthsLast: months, yearsLast: months / 12, totalDrawn: total };
    },
  },

  // ── STP ────────────────────────────────────────────────────────────────
  {
    slug: "stp",
    inputs: [
      { id: "source", label: "Source corpus", kind: "currency", default: 500000 },
      { id: "transfer", label: "Monthly transfer", kind: "currency", default: 25000 },
      { id: "growth", label: "Growth rate (equity)", kind: "percent", default: 12 },
      { id: "months", label: "Months", kind: "number", default: 12 },
    ],
    outputs: [
      {
        id: "finalEquity",
        label: "Final equity value",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "totalTransferred", label: "Total transferred", format: "currency-inr" },
    ],
    compute: (i) => {
      const r = numF(i.growth) / 12 / 100;
      let total = 0;
      for (let m = 1; m <= numF(i.months); m++) total = (total + numF(i.transfer)) * (1 + r);
      return { finalEquity: total, totalTransferred: numF(i.transfer) * numF(i.months) };
    },
  },

  // ── ELSS ───────────────────────────────────────────────────────────────
  {
    slug: "elss",
    inputs: [
      { id: "invest", label: "Annual investment", kind: "currency", default: 150000 },
      { id: "growth", label: "Expected return", kind: "percent", default: 12 },
      { id: "years", label: "Years", kind: "number", default: 10 },
      {
        id: "slab",
        label: "Tax slab",
        kind: "select",
        default: 30,
        options: [
          { value: 5, label: "5%" },
          { value: 20, label: "20%" },
          { value: 30, label: "30%" },
        ],
      },
    ],
    outputs: [
      { id: "taxSaved", label: "Annual tax saved", format: "currency-inr", tone: "success" },
      {
        id: "maturity",
        label: "Maturity value",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      let bal = 0;
      const r = numF(i.growth) / 100;
      for (let y = 1; y <= numF(i.years); y++) bal = (bal + numF(i.invest)) * (1 + r);
      return { taxSaved: (Math.min(150000, numF(i.invest)) * numF(i.slab)) / 100, maturity: bal };
    },
  },

  // ── Step-up SIP ────────────────────────────────────────────────────────
  {
    slug: "step-up-sip",
    inputs: [
      { id: "monthly", label: "Initial monthly SIP", kind: "currency", default: 10000 },
      { id: "stepUp", label: "Annual step-up", kind: "percent", default: 10 },
      { id: "rate", label: "Expected return", kind: "percent", default: 12 },
      { id: "years", label: "Years", kind: "number", default: 25 },
    ],
    outputs: [
      { id: "totalInvested", label: "Total invested", format: "currency-inr" },
      {
        id: "finalValue",
        label: "Final value",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "gain", label: "Gain", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      let total = 0;
      let invested = 0;
      let monthly = numF(i.monthly);
      const r = numF(i.rate) / 12 / 100;
      for (let y = 1; y <= numF(i.years); y++) {
        for (let m = 0; m < 12; m++) {
          total = (total + monthly) * (1 + r);
          invested += monthly;
        }
        monthly *= 1 + numF(i.stepUp) / 100;
      }
      return { totalInvested: invested, finalValue: total, gain: total - invested };
    },
  },

  // ── SGB ────────────────────────────────────────────────────────────────
  {
    slug: "sgb",
    inputs: [
      { id: "grams", label: "Grams", kind: "number", default: 10 },
      { id: "price", label: "Price/gram", kind: "currency", default: 7000 },
      { id: "tenure", label: "Tenure (years)", kind: "number", default: 8 },
      { id: "growth", label: "Gold price growth", kind: "percent", default: 8 },
    ],
    outputs: [
      {
        id: "maturity",
        label: "Maturity value",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      {
        id: "interest",
        label: "Interest income (2.5%/yr)",
        format: "currency-inr",
        tone: "success",
      },
    ],
    compute: (i) => {
      const cost = numF(i.grams) * numF(i.price);
      const finalPrice = numF(i.price) * Math.pow(1 + numF(i.growth) / 100, numF(i.tenure));
      const matur = numF(i.grams) * finalPrice;
      const int = (cost * 2.5 * numF(i.tenure)) / 100;
      return { maturity: matur, interest: int };
    },
  },

  // ── Stamp Duty ─────────────────────────────────────────────────────────
  {
    slug: "stamp-duty",
    inputs: [
      { id: "price", label: "Property price", kind: "currency", default: 5000000 },
      { id: "stampPct", label: "Stamp duty %", kind: "percent", default: 6 },
      { id: "regPct", label: "Registration %", kind: "percent", default: 1 },
    ],
    outputs: [
      { id: "stamp", label: "Stamp duty", format: "currency-inr" },
      { id: "registration", label: "Registration", format: "currency-inr" },
      {
        id: "total",
        label: "Total additional",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const stamp = (numF(i.price) * numF(i.stampPct)) / 100;
      const reg = (numF(i.price) * numF(i.regPct)) / 100;
      return { stamp, registration: reg, total: stamp + reg };
    },
  },

  // ── Brokerage / F&O ────────────────────────────────────────────────────
  {
    slug: "brokerage",
    inputs: [
      { id: "buy", label: "Buy value", kind: "currency", default: 100000 },
      { id: "sell", label: "Sell value", kind: "currency", default: 105000 },
      { id: "brokeragePct", label: "Brokerage %", kind: "percent", default: 0.03 },
      {
        id: "segment",
        label: "Segment",
        kind: "select",
        default: "delivery",
        options: [
          { value: "delivery", label: "Equity Delivery" },
          { value: "intraday", label: "Intraday" },
          { value: "fo", label: "F&O" },
        ],
      },
    ],
    outputs: [
      { id: "brokerage", label: "Brokerage", format: "currency-inr" },
      { id: "stt", label: "STT", format: "currency-inr" },
      { id: "gst", label: "GST", format: "currency-inr" },
      { id: "totalCharges", label: "Total charges", format: "currency-inr", tone: "error" },
      {
        id: "netPnl",
        label: "Net P/L after costs",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const turnover = numF(i.buy) + numF(i.sell);
      const broker = Math.min(40, (turnover * numF(i.brokeragePct)) / 100);
      const sttRate =
        i.segment === "delivery" ? 0.001 : i.segment === "intraday" ? 0.00025 : 0.0001;
      const stt = sttRate * numF(i.sell);
      const gst = 0.18 * broker;
      const total = broker + stt + gst + 15.93; // misc
      return {
        brokerage: broker,
        stt,
        gst,
        totalCharges: total,
        netPnl: numF(i.sell) - numF(i.buy) - total,
      };
    },
  },
];
