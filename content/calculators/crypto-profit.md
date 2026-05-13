## What is a crypto profit calculator?

A **crypto profit calculator** computes the **profit or loss** on a cryptocurrency trade, factoring in **purchase price, sale price, quantity, fees**, and (optionally) **tax**. It also shows **ROI %**, **break-even price**, and (for India) **the post-tax take-home** after 30% capital gains plus 1% TDS.

This is a far more honest profit number than what most exchange UIs show — exchange dashboards typically hide fees and ignore Indian tax entirely.

## How is profit calculated?

```
gross profit = (sell price − buy price) × quantity
net of fees = gross profit − buy fees − sell fees
ROI % = (net profit / total cost) × 100
break-even sell price = (buy price × qty + buy fees + projected sell fees) / qty
```

For **Indian taxpayers** (VDA — Virtual Digital Asset tax regime):

```
Tax = 30% on net profit (no expense deduction allowed)
TDS = 1% on sell amount (deducted at source)
After-tax profit = net profit × 0.70
```

## Worked example

You buy **0.5 BTC at ₹50,00,000 each** (₹25 lakh total). Pay 0.5% buy fee.
You sell **0.5 BTC at ₹60,00,000 each** (₹30 lakh). Pay 0.5% sell fee.

```
Buy cost = 0.5 × 50,00,000 = ₹25,00,000
Buy fee = ₹25,00,000 × 0.5% = ₹12,500
Total cost = ₹25,12,500

Sell amount = 0.5 × 60,00,000 = ₹30,00,000
Sell fee = ₹30,00,000 × 0.5% = ₹15,000
Net sell = ₹30,00,000 − ₹15,000 = ₹29,85,000

Gross profit (after fees) = 29,85,000 − 25,12,500 = ₹4,72,500
ROI = 4,72,500 / 25,12,500 = 18.8%

India tax (30% on profit) = 4,72,500 × 30% = ₹1,41,750
TDS (1% on sell, refundable against tax) = ₹30,000
After-tax profit = 4,72,500 − 1,41,750 = ₹3,30,750
```

Effective ROI **post-tax**: 3,30,750 / 25,12,500 = **13.2%**, not the headline 20%.

## Indian crypto tax — the key facts

As of **Budget 2022 (effective 1 April 2022)** and unchanged in subsequent budgets:

1. **30% flat tax** on profit from any Virtual Digital Asset (VDA) — crypto, NFTs.
2. **No loss offset** — crypto losses cannot offset crypto gains in another trade, nor offset salary, business income, or capital gains from other asset classes.
3. **No expense deduction** — you cannot deduct gas fees, hardware wallet, internet bill, etc. Only the **cost of acquisition** (purchase price + transaction fees on Indian exchanges).
4. **1% TDS** on the sell-side from 1 July 2022. Deducted at exchange. Credited back at ITR.
5. **No long-term / short-term distinction** — flat 30% whether you held 1 day or 5 years.
6. **Holding crypto is NOT taxable** — only realised gains (sales, swaps, conversions, P2P transfers in some interpretations).
7. **Swap crypto-to-crypto IS taxable** — treated as sale of first crypto and purchase of second.

## Worked example: tax-disaster scenario

You make 10 trades during FY 2025-26:

- 7 profitable trades: total profit ₹5,00,000
- 3 loss-making trades: total loss ₹2,00,000

**Logical (Western) tax**: net profit ₹3,00,000 → tax ₹90,000.

**Indian tax (no offset)**:

```
Tax on profits = 5,00,000 × 30% = ₹1,50,000
Losses = wasted — cannot offset
Net loss after tax = (3,00,000 − 1,50,000) = ₹1,50,000 retained
```

Two traders with the same net P&L pay vastly different tax based on whether trades happened in different financial years or not. This is the **biggest gotcha** in Indian crypto tax.

## Worked example: long-term hold

You buy **1 ETH at ₹2,00,000** in April 2022. Sell at **₹4,50,000** in March 2026.

```
Profit = 4,50,000 − 2,00,000 = ₹2,50,000
Tax (30%) = ₹75,000
TDS (1% on sell) = ₹4,500 (collected, refunded against tax owed)
Net after tax = ₹1,75,000
ROI: 87.5% pre-tax, 61% post-tax
```

A 4-year hold yielding 87.5% sounds great until you factor 30% tax. Equity mutual funds with LTCG (10% above ₹1L) on the same gain would owe only ₹15,000 tax — netting ₹2,35,000.

## Exchange fees compared

| Exchange        | Spot maker                  | Spot taker | Notes                                                   |
| --------------- | --------------------------- | ---------- | ------------------------------------------------------- |
| CoinDCX (India) | 0.0% (post-Apr 2025)        | 0.4%       | Indian, KYC required                                    |
| WazirX (India)  | 0.1-0.2%                    | 0.1-0.2%   | Indian, currently restricted                            |
| Binance (intl)  | 0.1% (BNB discount: 0.075%) | 0.1%       | Used via INR P2P; not KYC-eligible for Indians directly |
| Coinbase (intl) | 0.4-0.6%                    | 0.6%       | India access via international card                     |

**Be wary of "zero fee"** offerings — they often build the fee into a wider bid-ask spread.

## Hidden costs traders forget

| Cost               | Typical          | Notes                                           |
| ------------------ | ---------------- | ----------------------------------------------- |
| Exchange fee       | 0.1-0.5%         | Per trade (buy AND sell)                        |
| Slippage           | 0.1-1%           | Worse for illiquid coins or large orders        |
| Withdrawal fee     | $5-50 per crypto | Fixed, ouch for small withdrawals               |
| Network gas fees   | Variable         | Ethereum gas can hit ₹1,000+/tx in busy periods |
| Bid-ask spread     | 0.01-2%          | Wider on alt-coins                              |
| TDS reconciliation | Time cost        | Match exchange TDS against Form 26AS            |

## Components and inputs

### Buy price + buy fee

What you paid per coin, plus any transaction fees.

### Sell price + sell fee

What you received per coin, minus exchange fees.

### Quantity

Amount of crypto traded (decimals allowed; BTC trades are often 0.001-0.1).

### Optional — India tax toggle

Adds 30% tax computation and 1% TDS estimate. Off by default for international users.

### Output

- Gross / net profit (₹)
- ROI %
- Break-even sell price
- Tax owed (if India toggle on)
- Take-home after tax
- Annualized return _(if holding period > 90 days)_

## Common applications

### Pre-trade decision

"Is selling now profitable?" Plug in current price; calculator shows tax-adjusted profit. Helps avoid emotional decisions.

### Tax filing prep

Total annual profit from all trades → enter in ITR-2 Schedule VDA. Calculator's per-trade profit feeds the year-end total.

### DCA exit planning

You DCA'd into ETH at average ₹1,50,000 buy price. Where does it become tax-efficient to sell? At ₹2,15,000 you break even on cost; at ₹3,00,000 you net (3,00,000 − 1,50,000) × 0.7 = ₹1,05,000/coin after 30% tax.

### Loss harvesting (NOT applicable in India)

In countries with loss offset (US, UK, Australia), crypto losses can offset crypto gains. In India this is NOT allowed — so this strategy doesn't work here.

## Considerations

- **Track every trade.** Indian tax is calculated **per trade**, not per coin or per year. CoinDCX and other Indian exchanges provide annual reports — download and reconcile.
- **TDS reconciliation matters.** TDS deducted by exchanges shows up in Form 26AS. Mismatch is common in early years of the rule.
- **Crypto-to-crypto swaps count.** Swapping BTC for ETH is a taxable event — calculate gain on BTC, treat ETH purchase at swap-time market value.
- **Airdrops are taxable income.** Receive an airdrop worth ₹50,000? Pay 30% tax in the year received. Cost basis for future sale = receipt value.

## Limitations

- Doesn't handle **margin / leveraged trades** explicitly — treats them as spot.
- Doesn't compute **FIFO/LIFO/specific lot** cost basis — assumes the buy you specify.
- Doesn't account for **GST** on exchange fees (typically 18% built into fees in India).
- Doesn't track **Foreign Asset disclosure** (FA schedule) — required if you hold crypto on foreign exchanges.

## Related calculators

- **[Stock Profit](/calculator/stock-profit)** — equity trade P&L (with LTCG/STCG)
- **[Stock Average](/calculator/stock-average)** — DCA average price
- **[SIP](/calculator/sip)** — recurring investments
- **[Income Tax](/calculator/income-tax)** — total tax liability
- **[ROI](/calculator/roi)** — generic return %

---

**Final note.** Indian crypto investors face the **harshest tax regime in any major economy** — 30% flat, no losses offset, 1% TDS. Account for this **before** every trade, not after. The calculator's "post-tax profit" is the **real money you keep** — that's the number that matters. If you're a long-term holder, equity mutual funds (LTCG 10% above ₹1L) remain dramatically more tax-efficient than crypto in India.
