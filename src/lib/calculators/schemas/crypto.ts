import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const CRYPTO_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "crypto-tax-india",
    inputs: [
      { id: "buy", label: "Buy value", kind: "currency", default: 100000 },
      { id: "sell", label: "Sell value", kind: "currency", default: 130000 },
    ],
    outputs: [
      { id: "profit", label: "Profit", format: "currency-inr" },
      { id: "tax", label: "30% tax", format: "currency-inr", tone: "error", big: true },
      { id: "tds", label: "1% TDS", format: "currency-inr" },
      { id: "netAfter", label: "Net after tax", format: "currency-inr", tone: "primary" },
    ],
    compute: (i) => {
      const profit = numF(i.sell) - numF(i.buy);
      const tax = Math.max(0, profit) * 0.3;
      const tds = numF(i.sell) * 0.01;
      return { profit, tax, tds, netAfter: profit - tax };
    },
  },
  {
    slug: "mining-profit",
    inputs: [
      { id: "hashrate", label: "Hash rate (TH/s)", kind: "number", default: 100 },
      { id: "powerW", label: "Power consumption (W)", kind: "number", default: 3000 },
      { id: "rate", label: "Electricity rate ($/kWh)", kind: "number", default: 0.1, step: 0.01 },
      {
        id: "rewardPerTh",
        label: "Reward per TH/day ($)",
        kind: "number",
        default: 0.07,
        step: 0.01,
      },
    ],
    outputs: [
      { id: "revenue", label: "Revenue/day", format: "currency", tone: "success" },
      { id: "cost", label: "Electricity cost/day", format: "currency", tone: "error" },
      { id: "profit", label: "Profit/day", format: "currency", tone: "primary", big: true },
      { id: "profitMonth", label: "Profit/month", format: "currency" },
    ],
    compute: (i) => {
      const rev = numF(i.hashrate) * numF(i.rewardPerTh);
      const cost = (numF(i.powerW) / 1000) * 24 * numF(i.rate);
      return { revenue: rev, cost, profit: rev - cost, profitMonth: (rev - cost) * 30 };
    },
  },
  {
    slug: "impermanent-loss",
    inputs: [
      { id: "priceRatio", label: "Price ratio (new/old)", kind: "number", default: 2, step: 0.1 },
    ],
    outputs: [
      {
        id: "il",
        label: "Impermanent loss",
        format: "percent",
        tone: "error",
        big: true,
        fractionDigits: 3,
      },
      { id: "verdict", label: "Hold vs LP", format: "text" },
    ],
    compute: (i) => {
      const r = numF(i.priceRatio);
      const il = ((2 * Math.sqrt(r)) / (1 + r) - 1) * 100;
      return { il, verdict: il < -1 ? "Holding wins" : "LP fees needed to offset" };
    },
  },
  {
    slug: "apy-apr",
    inputs: [
      { id: "value", label: "Rate", kind: "percent", default: 10 },
      { id: "compounds", label: "Compounds per year", kind: "number", default: 12 },
      {
        id: "direction",
        label: "Convert",
        kind: "select",
        default: "apr-to-apy",
        options: [
          { value: "apr-to-apy", label: "APR → APY" },
          { value: "apy-to-apr", label: "APY → APR" },
        ],
      },
    ],
    outputs: [
      {
        id: "result",
        label: "Result",
        format: "percent",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => {
      const r = numF(i.value) / 100;
      const n = numF(i.compounds);
      if (i.direction === "apr-to-apy") return { result: (Math.pow(1 + r / n, n) - 1) * 100 };
      return { result: n * (Math.pow(1 + r, 1 / n) - 1) * 100 };
    },
  },
  {
    slug: "liquidation-price",
    inputs: [
      { id: "entry", label: "Entry price", kind: "number", default: 50000 },
      { id: "leverage", label: "Leverage (x)", kind: "number", default: 10 },
      {
        id: "side",
        label: "Side",
        kind: "select",
        default: "long",
        options: [
          { value: "long", label: "Long" },
          { value: "short", label: "Short" },
        ],
      },
      { id: "mmr", label: "Maintenance margin %", kind: "percent", default: 0.5, step: 0.1 },
    ],
    outputs: [
      {
        id: "price",
        label: "Liquidation price",
        format: "number",
        tone: "error",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const entry = numF(i.entry),
        lev = numF(i.leverage),
        mmr = numF(i.mmr) / 100;
      const drop = 1 / lev - mmr;
      return { price: i.side === "long" ? entry * (1 - drop) : entry * (1 + drop) };
    },
  },
  {
    slug: "leverage-margin",
    inputs: [
      { id: "account", label: "Account size", kind: "currency", default: 10000 },
      { id: "position", label: "Position value", kind: "currency", default: 50000 },
    ],
    outputs: [
      {
        id: "leverage",
        label: "Effective leverage",
        format: "number",
        suffix: "x",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "margin", label: "Margin required", format: "currency" },
    ],
    compute: (i) => ({
      leverage: numF(i.account) === 0 ? 0 : numF(i.position) / numF(i.account),
      margin: numF(i.position) / Math.max(1, numF(i.position) / Math.max(0.0001, numF(i.account))),
    }),
  },
  {
    slug: "risk-reward",
    inputs: [
      { id: "entry", label: "Entry", kind: "number", default: 100 },
      { id: "stop", label: "Stop loss", kind: "number", default: 95 },
      { id: "target", label: "Target", kind: "number", default: 115 },
    ],
    outputs: [
      { id: "rr", label: "Risk:Reward ratio", format: "text", tone: "primary", big: true },
      { id: "riskPct", label: "Risk %", format: "percent" },
      { id: "rewardPct", label: "Reward %", format: "percent" },
    ],
    compute: (i) => {
      const risk = Math.abs(numF(i.entry) - numF(i.stop));
      const reward = Math.abs(numF(i.target) - numF(i.entry));
      return {
        rr: `1 : ${(reward / Math.max(0.0001, risk)).toFixed(2)}`,
        riskPct: (risk / numF(i.entry)) * 100,
        rewardPct: (reward / numF(i.entry)) * 100,
      };
    },
  },
  {
    slug: "pip-value",
    inputs: [
      { id: "lotSize", label: "Lot size (units)", kind: "number", default: 100000 },
      { id: "pipSize", label: "Pip size", kind: "number", default: 0.0001, step: 0.00001 },
      { id: "exchangeRate", label: "Quote → USD rate", kind: "number", default: 1, step: 0.0001 },
    ],
    outputs: [
      {
        id: "pip",
        label: "Pip value",
        format: "currency",
        tone: "primary",
        big: true,
        fractionDigits: 4,
      },
    ],
    compute: (i) => ({ pip: numF(i.lotSize) * numF(i.pipSize) * numF(i.exchangeRate) }),
  },
  {
    slug: "forex-position",
    inputs: [
      { id: "account", label: "Account size ($)", kind: "number", default: 10000 },
      { id: "riskPct", label: "Risk %", kind: "percent", default: 1 },
      { id: "stopPips", label: "Stop loss (pips)", kind: "number", default: 30 },
      { id: "pipValue", label: "Pip value per lot", kind: "number", default: 10 },
    ],
    outputs: [
      {
        id: "lots",
        label: "Lot size",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 3,
      },
      { id: "risk", label: "Risk amount ($)", format: "currency" },
    ],
    compute: (i) => {
      const risk = (numF(i.account) * numF(i.riskPct)) / 100;
      const lots = risk / (numF(i.stopPips) * numF(i.pipValue));
      return { lots, risk };
    },
  },
  {
    slug: "stock-brokerage-india",
    inputs: [
      { id: "buy", label: "Buy value", kind: "currency", default: 100000 },
      { id: "sell", label: "Sell value", kind: "currency", default: 105000 },
      {
        id: "segment",
        label: "Segment",
        kind: "select",
        default: "delivery",
        options: [
          { value: "delivery", label: "Delivery" },
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
      { id: "netPnl", label: "Net P/L", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => {
      const broker = Math.min(40, (numF(i.buy) + numF(i.sell)) * 0.0003);
      const sttRate =
        i.segment === "delivery" ? 0.001 : i.segment === "intraday" ? 0.00025 : 0.0001;
      const stt = sttRate * numF(i.sell);
      const gst = 0.18 * broker;
      const total = broker + stt + gst + 15.93;
      return {
        brokerage: broker,
        stt,
        gst,
        totalCharges: total,
        netPnl: numF(i.sell) - numF(i.buy) - total,
      };
    },
  },
  {
    slug: "stock-profit",
    inputs: [
      { id: "qty", label: "Quantity", kind: "number", default: 100 },
      { id: "buy", label: "Buy price", kind: "currency", default: 500 },
      { id: "sell", label: "Sell price", kind: "currency", default: 600 },
    ],
    outputs: [
      { id: "profit", label: "Profit", format: "currency-inr", tone: "primary", big: true },
      { id: "pct", label: "Return %", format: "percent", tone: "success" },
    ],
    compute: (i) => ({
      profit: numF(i.qty) * (numF(i.sell) - numF(i.buy)),
      pct: numF(i.buy) === 0 ? 0 : ((numF(i.sell) - numF(i.buy)) / numF(i.buy)) * 100,
    }),
  },
  {
    slug: "stop-loss",
    inputs: [
      { id: "entry", label: "Entry price", kind: "currency", default: 500 },
      { id: "riskPct", label: "Account risk %", kind: "percent", default: 1 },
      { id: "account", label: "Account size", kind: "currency", default: 100000 },
      { id: "qty", label: "Position quantity", kind: "number", default: 100 },
    ],
    outputs: [
      { id: "stop", label: "Stop loss price", format: "currency-inr", tone: "error", big: true },
    ],
    compute: (i) => {
      const risk = (numF(i.account) * numF(i.riskPct)) / 100;
      return { stop: numF(i.entry) - risk / Math.max(1, numF(i.qty)) };
    },
  },
  {
    slug: "take-profit",
    inputs: [
      { id: "entry", label: "Entry price", kind: "currency", default: 500 },
      { id: "stop", label: "Stop loss price", kind: "currency", default: 480 },
      { id: "rr", label: "Risk:Reward ratio", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "target",
        label: "Take profit price",
        format: "currency-inr",
        tone: "success",
        big: true,
      },
    ],
    compute: (i) => {
      const risk = numF(i.entry) - numF(i.stop);
      return { target: numF(i.entry) + risk * numF(i.rr) };
    },
  },
  {
    slug: "eps-book-value",
    inputs: [
      { id: "netProfit", label: "Net profit (₹ cr)", kind: "number", default: 100 },
      { id: "shares", label: "Outstanding shares (cr)", kind: "number", default: 10 },
      { id: "equity", label: "Total equity (₹ cr)", kind: "number", default: 500 },
    ],
    outputs: [
      {
        id: "eps",
        label: "EPS",
        format: "currency-inr",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "bookValue", label: "Book value per share", format: "currency-inr" },
    ],
    compute: (i) => {
      const shares = numF(i.shares);
      return {
        eps: shares === 0 ? 0 : (numF(i.netProfit) * 10000000) / (shares * 10000000),
        bookValue: shares === 0 ? 0 : (numF(i.equity) * 10000000) / (shares * 10000000),
      };
    },
  },
];
