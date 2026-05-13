## What is a stock profit calculator?

A **stock profit calculator** computes the **profit or loss** on an equity trade, factoring in **purchase price, sale price, quantity, brokerage, taxes, and other charges**. For Indian investors, it also computes **STCG / LTCG tax** based on holding period.

Exchange dashboards typically show **gross profit** ignoring brokerage and taxes. A real take-home P&L can be 5-15% lower than the headline number, especially for small trades.

## How is profit calculated?

```
gross profit = (sell price − buy price) × quantity
total brokerage = buy brokerage + sell brokerage
total charges = STT + exchange + GST + SEBI + stamp duty
net profit (pre-tax) = gross profit − total brokerage − total charges
tax = STCG (15% × net profit) OR LTCG (10% × profit above ₹1L)
net profit (after tax) = net profit − tax
ROI % = (net profit / total invested) × 100
```

## Worked example

You buy **100 shares of Infosys at ₹1,500** (₹1,50,000) on 1 March 2025. Sell **100 shares at ₹1,800** on 1 May 2025 (held < 12 months → STCG).

### Indian charges (Zerodha-style approximation, equity delivery):

| Charge                                    | Buy    | Sell       |
| ----------------------------------------- | ------ | ---------- |
| Brokerage (₹20 or 0.03%, whichever lower) | ₹20    | ₹20        |
| STT (Securities Transaction Tax 0.1%)     | ₹150   | ₹180       |
| Exchange transaction (0.00345%)           | ₹5.2   | ₹6.2       |
| SEBI (₹10/cr)                             | ₹0.15  | ₹0.18      |
| Stamp duty (0.015% on buy)                | ₹22.5  | –          |
| GST (18% on brokerage + exchange)         | ₹4.5   | ₹4.7       |
| Total side                                | ₹202.4 | ₹211.1     |
| **Both sides total**                      |        | **₹413.5** |

```
Gross profit = (1,800 − 1,500) × 100 = ₹30,000
Net of charges = 30,000 − 413.5 = ₹29,586.5

Holding period: 2 months → STCG applies (15% on net profit)
STCG tax = 29,586.5 × 15% = ₹4,437.98
After-tax profit = 29,586.5 − 4,438 = ₹25,148.5
```

**Headline profit: ₹30,000. Actual take-home: ₹25,149. Difference: ₹4,851 (16% leak).**

ROI: 25,149 / 1,50,000 = **16.77% in 2 months**.

## STCG vs LTCG (Indian equity)

| Tax                            | Applies when        | Rate                                   | Notes                          |
| ------------------------------ | ------------------- | -------------------------------------- | ------------------------------ |
| STCG (Short Term Capital Gain) | Holding < 12 months | **20%** (from Jul 2024)                | Was 15% pre-Jul 2024           |
| LTCG (Long Term Capital Gain)  | Holding ≥ 12 months | **12.5%** above ₹1.25L (from Jul 2024) | Was 10% above ₹1L pre-Jul 2024 |

Critical change as of **Budget 2024 (effective 23 July 2024)**:

- STCG: 15% → 20%
- LTCG: 10% → 12.5%
- LTCG exemption: ₹1L → ₹1.25L per year

## Long-term hold worked example

You bought **500 shares of HDFC Bank at ₹1,200** in January 2020. Sell at **₹1,800** in January 2026 (held 6 years → LTCG).

```
Gross profit = (1,800 − 1,200) × 500 = ₹3,00,000
Charges (estimated) = ₹2,000
Net profit = ₹2,98,000

LTCG: exempt up to ₹1,25,000
Taxable LTCG = 2,98,000 − 1,25,000 = ₹1,73,000
Tax (12.5%) = ₹21,625
After-tax profit = 2,98,000 − 21,625 = ₹2,76,375

ROI (6 years): 2,76,375 / 6,00,000 = 46% total
Annualized: ((876,375/600,000)^(1/6) − 1) × 100 ≈ 6.5%/year
```

After 6 years of waiting, holding through Covid, you net **6.5% annualized**. Equities work, but **average return matters** — a single hot stock isn't representative of portfolio performance.

## Indian equity charges explained

| Charge               | What                             | When                  | Approximate                                    |
| -------------------- | -------------------------------- | --------------------- | ---------------------------------------------- |
| Brokerage            | Broker's commission              | Buy + sell            | ₹20 flat (Zerodha) or 0.03-0.5% (full-service) |
| STT                  | Government tax                   | Buy + sell (delivery) | 0.1% per side                                  |
| STT (intraday)       | Sell side only                   | 0.025% on sell        |
| Exchange transaction | Exchange fee                     | Buy + sell            | 0.00345% NSE                                   |
| SEBI                 | Regulator fee                    | Buy + sell            | ₹10/crore                                      |
| Stamp duty           | State tax                        | Buy only              | 0.015% (equity delivery)                       |
| GST                  | On (brokerage + exchange + SEBI) | 18%                   |
| DP charges           | Demat charge per sell            | Sell only             | ₹15-30 per trade                               |

Full breakdown is on Zerodha's brokerage calculator — these add up to ~0.3-0.5% per round-trip for most retail trades.

## Worked example: small trades hurt

You buy **₹5,000 worth** of a small-cap stock. Sell at 5% gain (₹5,250 sell).

```
Gross profit = ₹250
Charges (round-trip): roughly ₹25 brokerage + ₹50 other = ₹75
Net pre-tax profit = ₹175
STCG tax (20%) = ₹35
Net after-tax = ₹140
ROI: 2.8% — not 5%
```

**Small trades have disproportionate fee impact**. Better strategy: trade in larger lots, or use mutual funds for small amounts.

## Other markets

### US stocks (via Indian brokers)

- Brokerage: ~$0-5/trade (Interactive Brokers, Vested)
- Foreign tax: ~25% on dividends (treaty rate, refundable via DTAA)
- Indian tax: same STCG/LTCG rules — Foreign equities held > 24 months = LTCG
- FX cost: 0.5-1% spread on USD conversion both ways

### Intraday equity (no holding overnight)

- STT lower (0.025% on sell only)
- Always STCG (not eligible for LTCG)
- Brokerage lower (~₹20 fixed)
- DP charges nil
- Higher margins / leverage available

### F&O (futures and options)

- STT: 0.02% on options (sell only)
- Tax: treated as **business income**, not capital gains — applies your slab rate
- More complex tax treatment, often requires CA help

## Components and inputs

### Buy price + buy quantity

Total invested = price × quantity.

### Sell price + sell quantity

Should usually match buy quantity (partial sell handled by entering only the sold portion).

### Holding period

The calculator infers STCG vs LTCG. Or set explicitly.

### Brokerage (optional)

Per-trade brokerage. Defaults to ₹20 flat (discount broker estimate).

### Other charges (optional)

Lumped or separately. Default: 0.05% of trade value as a rough total of STT + exchange + SEBI + stamp + GST.

### Tax preference

- Auto (detect STCG vs LTCG by holding period)
- Force STCG
- Force LTCG
- Skip tax (compute pre-tax only)

## Considerations

- **Tax timing matters.** If you crossed the ₹1,25,000 LTCG exemption already this year, additional LTCG is taxed from rupee one — plan large sells across financial years.
- **Buyback / dividend / bonus issues** complicate cost basis. The calculator handles simple buy-sell only.
- **Selling losing stocks** in the same FY as winners helps offset (STCG losses against STCG/LTCG gains; LTCG losses against LTCG only). Plan loss harvesting before March 31.
- **Long-term capital losses** carry forward 8 years.

## Limitations

- Doesn't handle bonus shares, rights, splits, mergers (need cost-basis adjustment).
- Doesn't handle ESOPs / RSUs (different tax treatment — perquisite + capital gains).
- Doesn't model F&O business-income tax.
- Doesn't optimize trade timing for tax (calculator is descriptive, not prescriptive).

## Related calculators

- **[Stock Average](/calculator/stock-average)** — DCA / repeated buys
- **[CAGR](/calculator/cagr)** — annualized return
- **[ROI](/calculator/roi)** — generic return %
- **[Income Tax](/calculator/income-tax)** — slab math
- **[SIP](/calculator/sip)** — recurring mutual-fund investment
- **[Mutual Fund Returns](/calculator/mutual-fund-returns)** — long-term wealth building

---

**Final note.** Headline profit ≠ take-home profit. **Always model brokerage + STT + tax** before celebrating a winning trade. For Indian equity, **LTCG is dramatically more efficient** than STCG — favor holding ≥ 12 months when possible, and **harvest the ₹1.25 lakh LTCG exemption every year**. The single biggest lever for long-term equity wealth: **lower turnover, longer holds, lower taxes**.
