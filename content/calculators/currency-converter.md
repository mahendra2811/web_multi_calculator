## What is a currency converter?

A **currency converter** tells you how much of currency B you get for a given amount of currency A, at a given exchange rate. Every cross-border purchase, remittance, travel budget, salary negotiation, or international invoice begins with this question.

What people often don't realize: the rate you see online is not the rate you'll actually transact at. There's a 0.5–3% gap, and that gap is how banks and remitters make money.

## How is currency conversion calculated?

The math is trivial:

```
target_amount = source_amount × (1 / source_rate) × target_rate
```

If both rates are quoted against the same base (USD = 1), this simplifies to:

```
target_amount = source_amount × (target_rate / source_rate)
```

Example: converting 1,000 USD to INR at a USD/INR rate of 83.20:

```
1,000 USD × 83.20 = ₹83,200
```

## Worked example

You're remitting **₹5,00,000 from India to the US** for university tuition. USD/INR mid-market = 83.20.

| Provider                 | Effective rate | USD received              |
| ------------------------ | -------------- | ------------------------- |
| Mid-market (theoretical) | 83.20          | $6,010.10                 |
| Wise / Revolut           | 83.10          | $6,017.33                 |
| Major Indian bank wire   | 82.40          | $6,068.45 (₹ paid more)   |
| Forex card from agent    | 82.00          | $6,097.56 (₹ paid more)   |
| Airport money changer    | 80.00          | $6,250 (₹ paid much more) |

The "real" rate is roughly the mid-market — published by Reuters, Bloomberg, XE, Google. The rate you receive is always worse by 0.5–3% **spread**, plus possibly a fixed fee.

For ₹5 L: the worst provider costs **~₹15,000 more** than the best. Always compare total INR cost (rate + fees + GST on fees), not just the headline rate.

## Components and inputs explained

### Amount

The number you're starting with. Currency converters can run in either direction — type the amount in your source currency, get the target.

### Source / target currencies

Pick from the supported list. CalcMaster's list focuses on widely-traded currencies; rare currencies (Argentine Peso, Iranian Rial, North Korean Won) aren't reliably quoted by the public API and aren't supported.

### Live vs reference rates

**Live rates** update every minute and are what you'll actually transact at (with provider spread). **Reference rates** are end-of-day from central banks. CalcMaster uses live rates via a public API; for transaction commitment, always verify on your provider's portal.

## Why your bank's rate is worse than the calculator

Banks and remitters don't make money on the conversion itself — they make money on the **spread** (the difference between buy and sell rates):

```
Bid (bank buys your INR at)         Ask (bank sells you USD at)
   82.50                                83.90
                  Mid-market: 83.20
```

A 1.7% spread on a ₹10 L remittance is ₹17,000 the bank just earned. Same for the other direction. Multiply across millions of customers and you understand how forex desks fund themselves.

Newer fintechs (Wise, Revolut, Niyo, Western Union) compete by narrowing the spread to 0.3–0.7% — a real cost reduction for senders.

## Common cross-border scenarios

| Scenario                       | What rate matters                                              | Where to check                              |
| ------------------------------ | -------------------------------------------------------------- | ------------------------------------------- |
| **Travel**                     | Spot rate at moment of purchase                                | Forex card or international debit card      |
| **Online shopping**            | Spot rate at moment of purchase (with 0–3.5% markup)           | Your card's FX markup; some cards have zero |
| **University fees**            | Wire rate at remittance                                        | Bank's wire desk quote                      |
| **Remittance from / to India** | LRS limit applies (US$2.5L/year outward); TCS at 20% above ₹7L | Bank or NRE/NRO account                     |
| **Salary in foreign currency** | Average rate over the month                                    | RBI reference rate for ITR                  |
| **F&O / Forex trading**        | Real-time bid/ask                                              | Trading platform                            |

## Tax implications (India)

- **Outward remittance under LRS**: 5% TCS up to ₹7 L per year (medical/education), 20% TCS for other purposes above ₹7 L. TCS is refunded as income tax credit.
- **Foreign income**: taxable at slab rate in India for residents; DTAA may apply if double-taxed.
- **Forex trading gains**: STCG at slab rate or business income.
- **Foreign salary**: reported in ITR Schedule FA; tax credit available under DTAA.

A CA is recommended for outward remittances > ₹7 L or recurring foreign income.

## Considerations

- **Spot rate ≠ forward rate.** The future is uncertain; banks quote different rates for delivery in 1/3/6 months.
- **Lock-in for big transfers.** For ₹5 L+ transfers, ask your bank for a "forward booking" — guarantees the rate.
- **Currency cards beat carrying cash.** Cards offer 1.5–3% better effective rate than airport changers, plus skim-resistance.
- **Compare total cost, not just rate.** Wise's small fee + tight spread often beats "zero fee" bank wires with wide spreads.
- **Volatility plans.** For 6-month-out tuition, consider 50% locked-in / 50% spot.

## Limitations

- Rates are sourced from a public API and may lag the actual market by 1–5 minutes during high volatility.
- Doesn't include provider fees or your card's FX markup — subtract 0.3–3% from the displayed rate for your real take.
- Doesn't support cryptocurrencies (BTC, ETH, USDT) — for crypto conversion, use a dedicated crypto exchange.
- Doesn't support gold or commodities priced in currency (XAU, oil) — use the [Gold Investment](/calculator/sgb) calculator.
- Historical rates aren't provided here. Use Yahoo Finance / TradingView / RBI archive for back-history.

## Related calculators

- **[Crypto Profit](/calculator/crypto-profit)** — for crypto trade P&L
- **[Forex Position Size](/calculator/forex-position)** — for forex traders
- **[Pip Value](/calculator/pip-value)** — for forex micro-trading
- **[Sovereign Gold Bond (SGB)](/calculator/sgb)** — Indian gold investment
- **[Inflation](/calculator/inflation)** — to compare purchasing power across years and currencies
- **[ROI](/calculator/roi)** — for cross-border investment returns

---

**Final note.** The currency converter shows you the _theoretical_ rate; your bank, fintech, or card shows you the _real_ one. **Before any meaningful cross-border move, get a written quote from at least three providers and compare total INR paid — not the headline rate.** A few minutes of comparison saves more on a ₹5 L remittance than years of careful budgeting.
