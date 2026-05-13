## What is a basic calculator?

A **basic calculator** is the digital equivalent of the desk calculator on your accountant's table — a no-frills tool for everyday arithmetic. Addition, subtraction, multiplication, division, percentages, sign flip, decimal handling. Nothing fancy. Just numbers in, answer out.

It's the most-used Google search worldwide ("calculator" alone has > 50 million monthly searches), which is why every browser, OS, and search engine ships one. CalcMaster's basic calculator is keyboard-friendly, mobile-first, and saves every calculation to your history.

## How does it work?

The calculator follows the standard "immediate execution" model — the same model used by physical desk calculators. Each operator is applied **as soon as you type it**, in left-to-right order.

```
Type:    2 + 3 × 4
Reads as: (2 + 3) × 4 = 20    (NOT 2 + (3 × 4) = 14)
```

If you want **BODMAS / PEMDAS** (parentheses, exponents, multiply/divide before add/subtract), use the [Scientific Calculator](/calculator/scientific) instead — it handles operator precedence properly.

## Worked example

Splitting a restaurant bill four ways with 10% tip:

```
Type:    1850 + 1850 × 10 % = ÷ 4 =
Steps:   1850 → 1850 → 1850 + 1850 = 3700 → 3700 × 10% = 370
         (immediate-mode tip)
         → wait, this isn't quite right
```

Use the [Tip Calculator](/calculator/tip) instead for restaurant tip math. The Basic calculator is best for stand-alone arithmetic, not chained percentage-of-percentage operations.

For pure arithmetic:

```
Bill total: 1850
Tip 10%:    Type "1850 × 10% =" → 185
Final:      1850 + 185 = 2035
Per person: 2035 ÷ 4 = 508.75
```

The Basic calculator chains naturally for sequential operations like this.

## Components and inputs explained

### Number pad (0-9, .)

Standard keyboard numeric input. Also accepts physical-keyboard digits, period (`.`) for decimal, backspace to delete the last digit.

### Operators (+, −, ×, ÷)

Standard four-function arithmetic. Also accepts `*` for multiply and `/` for divide from physical keyboard.

### Special keys

- `=` — compute the answer; also accepts Enter key
- `C` — clear current display and the calculator state; also accepts Escape
- `±` — toggle the sign of the current number (positive/negative)
- `%` — convert the current number to its percentage (divides by 100)

### Decimal display

The calculator shows up to 12 significant digits. Very large / very small results may appear in scientific notation (e.g. `1.23e+15`).

## Keyboard shortcuts

CalcMaster's Basic calculator works fully from the keyboard — no mouse needed:

| Key             | Action            |
| --------------- | ----------------- |
| `0` – `9`       | Type digit        |
| `.`             | Decimal point     |
| `+` `-` `*` `/` | Operators         |
| `Enter` or `=`  | Compute           |
| `Backspace`     | Delete last digit |
| `Escape` or `C` | Clear             |
| `%`             | Percentage        |

This makes it usable for fast number-typing without grabbing the mouse — the same speed as a hardware calculator.

## When to use Basic vs Scientific

| Need                                | Use                                                  |
| ----------------------------------- | ---------------------------------------------------- |
| Add/subtract a column of numbers    | **Basic**                                            |
| Tip on a restaurant bill            | **Basic** or [Tip](/calculator/tip)                  |
| Convert between currencies          | [Currency Converter](/calculator/currency-converter) |
| Calculate the area of a circle      | **Scientific** (needs π)                             |
| Trigonometry (sin/cos/tan)          | **Scientific**                                       |
| Exponents or square roots           | **Scientific**                                       |
| Order of operations matters         | **Scientific** (BODMAS)                              |
| Multiple variables, complex formula | **Scientific**                                       |
| Statistics on a list of numbers     | [Statistics](/calculator/statistics)                 |
| Compound interest                   | [Compound Interest](/calculator/compound-interest)   |

## Common everyday uses

- **Splitting bills** — restaurant, utilities, household expenses
- **Quick math at the cash counter** — sanity-check the cashier's total
- **DIY measurements** — adding tile / paint quantities
- **Tip and tax** — adding tip and tax to a base amount
- **Quick percentages** — discount on a sticker, GST on a quote
- **Children's homework** — arithmetic
- **Memory aid** — running totals when you don't trust your head

## What basic calculators don't do

- No order of operations (BODMAS). Use the Scientific calculator for that.
- No memory functions (M+, M-, MR). Use the History page instead — every result is logged.
- No graphing or function plots. Use the Scientific calculator.
- No unit conversion. Use the [Length](/calculator/length) / [Mass](/calculator/mass) / [Currency](/calculator/currency-converter) converters.
- No multi-variable equations. Use specialized calculators (SIP, EMI, BMI, etc.).

## History and memory

Every calculation you complete (when you press `=`) is **automatically saved** to your local history (browser localStorage, no server). Visit the [History page](/history) to see your last 200 calculations, sorted newest-first.

This effectively replaces the M+/MR memory functions of physical calculators — you don't need to remember to store a result; it's always there.

## Accessibility

- Fully keyboard-navigable (Tab through buttons, Enter to press)
- ARIA labels on every button (screen-reader friendly)
- High-contrast colors meet WCAG AA
- Mobile: large touch targets (≥ 44 × 44 px per iOS / Android guidelines)
- Voice-control compatible (works with iOS Voice Control + Android Voice Access)

## Considerations

- **Floating-point quirks.** Some decimal calculations show tiny imprecision (`0.1 + 0.2 = 0.30000000000000004`). This is a property of binary floating-point math, not a calculator bug. For exact decimal money math, round to two decimal places.
- **Sign of zero.** `−0` and `+0` are mathematically equal but display differently. Doesn't affect math.
- **Division by zero** displays as `∞`, `−∞`, or `NaN` depending on the operation. Clear and start over.
- **Large numbers** use scientific notation past 12 digits. For exact large integers, use the [Big Number](/calculator/big-number) calculator (when shipped).

## Limitations

- No BODMAS / operator precedence — left-to-right immediate mode only.
- No expression history (the running display shows only the previous operand and operator).
- No undo for the last operation. Use C to start over.
- No keyboard customization (sorry, gamers).
- No scientific notation input — for `1.23e+15`, type the full number or use the Scientific calculator.

## Related calculators

- **[Scientific Calculator](/calculator/scientific)** — BODMAS, trig, exp, log
- **[Percentage Calculator](/calculator/percentage)** — 5 percentage operations
- **[Tip Calculator](/calculator/tip)** — restaurant bill split
- **[Currency Converter](/calculator/currency-converter)** — cross-currency
- **[Statistics](/calculator/statistics)** — mean / median / stddev
- **[Fraction Calculator](/calculator/fraction)** — fraction arithmetic
- **[Big Number](/calculator/big-number)** _(roadmap)_ — arbitrary precision integers

---

**Final note.** The Basic calculator is the simplest tool on the site and the most-used. If you're doing anything more complex than four-function arithmetic — multiple operations in one expression, fractions, units — switch to the appropriate specialized calculator. The Basic calculator is for **fast, single-thread arithmetic** — and it's faster than reaching for your phone.
