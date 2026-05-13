## What is a stock average calculator?

A **stock average calculator** (also called **cost basis** or **DCA — dollar-cost average — calculator**) computes the **average purchase price** of a stock when you've bought multiple lots at different prices. It also shows your **total holding, total invested, break-even price**, and unrealised P&L given a current price.

This is the most-used tool by active retail investors because most people don't buy in one shot — they accumulate over months or years.

## How is average price calculated?

```
average price = total amount invested / total shares held
             = (q₁×p₁ + q₂×p₂ + ... + qₙ×pₙ) / (q₁ + q₂ + ... + qₙ)
```

This is a **weighted average** — quantity-weighted, not a simple mean.

## Worked example

You buy **Reliance Industries** in 3 tranches:

| Date       | Quantity | Price  | Amount        |
| ---------- | -------- | ------ | ------------- |
| 1 Jan 2025 | 50       | ₹2,800 | ₹1,40,000     |
| 1 Apr 2025 | 30       | ₹2,500 | ₹75,000       |
| 1 Jul 2025 | 40       | ₹2,950 | ₹1,18,000     |
| **Total**  | **120**  |        | **₹3,33,000** |

```
Average price = 3,33,000 / 120 = ₹2,775
Break-even (after charges ~0.3%): ₹2,783
```

Compare to a simple average of the three buy prices: (2,800 + 2,500 + 2,950) / 3 = ₹2,750. The **weighted average is higher because more shares were bought at higher prices**.

If current price is ₹3,200:

```
Current value = 120 × 3,200 = ₹3,84,000
Unrealised gain = 3,84,000 − 3,33,000 = ₹51,000
ROI = 51,000 / 3,33,000 = 15.3%
```

## Why average price matters

### Tells you the break-even

You break even (excluding charges) when price recovers to your average — not to your first buy price.

### Tax cost basis

Sale tax is computed on (sell price − cost basis). For multiple lots:

- **FIFO** (default in India): first lot bought is first sold, with that lot's cost basis
- **Average cost** (mutual funds use this): each unit costs the average
- **Specific identification** (rarely allowed): pick which lot you're selling

This calculator uses **average cost** by default — useful for understanding your overall position. For tax filing, use FIFO order from your broker statements.

### Behavioral check

Active traders often "average down" on a falling stock without realizing they're concentrating their losses. The calculator surfaces the true buying intensity.

## Worked example: averaging down

You bought 100 shares at ₹500 (₹50,000). Stock falls to ₹400. You buy 100 more at ₹400 (₹40,000).

```
Average = (50,000 + 40,000) / 200 = ₹450
```

Stock falls further to ₹300. You buy 100 more at ₹300.

```
Total invested = 50,000 + 40,000 + 30,000 = ₹1,20,000
Total shares = 300
Average = 1,20,000 / 300 = ₹400
```

To **break even**, the stock now needs to recover **33%** (from 300 to 400). The original 100 shares are still 20% underwater at ₹400.

**Averaging down works if** the stock is genuinely undervalued and recovers. **Averaging down fails if** the stock keeps falling — you keep increasing your loss exposure to a deteriorating business. Use the calculator to surface "how much have I really committed to this idea?"

## DCA (Dollar-Cost Averaging) — the strategy

DCA = buying the **same rupee amount** at fixed intervals, regardless of price. The math:

| Month     | Investment  | Price | Shares bought |
| --------- | ----------- | ----- | ------------- |
| Jan       | ₹10,000     | ₹500  | 20            |
| Feb       | ₹10,000     | ₹400  | 25            |
| Mar       | ₹10,000     | ₹600  | 16.67         |
| Apr       | ₹10,000     | ₹450  | 22.22         |
| May       | ₹10,000     | ₹550  | 18.18         |
| **Total** | **₹50,000** |       | **102.07**    |

```
Average price = 50,000 / 102.07 = ₹489.86
Simple average of prices = (500+400+600+450+550)/5 = ₹500
```

DCA **beats the simple average** because you bought more shares when prices were low. This is the math behind monthly SIPs in mutual funds — see the [SIP Calculator](/calculator/sip).

## VAW (Volatility-adjusted weighting)

Some traders use **value averaging**: target a specific portfolio value at each interval, buy more when below target, less when above. Mathematically efficient but emotionally hard — requires buying more during crashes.

## When averaging makes sense

**Good time to average**:

- High-conviction long-term holdings
- Index funds (averaging is the entire strategy)
- Diversified blue-chips in temporary drawdowns
- Mutual funds via SIP

**Bad time to average**:

- Single small-cap "story" stocks that are crashing on fundamental news
- Sectors in structural decline (PSU PSU banks pre-2014, telecom 2017-2019)
- "Falling knives" — names trending down on negative news cycles

## Components and inputs

### Lots — multiple buy entries

Add as many lot rows as needed. Each has:

- Quantity (number of shares)
- Price per share

### Optional fields per lot

- Buy date (for tax holding-period awareness)
- Brokerage / fees

### Current market price (optional)

For unrealised P&L computation.

### Output

- Total quantity
- Total invested
- Average buy price
- Break-even (= average + fees + future tax estimate)
- Current value (if market price given)
- Unrealised gain/loss + %
- Per-lot P&L (each tranche separately)

## Common applications

### Pre-trade decision

"Should I add another lot at the current price?" Plug in the new lot; see your new average. Decide whether the new average is acceptable.

### Tax planning

At year-end, see your average cost. Decide which lots to sell — selling oldest first (FIFO) is mandatory in India, but the average tells you your overall cost.

### SIP / DCA tracking

Monthly SIPs into mutual funds — each NAV at purchase becomes a lot. Average NAV after 12 months tells you your effective cost basis.

### ESOP / RSU vesting

Vesting at different stock prices over years builds up multiple "lots". Average them for cost basis.

## Considerations

- **Brokerage and STT add up**. Add ~0.3% per round-trip to average price for true break-even.
- **Dividends reduce effective cost basis** — but Indian tax treats dividends as income (slab rate), not as a cost reduction. The calculator doesn't auto-adjust.
- **Bonus issues** add shares without cost, lowering average. Adjust manually: same total cost / higher quantity.
- **Splits** halve price and double quantity — average price halves. Adjust manually.

## Limitations

- Doesn't handle splits, bonuses, mergers automatically — you must enter adjusted lots.
- Doesn't track dividends received (reinvested or paid out).
- FIFO tax computation is not the same as average cost — for tax, use broker's FIFO statement.
- For mutual funds, the **NAV-based** average is what your statement shows; this calculator approximates it.

## Related calculators

- **[Stock Profit](/calculator/stock-profit)** — P&L on a sell
- **[SIP](/calculator/sip)** — recurring investment
- **[CAGR](/calculator/cagr)** — annualized return
- **[ROI](/calculator/roi)** — generic return %
- **[Income Tax](/calculator/income-tax)** — STCG / LTCG slab math

---

**Final note.** Knowing your **true average cost** is the foundation of equity discipline. Most retail investors look only at "current price vs first buy price" — that's not your position. **Weighted average across all lots** is what determines break-even and tax. Use this calculator before adding a new lot to a losing stock; it surfaces how much real capital is committed and whether averaging-down is rescue or trap.
