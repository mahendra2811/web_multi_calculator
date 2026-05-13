import type { CalculatorSchema } from "../schema-types";
import { calculateEMI } from "../finance";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const FINANCE_GLOBAL_SCHEMAS: CalculatorSchema[] = [
  // ─── Amortization Schedule ──────────────────────────────────────────────
  {
    slug: "amortization",
    inputs: [
      { id: "principal", label: "Loan amount", kind: "currency", default: 1000000, prefix: "₹" },
      { id: "rate", label: "Interest rate", kind: "percent", default: 8.5, suffix: "%" },
      { id: "years", label: "Tenure (years)", kind: "number", default: 20, suffix: "yr" },
    ],
    outputs: [
      { id: "emi", label: "Monthly EMI", format: "currency-inr", tone: "primary", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
      { id: "totalPayment", label: "Total paid", format: "currency-inr" },
      { id: "firstInterest", label: "Interest in month 1", format: "currency-inr" },
      { id: "firstPrincipal", label: "Principal in month 1", format: "currency-inr" },
    ],
    compute: (i) => {
      const r = calculateEMI({
        principal: numF(i.principal),
        annualRatePct: numF(i.rate),
        years: numF(i.years),
      });
      const first = r.schedule[0];
      return {
        emi: r.emi,
        totalInterest: r.totalInterest,
        totalPayment: r.totalPayment,
        firstInterest: first?.interest ?? 0,
        firstPrincipal: first?.principal ?? 0,
      };
    },
    formula: "EMI = P·r·(1+r)^n / ((1+r)^n−1)",
  },

  // ─── Mortgage Payoff ────────────────────────────────────────────────────
  {
    slug: "mortgage-payoff",
    inputs: [
      { id: "balance", label: "Current balance", kind: "currency", default: 5000000, prefix: "₹" },
      { id: "rate", label: "Interest rate", kind: "percent", default: 8.5 },
      { id: "emi", label: "Current EMI", kind: "currency", default: 45000, prefix: "₹" },
      { id: "extra", label: "Extra monthly", kind: "currency", default: 5000, prefix: "₹" },
    ],
    outputs: [
      { id: "months", label: "Months to payoff", format: "integer", tone: "primary", big: true },
      { id: "monthsSaved", label: "Months saved", format: "integer", tone: "success" },
      { id: "interestSaved", label: "Interest saved", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const r = numF(i.rate) / 12 / 100;
      const monthlyPay = numF(i.emi) + numF(i.extra);
      let balance = numF(i.balance);
      let months = 0;
      let interestPaid = 0;
      while (balance > 0 && months < 600) {
        const interest = balance * r;
        interestPaid += interest;
        balance = balance + interest - monthlyPay;
        months++;
      }
      // Baseline without extra
      let b2 = numF(i.balance);
      let m2 = 0;
      let i2 = 0;
      while (b2 > 0 && m2 < 600) {
        const x = b2 * r;
        i2 += x;
        b2 = b2 + x - numF(i.emi);
        m2++;
      }
      return {
        months,
        monthsSaved: Math.max(0, m2 - months),
        interestSaved: Math.max(0, i2 - interestPaid),
      };
    },
  },

  // ─── Refinance ──────────────────────────────────────────────────────────
  {
    slug: "refinance",
    inputs: [
      { id: "balance", label: "Current balance", kind: "currency", default: 4000000 },
      { id: "oldRate", label: "Current rate", kind: "percent", default: 9 },
      { id: "newRate", label: "New rate", kind: "percent", default: 8 },
      { id: "years", label: "Remaining years", kind: "number", default: 15 },
      { id: "fees", label: "Refinance fees", kind: "currency", default: 25000 },
    ],
    outputs: [
      { id: "oldEmi", label: "Old EMI", format: "currency-inr" },
      { id: "newEmi", label: "New EMI", format: "currency-inr", tone: "primary", big: true },
      { id: "monthlySaving", label: "Monthly saving", format: "currency-inr", tone: "success" },
      { id: "breakEvenMonths", label: "Break-even", format: "integer", suffix: " mo" },
      { id: "lifetimeSaving", label: "Lifetime saving", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const old = calculateEMI({
        principal: numF(i.balance),
        annualRatePct: numF(i.oldRate),
        years: numF(i.years),
      });
      const nw = calculateEMI({
        principal: numF(i.balance),
        annualRatePct: numF(i.newRate),
        years: numF(i.years),
      });
      const saving = old.emi - nw.emi;
      return {
        oldEmi: old.emi,
        newEmi: nw.emi,
        monthlySaving: saving,
        breakEvenMonths: saving > 0 ? Math.ceil(numF(i.fees) / saving) : Infinity,
        lifetimeSaving: old.totalPayment - nw.totalPayment - numF(i.fees),
      };
    },
  },

  // ─── House Affordability ────────────────────────────────────────────────
  {
    slug: "house-affordability",
    inputs: [
      { id: "monthlyIncome", label: "Monthly income", kind: "currency", default: 100000 },
      { id: "monthlyDebt", label: "Existing monthly debt", kind: "currency", default: 5000 },
      { id: "dti", label: "Max DTI ratio", kind: "percent", default: 40 },
      { id: "rate", label: "Interest rate", kind: "percent", default: 8.5 },
      { id: "years", label: "Tenure (years)", kind: "number", default: 20 },
      { id: "downPaymentPct", label: "Down payment %", kind: "percent", default: 20 },
    ],
    outputs: [
      { id: "maxEmi", label: "Max EMI", format: "currency-inr" },
      {
        id: "maxLoan",
        label: "Max loan amount",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "maxPrice", label: "Max house price", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const maxEmi = (numF(i.monthlyIncome) * numF(i.dti)) / 100 - numF(i.monthlyDebt);
      const r = numF(i.rate) / 12 / 100;
      const n = numF(i.years) * 12;
      const maxLoan =
        r === 0 ? maxEmi * n : (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
      const maxPrice = maxLoan / (1 - numF(i.downPaymentPct) / 100);
      return {
        maxEmi: Math.max(0, maxEmi),
        maxLoan: Math.max(0, maxLoan),
        maxPrice: Math.max(0, maxPrice),
      };
    },
  },

  // ─── Rent Affordability ─────────────────────────────────────────────────
  {
    slug: "rent-affordability",
    inputs: [
      { id: "monthlyIncome", label: "Monthly income", kind: "currency", default: 80000 },
      { id: "monthlyDebt", label: "Other monthly debt", kind: "currency", default: 0 },
      { id: "rentPct", label: "Max rent % of income", kind: "percent", default: 30 },
    ],
    outputs: [
      {
        id: "maxRent",
        label: "Max recommended rent",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "remaining", label: "Remaining for other expenses", format: "currency-inr" },
    ],
    compute: (i) => {
      const maxRent = (numF(i.monthlyIncome) * numF(i.rentPct)) / 100;
      return { maxRent, remaining: numF(i.monthlyIncome) - maxRent - numF(i.monthlyDebt) };
    },
  },

  // ─── Down Payment ───────────────────────────────────────────────────────
  {
    slug: "down-payment",
    inputs: [
      { id: "price", label: "Property price", kind: "currency", default: 5000000 },
      { id: "downPct", label: "Down payment %", kind: "percent", default: 20 },
    ],
    outputs: [
      {
        id: "downPayment",
        label: "Down payment",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "loanAmount", label: "Loan amount", format: "currency-inr" },
      { id: "ltv", label: "Loan-to-value", format: "percent" },
    ],
    compute: (i) => {
      const dp = (numF(i.price) * numF(i.downPct)) / 100;
      return { downPayment: dp, loanAmount: numF(i.price) - dp, ltv: 100 - numF(i.downPct) };
    },
  },

  // ─── Rent vs Buy (full NPV-lite) ───────────────────────────────────────
  {
    slug: "rent-vs-buy",
    inputs: [
      { id: "price", label: "House price", kind: "currency", default: 7500000 },
      { id: "downPct", label: "Down %", kind: "percent", default: 20 },
      { id: "loanRate", label: "Loan rate", kind: "percent", default: 8.5 },
      { id: "tenureYears", label: "Tenure (years)", kind: "number", default: 20 },
      { id: "rent", label: "Monthly rent", kind: "currency", default: 25000 },
      { id: "rentGrowth", label: "Rent growth", kind: "percent", default: 7 },
      { id: "investReturn", label: "Invest return on saved money", kind: "percent", default: 12 },
      { id: "appreciation", label: "House appreciation", kind: "percent", default: 5 },
    ],
    outputs: [
      { id: "verdict", label: "Better choice", format: "text", tone: "primary", big: true },
      { id: "totalBuy", label: "Total buy cost", format: "currency-inr" },
      { id: "totalRent", label: "Total rent paid", format: "currency-inr" },
      { id: "renterCorpus", label: "Renter's corpus", format: "currency-inr" },
      { id: "houseValue", label: "House final value", format: "currency-inr" },
    ],
    compute: (i) => {
      const dp = (numF(i.price) * numF(i.downPct)) / 100;
      const principal = numF(i.price) - dp;
      const emi = calculateEMI({
        principal,
        annualRatePct: numF(i.loanRate),
        years: numF(i.tenureYears),
      }).emi;
      let rent = numF(i.rent);
      let rentTotal = 0;
      let renterCorpus = dp;
      const r = numF(i.investReturn) / 12 / 100;
      for (let y = 1; y <= numF(i.tenureYears); y++) {
        for (let m = 0; m < 12; m++) {
          rentTotal += rent;
          const diff = Math.max(emi - rent, 0);
          renterCorpus = (renterCorpus + diff) * (1 + r);
        }
        rent *= 1 + numF(i.rentGrowth) / 100;
      }
      const totalBuy = dp + emi * 12 * numF(i.tenureYears);
      const houseValue =
        numF(i.price) * Math.pow(1 + numF(i.appreciation) / 100, numF(i.tenureYears));
      const buyerNet = totalBuy - houseValue;
      const renterNet = rentTotal - renterCorpus;
      return {
        verdict: buyerNet < renterNet ? "Buy" : "Rent + invest",
        totalBuy,
        totalRent: rentTotal,
        renterCorpus,
        houseValue,
      };
    },
  },

  // ─── APR (with fees) ────────────────────────────────────────────────────
  {
    slug: "apr",
    inputs: [
      { id: "loan", label: "Loan amount", kind: "currency", default: 1000000 },
      { id: "fees", label: "Upfront fees", kind: "currency", default: 20000 },
      { id: "rate", label: "Nominal rate", kind: "percent", default: 9 },
      { id: "years", label: "Years", kind: "number", default: 5 },
    ],
    outputs: [
      { id: "emi", label: "Monthly payment", format: "currency-inr" },
      { id: "apr", label: "True APR", format: "percent", tone: "primary", big: true },
    ],
    compute: (i) => {
      const r = calculateEMI({
        principal: numF(i.loan),
        annualRatePct: numF(i.rate),
        years: numF(i.years),
      });
      // Solve APR: find rate where PV of EMIs = (loan − fees)
      const net = numF(i.loan) - numF(i.fees);
      const n = numF(i.years) * 12;
      let lo = 0,
        hi = 1; // monthly rate
      for (let it = 0; it < 60; it++) {
        const mid = (lo + hi) / 2;
        const pv = mid === 0 ? r.emi * n : (r.emi * (1 - Math.pow(1 + mid, -n))) / mid;
        if (pv > net) lo = mid;
        else hi = mid;
      }
      return { emi: r.emi, apr: ((lo + hi) / 2) * 12 * 100 };
    },
  },

  // ─── Auto Loan ─────────────────────────────────────────────────────────
  {
    slug: "auto-loan",
    inputs: [
      { id: "price", label: "Vehicle price", kind: "currency", default: 800000 },
      { id: "down", label: "Down payment", kind: "currency", default: 100000 },
      { id: "tradeIn", label: "Trade-in value", kind: "currency", default: 0 },
      { id: "rate", label: "Interest rate", kind: "percent", default: 9.5 },
      { id: "years", label: "Tenure", kind: "number", default: 5 },
    ],
    outputs: [
      { id: "loan", label: "Loan amount", format: "currency-inr" },
      { id: "emi", label: "Monthly EMI", format: "currency-inr", tone: "primary", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
    ],
    compute: (i) => {
      const loan = numF(i.price) - numF(i.down) - numF(i.tradeIn);
      const r = calculateEMI({
        principal: loan,
        annualRatePct: numF(i.rate),
        years: numF(i.years),
      });
      return { loan, emi: r.emi, totalInterest: r.totalInterest };
    },
  },

  // ─── Auto Lease ────────────────────────────────────────────────────────
  {
    slug: "auto-lease",
    inputs: [
      { id: "msrp", label: "Vehicle price (MSRP)", kind: "currency", default: 800000 },
      { id: "residual", label: "Residual value", kind: "currency", default: 400000 },
      { id: "moneyFactor", label: "Money factor", kind: "number", default: 0.0025, step: 0.0001 },
      { id: "months", label: "Lease term (months)", kind: "number", default: 36 },
    ],
    outputs: [
      { id: "depreciation", label: "Monthly depreciation", format: "currency-inr" },
      { id: "interest", label: "Monthly finance charge", format: "currency-inr" },
      {
        id: "payment",
        label: "Monthly lease payment",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const dep = (numF(i.msrp) - numF(i.residual)) / numF(i.months);
      const fin = (numF(i.msrp) + numF(i.residual)) * numF(i.moneyFactor);
      return { depreciation: dep, interest: fin, payment: dep + fin };
    },
  },

  // ─── Credit Card Payoff ─────────────────────────────────────────────────
  {
    slug: "credit-card-payoff",
    inputs: [
      { id: "balance", label: "Balance", kind: "currency", default: 50000 },
      { id: "apr", label: "APR", kind: "percent", default: 36 },
      { id: "monthly", label: "Monthly payment", kind: "currency", default: 5000 },
    ],
    outputs: [
      { id: "months", label: "Months to clear", format: "integer", tone: "primary", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
      { id: "totalPaid", label: "Total paid", format: "currency-inr" },
    ],
    compute: (i) => {
      const r = numF(i.apr) / 12 / 100;
      let bal = numF(i.balance);
      const pay = numF(i.monthly);
      let months = 0;
      let totalInt = 0;
      while (bal > 0 && months < 1200) {
        const interest = bal * r;
        if (pay <= interest)
          return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
        totalInt += interest;
        bal = bal + interest - pay;
        months++;
      }
      return { months, totalInterest: totalInt, totalPaid: numF(i.balance) + totalInt };
    },
  },

  // ─── Credit Card Min Payment ────────────────────────────────────────────
  {
    slug: "credit-card-min",
    inputs: [
      { id: "balance", label: "Balance", kind: "currency", default: 100000 },
      { id: "apr", label: "APR", kind: "percent", default: 36 },
      { id: "minPct", label: "Min payment %", kind: "percent", default: 5 },
    ],
    outputs: [
      { id: "months", label: "Months at min payment", format: "integer", tone: "error", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
    ],
    compute: (i) => {
      const r = numF(i.apr) / 12 / 100;
      let bal = numF(i.balance);
      let months = 0;
      let totalInt = 0;
      while (bal > 0 && months < 600) {
        const interest = bal * r;
        const pay = Math.max((bal * numF(i.minPct)) / 100, interest + 100);
        totalInt += interest;
        bal = bal + interest - pay;
        months++;
      }
      return { months, totalInterest: totalInt };
    },
  },

  // ─── Debt Snowball / Avalanche ──────────────────────────────────────────
  {
    slug: "debt-snowball",
    inputs: [
      { id: "totalDebt", label: "Total debt", kind: "currency", default: 500000 },
      { id: "avgApr", label: "Avg APR", kind: "percent", default: 18 },
      { id: "monthlyPay", label: "Monthly payment", kind: "currency", default: 15000 },
    ],
    outputs: [
      { id: "months", label: "Months to clear", format: "integer", tone: "primary", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
    ],
    compute: (i) => {
      const r = numF(i.avgApr) / 12 / 100;
      let bal = numF(i.totalDebt);
      const pay = numF(i.monthlyPay);
      let months = 0;
      let int = 0;
      while (bal > 0 && months < 1200) {
        const x = bal * r;
        if (pay <= x) return { months: Infinity, totalInterest: Infinity };
        int += x;
        bal = bal + x - pay;
        months++;
      }
      return { months, totalInterest: int };
    },
  },

  // ─── Debt Consolidation ─────────────────────────────────────────────────
  {
    slug: "debt-consolidation",
    inputs: [
      { id: "currentDebt", label: "Current total debt", kind: "currency", default: 500000 },
      { id: "currentApr", label: "Current avg APR", kind: "percent", default: 24 },
      { id: "newApr", label: "Consolidation APR", kind: "percent", default: 12 },
      { id: "years", label: "Payoff term (years)", kind: "number", default: 5 },
    ],
    outputs: [
      { id: "oldEmi", label: "Old monthly", format: "currency-inr" },
      { id: "newEmi", label: "New monthly", format: "currency-inr", tone: "primary", big: true },
      { id: "monthlySaving", label: "Monthly saving", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const old = calculateEMI({
        principal: numF(i.currentDebt),
        annualRatePct: numF(i.currentApr),
        years: numF(i.years),
      });
      const nw = calculateEMI({
        principal: numF(i.currentDebt),
        annualRatePct: numF(i.newApr),
        years: numF(i.years),
      });
      return { oldEmi: old.emi, newEmi: nw.emi, monthlySaving: old.emi - nw.emi };
    },
  },

  // ─── DTI Ratio ──────────────────────────────────────────────────────────
  {
    slug: "dti",
    inputs: [
      { id: "monthlyDebt", label: "Monthly debt payments", kind: "currency", default: 25000 },
      { id: "monthlyIncome", label: "Gross monthly income", kind: "currency", default: 100000 },
    ],
    outputs: [
      { id: "dti", label: "Debt-to-income", format: "percent", tone: "primary", big: true },
      { id: "verdict", label: "Verdict", format: "text" },
    ],
    compute: (i) => {
      const ratio =
        numF(i.monthlyIncome) === 0 ? 0 : (numF(i.monthlyDebt) / numF(i.monthlyIncome)) * 100;
      const verdict =
        ratio < 20 ? "Excellent" : ratio < 36 ? "Good" : ratio < 43 ? "Acceptable" : "High — risky";
      return { dti: ratio, verdict };
    },
  },

  // ─── Student Loan ───────────────────────────────────────────────────────
  {
    slug: "student-loan",
    inputs: [
      { id: "loan", label: "Loan amount", kind: "currency", default: 1000000 },
      { id: "rate", label: "Interest rate", kind: "percent", default: 10 },
      { id: "years", label: "Tenure", kind: "number", default: 10 },
    ],
    outputs: [
      { id: "emi", label: "Monthly EMI", format: "currency-inr", tone: "primary", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
    ],
    compute: (i) => {
      const r = calculateEMI({
        principal: numF(i.loan),
        annualRatePct: numF(i.rate),
        years: numF(i.years),
      });
      return { emi: r.emi, totalInterest: r.totalInterest };
    },
  },

  // ─── College Cost ───────────────────────────────────────────────────────
  {
    slug: "college-cost",
    inputs: [
      { id: "currentCost", label: "Current annual cost", kind: "currency", default: 500000 },
      { id: "inflation", label: "Education inflation", kind: "percent", default: 10 },
      { id: "yearsAway", label: "Years until enrollment", kind: "number", default: 10 },
      { id: "duration", label: "Course duration (years)", kind: "number", default: 4 },
    ],
    outputs: [
      { id: "yearOneCost", label: "Year-1 cost", format: "currency-inr" },
      { id: "totalCost", label: "Total cost", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => {
      const year1 = numF(i.currentCost) * Math.pow(1 + numF(i.inflation) / 100, numF(i.yearsAway));
      let total = 0;
      for (let y = 0; y < numF(i.duration); y++)
        total += year1 * Math.pow(1 + numF(i.inflation) / 100, y);
      return { yearOneCost: year1, totalCost: total };
    },
  },

  // ─── Payback Period ─────────────────────────────────────────────────────
  {
    slug: "payback-period",
    inputs: [
      { id: "invested", label: "Initial investment", kind: "currency", default: 500000 },
      { id: "annualCashFlow", label: "Annual cash flow", kind: "currency", default: 120000 },
    ],
    outputs: [
      {
        id: "years",
        label: "Payback period",
        format: "number",
        suffix: " yr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const cf = numF(i.annualCashFlow);
      return { years: cf > 0 ? numF(i.invested) / cf : Infinity };
    },
  },

  // ─── NPV ────────────────────────────────────────────────────────────────
  {
    slug: "npv",
    inputs: [
      { id: "initial", label: "Initial outflow", kind: "currency", default: 1000000 },
      { id: "rate", label: "Discount rate", kind: "percent", default: 10 },
      {
        id: "cashFlows",
        label: "Yearly cash flows (comma)",
        kind: "text",
        default: "200000, 300000, 400000, 500000",
      },
    ],
    outputs: [
      { id: "npv", label: "Net present value", format: "currency-inr", tone: "primary", big: true },
      { id: "verdict", label: "Decision", format: "text" },
    ],
    compute: (i) => {
      const flows = String(i.cashFlows)
        .split(/[,\s]+/)
        .map(Number)
        .filter(Number.isFinite);
      const r = numF(i.rate) / 100;
      let npv = -numF(i.initial);
      flows.forEach((cf, idx) => (npv += cf / Math.pow(1 + r, idx + 1)));
      return { npv, verdict: npv >= 0 ? "Accept" : "Reject" };
    },
  },

  // ─── IRR ────────────────────────────────────────────────────────────────
  {
    slug: "irr",
    inputs: [
      { id: "initial", label: "Initial outflow", kind: "currency", default: 1000000 },
      {
        id: "cashFlows",
        label: "Yearly cash flows (comma)",
        kind: "text",
        default: "300000, 400000, 500000, 600000",
      },
    ],
    outputs: [{ id: "irr", label: "IRR", format: "percent", tone: "primary", big: true }],
    compute: (i) => {
      const flows = [
        -numF(i.initial),
        ...String(i.cashFlows)
          .split(/[,\s]+/)
          .map(Number)
          .filter(Number.isFinite),
      ];
      // Bisection
      let lo = -0.99,
        hi = 5;
      for (let it = 0; it < 80; it++) {
        const mid = (lo + hi) / 2;
        const npv = flows.reduce((acc, cf, idx) => acc + cf / Math.pow(1 + mid, idx), 0);
        if (npv > 0) lo = mid;
        else hi = mid;
      }
      return { irr: ((lo + hi) / 2) * 100 };
    },
  },

  // ─── PV ─────────────────────────────────────────────────────────────────
  {
    slug: "present-value",
    inputs: [
      { id: "fv", label: "Future value", kind: "currency", default: 1000000 },
      { id: "rate", label: "Discount rate", kind: "percent", default: 8 },
      { id: "years", label: "Years", kind: "number", default: 10 },
    ],
    outputs: [
      { id: "pv", label: "Present value", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => ({ pv: numF(i.fv) / Math.pow(1 + numF(i.rate) / 100, numF(i.years)) }),
    formula: "PV = FV / (1+r)^n",
  },

  // ─── FV ─────────────────────────────────────────────────────────────────
  {
    slug: "future-value",
    inputs: [
      { id: "pv", label: "Present value", kind: "currency", default: 100000 },
      { id: "rate", label: "Growth rate", kind: "percent", default: 8 },
      { id: "years", label: "Years", kind: "number", default: 10 },
    ],
    outputs: [
      { id: "fv", label: "Future value", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => ({ fv: numF(i.pv) * Math.pow(1 + numF(i.rate) / 100, numF(i.years)) }),
    formula: "FV = PV × (1+r)^n",
  },

  // ─── Annuity FV ─────────────────────────────────────────────────────────
  {
    slug: "annuity-fv",
    inputs: [
      { id: "pmt", label: "Periodic payment", kind: "currency", default: 10000 },
      { id: "rate", label: "Rate per period", kind: "percent", default: 1, step: 0.1 },
      { id: "periods", label: "Number of periods", kind: "number", default: 120 },
    ],
    outputs: [
      { id: "fv", label: "Future value", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => {
      const r = numF(i.rate) / 100;
      const n = numF(i.periods);
      const fv = r === 0 ? numF(i.pmt) * n : (numF(i.pmt) * (Math.pow(1 + r, n) - 1)) / r;
      return { fv };
    },
  },

  // ─── Annuity Payout ─────────────────────────────────────────────────────
  {
    slug: "annuity-payout",
    inputs: [
      { id: "corpus", label: "Initial corpus", kind: "currency", default: 10000000 },
      { id: "rate", label: "Annual return", kind: "percent", default: 7 },
      { id: "years", label: "Payout years", kind: "number", default: 25 },
    ],
    outputs: [
      {
        id: "monthly",
        label: "Monthly payout",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "total", label: "Total payout", format: "currency-inr" },
    ],
    compute: (i) => {
      const r = numF(i.rate) / 12 / 100;
      const n = numF(i.years) * 12;
      const monthly =
        r === 0 ? numF(i.corpus) / n : (numF(i.corpus) * r) / (1 - Math.pow(1 + r, -n));
      return { monthly, total: monthly * n };
    },
  },

  // ─── Bond ───────────────────────────────────────────────────────────────
  {
    slug: "bond",
    inputs: [
      { id: "face", label: "Face value", kind: "currency", default: 1000 },
      { id: "coupon", label: "Coupon rate", kind: "percent", default: 6 },
      { id: "ytm", label: "YTM", kind: "percent", default: 7 },
      { id: "years", label: "Years to maturity", kind: "number", default: 5 },
    ],
    outputs: [
      { id: "price", label: "Bond price", format: "currency-inr", tone: "primary", big: true },
      { id: "couponPay", label: "Annual coupon", format: "currency-inr" },
    ],
    compute: (i) => {
      const c = (numF(i.coupon) / 100) * numF(i.face);
      const y = numF(i.ytm) / 100;
      const n = numF(i.years);
      let pv = 0;
      for (let t = 1; t <= n; t++) pv += c / Math.pow(1 + y, t);
      pv += numF(i.face) / Math.pow(1 + y, n);
      return { price: pv, couponPay: c };
    },
  },

  // ─── Mutual Fund Returns ────────────────────────────────────────────────
  {
    slug: "mutual-fund-returns",
    inputs: [
      { id: "invested", label: "Amount invested", kind: "currency", default: 100000 },
      { id: "navStart", label: "NAV at start", kind: "number", default: 10 },
      { id: "navEnd", label: "NAV now", kind: "number", default: 15 },
      { id: "years", label: "Period (years)", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "currentValue",
        label: "Current value",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "absolute", label: "Absolute return", format: "percent" },
      { id: "cagr", label: "Annualized (CAGR)", format: "percent", tone: "success" },
    ],
    compute: (i) => {
      const units = numF(i.invested) / numF(i.navStart);
      const cur = units * numF(i.navEnd);
      const abs = ((cur - numF(i.invested)) / numF(i.invested)) * 100;
      const cagr =
        numF(i.years) > 0 ? (Math.pow(cur / numF(i.invested), 1 / numF(i.years)) - 1) * 100 : abs;
      return { currentValue: cur, absolute: abs, cagr };
    },
  },

  // ─── Inflation ──────────────────────────────────────────────────────────
  {
    slug: "inflation",
    inputs: [
      { id: "amount", label: "Today's amount", kind: "currency", default: 100000 },
      { id: "rate", label: "Inflation rate", kind: "percent", default: 6 },
      { id: "years", label: "Years ahead", kind: "number", default: 20 },
    ],
    outputs: [
      {
        id: "future",
        label: "Future cost (same purchasing power)",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "real", label: "What ₹X today is worth in N years", format: "currency-inr" },
    ],
    compute: (i) => {
      const factor = Math.pow(1 + numF(i.rate) / 100, numF(i.years));
      return { future: numF(i.amount) * factor, real: numF(i.amount) / factor };
    },
  },

  // ─── Sales Tax ──────────────────────────────────────────────────────────
  {
    slug: "sales-tax",
    inputs: [
      { id: "amount", label: "Amount", kind: "currency", default: 1000 },
      { id: "taxPct", label: "Sales tax", kind: "percent", default: 7 },
    ],
    outputs: [
      { id: "tax", label: "Tax", format: "currency-inr" },
      { id: "total", label: "Total", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => {
      const tax = (numF(i.amount) * numF(i.taxPct)) / 100;
      return { tax, total: numF(i.amount) + tax };
    },
  },

  // ─── VAT ────────────────────────────────────────────────────────────────
  {
    slug: "vat",
    inputs: [
      { id: "amount", label: "Amount", kind: "currency", default: 1000 },
      { id: "vatPct", label: "VAT", kind: "percent", default: 20 },
      { id: "inclusive", label: "Is amount VAT-inclusive?", kind: "toggle", default: false },
    ],
    outputs: [
      { id: "base", label: "Base amount", format: "currency-inr" },
      { id: "vat", label: "VAT", format: "currency-inr" },
      { id: "total", label: "Total", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => {
      const amount = numF(i.amount);
      const v = numF(i.vatPct);
      if (i.inclusive) {
        const base = amount / (1 + v / 100);
        return { base, vat: amount - base, total: amount };
      }
      const vat = (amount * v) / 100;
      return { base: amount, vat, total: amount + vat };
    },
  },

  // ─── Tip ────────────────────────────────────────────────────────────────
  {
    slug: "tip",
    inputs: [
      { id: "bill", label: "Bill amount", kind: "currency", default: 1200 },
      { id: "tipPct", label: "Tip %", kind: "percent", default: 10 },
      { id: "people", label: "Split between", kind: "number", default: 2 },
    ],
    outputs: [
      { id: "tip", label: "Tip", format: "currency-inr" },
      { id: "total", label: "Total bill", format: "currency-inr", tone: "primary", big: true },
      { id: "perPerson", label: "Per person", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const tip = (numF(i.bill) * numF(i.tipPct)) / 100;
      const total = numF(i.bill) + tip;
      return { tip, total, perPerson: total / Math.max(1, numF(i.people)) };
    },
  },

  // ─── Commission ─────────────────────────────────────────────────────────
  {
    slug: "commission",
    inputs: [
      { id: "sale", label: "Sale amount", kind: "currency", default: 100000 },
      { id: "rate", label: "Commission rate", kind: "percent", default: 5 },
    ],
    outputs: [
      { id: "commission", label: "Commission", format: "currency-inr", tone: "primary", big: true },
      { id: "net", label: "Net to seller", format: "currency-inr" },
    ],
    compute: (i) => {
      const c = (numF(i.sale) * numF(i.rate)) / 100;
      return { commission: c, net: numF(i.sale) - c };
    },
  },

  // ─── Margin / Markup ────────────────────────────────────────────────────
  {
    slug: "margin-markup",
    inputs: [
      { id: "cost", label: "Cost", kind: "currency", default: 100 },
      { id: "sell", label: "Selling price", kind: "currency", default: 150 },
    ],
    outputs: [
      { id: "profit", label: "Profit", format: "currency-inr" },
      { id: "marginPct", label: "Margin %", format: "percent", tone: "primary", big: true },
      { id: "markupPct", label: "Markup %", format: "percent", tone: "secondary" },
    ],
    compute: (i) => {
      const profit = numF(i.sell) - numF(i.cost);
      return {
        profit,
        marginPct: numF(i.sell) === 0 ? 0 : (profit / numF(i.sell)) * 100,
        markupPct: numF(i.cost) === 0 ? 0 : (profit / numF(i.cost)) * 100,
      };
    },
  },

  // ─── Depreciation (SL, DDB, SYD) ────────────────────────────────────────
  {
    slug: "depreciation",
    inputs: [
      { id: "cost", label: "Asset cost", kind: "currency", default: 1000000 },
      { id: "salvage", label: "Salvage value", kind: "currency", default: 100000 },
      { id: "life", label: "Useful life (years)", kind: "number", default: 5 },
      {
        id: "method",
        label: "Method",
        kind: "select",
        options: [
          { value: "sl", label: "Straight-line" },
          { value: "ddb", label: "Double-declining balance" },
          { value: "syd", label: "Sum-of-years-digits" },
        ],
        default: "sl",
      },
    ],
    outputs: [
      {
        id: "yearOne",
        label: "Year 1 depreciation",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "annualSL", label: "Straight-line annual", format: "currency-inr" },
    ],
    compute: (i) => {
      const cost = numF(i.cost),
        sal = numF(i.salvage),
        life = numF(i.life);
      const sl = (cost - sal) / Math.max(1, life);
      let y1 = sl;
      if (i.method === "ddb") y1 = (2 / Math.max(1, life)) * cost;
      else if (i.method === "syd") y1 = ((cost - sal) * life) / ((life * (life + 1)) / 2);
      return { yearOne: y1, annualSL: sl };
    },
  },

  // ─── Budget ─────────────────────────────────────────────────────────────
  {
    slug: "budget",
    inputs: [
      { id: "income", label: "Monthly income", kind: "currency", default: 80000 },
      { id: "rent", label: "Rent / Housing", kind: "currency", default: 20000 },
      { id: "food", label: "Food & groceries", kind: "currency", default: 12000 },
      { id: "transport", label: "Transport", kind: "currency", default: 5000 },
      { id: "utilities", label: "Utilities", kind: "currency", default: 3000 },
      { id: "other", label: "Other", kind: "currency", default: 10000 },
    ],
    outputs: [
      { id: "spent", label: "Total spent", format: "currency-inr" },
      { id: "savings", label: "Savings", format: "currency-inr", tone: "primary", big: true },
      { id: "savingsRate", label: "Savings rate", format: "percent", tone: "success" },
    ],
    compute: (i) => {
      const spent =
        numF(i.rent) + numF(i.food) + numF(i.transport) + numF(i.utilities) + numF(i.other);
      const savings = numF(i.income) - spent;
      return {
        spent,
        savings,
        savingsRate: numF(i.income) > 0 ? (savings / numF(i.income)) * 100 : 0,
      };
    },
  },

  // ─── Pension ────────────────────────────────────────────────────────────
  {
    slug: "pension",
    inputs: [
      { id: "monthly", label: "Monthly contribution", kind: "currency", default: 5000 },
      { id: "rate", label: "Annual return", kind: "percent", default: 8 },
      { id: "years", label: "Years to retirement", kind: "number", default: 30 },
      { id: "payoutYears", label: "Payout years", kind: "number", default: 20 },
    ],
    outputs: [
      { id: "corpus", label: "Corpus", format: "currency-inr", tone: "primary", big: true },
      { id: "payout", label: "Monthly payout", format: "currency-inr", tone: "success" },
    ],
    compute: (i) => {
      const r = numF(i.rate) / 12 / 100;
      const n = numF(i.years) * 12;
      const corpus =
        r === 0
          ? numF(i.monthly) * n
          : ((numF(i.monthly) * (Math.pow(1 + r, n) - 1)) / r) * (1 + r);
      const pn = numF(i.payoutYears) * 12;
      const payout = r === 0 ? corpus / pn : (corpus * r) / (1 - Math.pow(1 + r, -pn));
      return { corpus, payout };
    },
  },

  // ─── Old-Age / Social Security (simplified) ─────────────────────────────
  {
    slug: "social-security",
    inputs: [
      { id: "avgSalary", label: "Average yearly salary", kind: "currency", default: 600000 },
      { id: "yearsWorked", label: "Years worked", kind: "number", default: 30 },
    ],
    outputs: [
      {
        id: "monthly",
        label: "Estimated monthly benefit",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      // Rough: 1.5% × salary × years / 12
      return { monthly: (numF(i.avgSalary) * 0.015 * numF(i.yearsWorked)) / 12 };
    },
  },

  // ─── Equipment / Generic Lease ──────────────────────────────────────────
  {
    slug: "equipment-lease",
    inputs: [
      { id: "cost", label: "Equipment cost", kind: "currency", default: 1000000 },
      { id: "residual", label: "Residual value", kind: "currency", default: 200000 },
      { id: "months", label: "Term (months)", kind: "number", default: 48 },
      { id: "moneyFactor", label: "Money factor", kind: "number", default: 0.003, step: 0.0001 },
    ],
    outputs: [
      {
        id: "payment",
        label: "Monthly payment",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const dep = (numF(i.cost) - numF(i.residual)) / numF(i.months);
      const fin = (numF(i.cost) + numF(i.residual)) * numF(i.moneyFactor);
      return { payment: dep + fin };
    },
  },

  // ─── Business Loan EMI ──────────────────────────────────────────────────
  {
    slug: "business-loan",
    inputs: [
      { id: "loan", label: "Loan amount", kind: "currency", default: 2000000 },
      { id: "rate", label: "Rate", kind: "percent", default: 11 },
      { id: "years", label: "Tenure (years)", kind: "number", default: 5 },
    ],
    outputs: [
      { id: "emi", label: "Monthly EMI", format: "currency-inr", tone: "primary", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
    ],
    compute: (i) => {
      const r = calculateEMI({
        principal: numF(i.loan),
        annualRatePct: numF(i.rate),
        years: numF(i.years),
      });
      return { emi: r.emi, totalInterest: r.totalInterest };
    },
  },

  // ─── Personal Loan EMI ──────────────────────────────────────────────────
  {
    slug: "personal-loan",
    inputs: [
      { id: "loan", label: "Loan amount", kind: "currency", default: 500000 },
      { id: "rate", label: "Rate", kind: "percent", default: 14 },
      { id: "years", label: "Tenure (years)", kind: "number", default: 3 },
    ],
    outputs: [
      { id: "emi", label: "Monthly EMI", format: "currency-inr", tone: "primary", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
    ],
    compute: (i) => {
      const r = calculateEMI({
        principal: numF(i.loan),
        annualRatePct: numF(i.rate),
        years: numF(i.years),
      });
      return { emi: r.emi, totalInterest: r.totalInterest };
    },
  },

  // ─── Bike / Boat Loan ───────────────────────────────────────────────────
  {
    slug: "bike-loan",
    inputs: [
      { id: "loan", label: "Loan amount", kind: "currency", default: 150000 },
      { id: "rate", label: "Rate", kind: "percent", default: 10.5 },
      { id: "years", label: "Tenure (years)", kind: "number", default: 3 },
    ],
    outputs: [
      { id: "emi", label: "Monthly EMI", format: "currency-inr", tone: "primary", big: true },
      { id: "totalInterest", label: "Total interest", format: "currency-inr", tone: "error" },
    ],
    compute: (i) => {
      const r = calculateEMI({
        principal: numF(i.loan),
        annualRatePct: numF(i.rate),
        years: numF(i.years),
      });
      return { emi: r.emi, totalInterest: r.totalInterest };
    },
  },

  // ─── Savings Goal ───────────────────────────────────────────────────────
  {
    slug: "savings-goal",
    inputs: [
      { id: "target", label: "Target amount", kind: "currency", default: 1000000 },
      { id: "current", label: "Current savings", kind: "currency", default: 100000 },
      { id: "rate", label: "Annual return", kind: "percent", default: 8 },
      { id: "years", label: "Time horizon (years)", kind: "number", default: 5 },
    ],
    outputs: [
      {
        id: "monthly",
        label: "Monthly savings needed",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
      { id: "shortfall", label: "Shortfall from current", format: "currency-inr" },
    ],
    compute: (i) => {
      const r = numF(i.rate) / 12 / 100;
      const n = numF(i.years) * 12;
      const future = numF(i.current) * Math.pow(1 + r, n);
      const need = numF(i.target) - future;
      const monthly = need <= 0 ? 0 : r === 0 ? need / n : (need * r) / (Math.pow(1 + r, n) - 1);
      return { monthly: Math.max(0, monthly), shortfall: Math.max(0, need) };
    },
  },

  // ─── Interest Rate Solver ───────────────────────────────────────────────
  {
    slug: "interest-rate-solver",
    inputs: [
      { id: "loan", label: "Loan amount", kind: "currency", default: 1000000 },
      { id: "emi", label: "EMI", kind: "currency", default: 9500 },
      { id: "years", label: "Tenure (years)", kind: "number", default: 15 },
    ],
    outputs: [{ id: "rate", label: "Annual rate", format: "percent", tone: "primary", big: true }],
    compute: (i) => {
      const P = numF(i.loan),
        E = numF(i.emi),
        n = numF(i.years) * 12;
      let lo = 0,
        hi = 1;
      for (let it = 0; it < 80; it++) {
        const mid = (lo + hi) / 2;
        const pv = mid === 0 ? E * n : (E * (1 - Math.pow(1 + mid, -n))) / mid;
        if (pv > P) lo = mid;
        else hi = mid;
      }
      return { rate: ((lo + hi) / 2) * 12 * 100 };
    },
  },

  // ─── Tenure Solver ──────────────────────────────────────────────────────
  {
    slug: "tenure-solver",
    inputs: [
      { id: "loan", label: "Loan amount", kind: "currency", default: 1000000 },
      { id: "rate", label: "Rate", kind: "percent", default: 9 },
      { id: "emi", label: "EMI", kind: "currency", default: 12000 },
    ],
    outputs: [
      { id: "years", label: "Tenure", format: "number", suffix: " yr", tone: "primary", big: true },
      { id: "months", label: "Months", format: "integer" },
    ],
    compute: (i) => {
      const r = numF(i.rate) / 12 / 100;
      const n = Math.log(numF(i.emi) / (numF(i.emi) - r * numF(i.loan))) / Math.log(1 + r);
      const months = Math.ceil(n);
      return { years: months / 12, months };
    },
  },
];
