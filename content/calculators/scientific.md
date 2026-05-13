## What is a scientific calculator?

A **scientific calculator** extends the basic four-function calculator with **trigonometry, logarithms, exponents, square roots, parentheses, constants (π, e)**, and proper **order of operations (BODMAS)**. It's what you used in high school and engineering college — except now it lives in your browser and runs anywhere.

CalcMaster's scientific calculator parses full expressions like `sin(45°)² + log(1000)` and evaluates them with the correct precedence. No more clicking buttons one at a time hoping the operator order works out.

## How is order of operations (BODMAS) handled?

BODMAS / PEMDAS:

```
1. Brackets / Parentheses
2. Exponents / Powers / Roots
3. Multiplication and Division (left to right)
4. Addition and Subtraction (left to right)
```

The Scientific calculator uses **mathjs** under the hood — the same expression-parsing library used by Wolfram Alpha-style tools — so precedence is always correct.

Example:

```
Expression:  2 + 3 × 4²
Step 1 (exponent):  2 + 3 × 16
Step 2 (multiplication):  2 + 48
Step 3 (addition):  50
```

Compare to the [Basic Calculator](/calculator/basic) which would compute `(2+3) × 4² = 5 × 16 = 80` — left-to-right immediate mode without precedence.

## Worked example: physics homework

Compute the **velocity at impact for a stone dropped from 50 m**:

```
v = sqrt(2 × 9.81 × 50)
  = sqrt(981)
  = 31.32 m/s
```

In CalcMaster: type `sqrt(2 * 9.81 * 50)` → press `=` → get `31.32`.

For more complex physics: type `0.5 * 70 * (15^2)` → kinetic energy of a 70 kg cyclist at 15 m/s = `7,875 J`.

## Functions supported

### Arithmetic and grouping

| Operator        | Meaning                  |
| --------------- | ------------------------ |
| `+` `-` `*` `/` | Standard four-function   |
| `^`             | Exponent (2^3 = 8)       |
| `(  )`          | Parentheses for grouping |
| `!`             | Factorial (5! = 120)     |
| `%`             | Percentage (50% = 0.5)   |

### Trigonometry

| Function                        | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `sin(x)`, `cos(x)`, `tan(x)`    | Standard trig (input in **radians** by default) |
| `asin(x)`, `acos(x)`, `atan(x)` | Inverse trig                                    |
| `sinh(x)`, `cosh(x)`, `tanh(x)` | Hyperbolic variants                             |

**Degree mode**: append `deg` — e.g. `sin(45 deg)` returns 0.7071.

### Logarithms and exponents

| Function       | Meaning                  |
| -------------- | ------------------------ |
| `log(x)`       | Common log (base 10)     |
| `log(x, base)` | Log to a custom base     |
| `ln(x)`        | Natural log (base e)     |
| `exp(x)`       | e raised to x            |
| `e`            | Euler's number ≈ 2.71828 |
| `pi`           | π ≈ 3.14159              |

### Roots

| Function        | Meaning     |
| --------------- | ----------- |
| `sqrt(x)`       | Square root |
| `cbrt(x)`       | Cube root   |
| `nthRoot(x, n)` | n-th root   |

### Other

| Function                       | Meaning                  |
| ------------------------------ | ------------------------ |
| `abs(x)`                       | Absolute value           |
| `round(x)`                     | Round to nearest integer |
| `floor(x)`, `ceil(x)`          | Floor / ceiling          |
| `min(a, b, …)`, `max(a, b, …)` | Min / max of inputs      |

## Worked example: compound trig

Compute `sin²(30°) + cos²(30°)` (which should equal 1, the Pythagorean identity):

```
Expression: sin(30 deg)^2 + cos(30 deg)^2
Step 1:  0.5^2 + 0.866^2
Step 2:  0.25 + 0.75
Result:  1.0  ✓
```

## Components and inputs explained

### Expression input

A single text field where you type the full expression. Use parentheses generously — they cost nothing and prevent precedence surprises.

### Live preview

As you type, CalcMaster shows the partial expression. Errors (mismatched parentheses, undefined functions) are flagged inline before you press `=`.

### Keypad (mobile)

On mobile, the keypad shows the most-used functions: `sin`, `cos`, `tan`, `log`, `ln`, `sqrt`, `^`, `(`, `)`, `π`, `e`. Tap to insert at cursor.

### Result history

Every evaluated expression is saved to your local history. Reuse previous answers with `ans` (refers to the last result).

## When to use Scientific vs other calculators

| Need                                                  | Use                                                     |
| ----------------------------------------------------- | ------------------------------------------------------- |
| Add/subtract a few numbers                            | [Basic](/calculator/basic)                              |
| Multiple operations in one expression with precedence | **Scientific**                                          |
| Trig, log, exp, roots                                 | **Scientific**                                          |
| Compound interest math                                | [Compound Interest](/calculator/compound-interest)      |
| Statistical mean/median/stddev of a list              | [Statistics](/calculator/statistics)                    |
| Quadratic roots                                       | [Quadratic Solver](/calculator/quadratic)               |
| Fraction arithmetic                                   | [Fraction Calculator](/calculator/fraction)             |
| Base conversion (binary/hex)                          | [Number System](/calculator/number-system)              |
| Matrix operations                                     | [Matrix Calculator](/calculator/matrix)                 |
| Permutations and combinations                         | [P & C Calculator](/calculator/permutation-combination) |

## Common school-and-college applications

| Subject                  | Examples                                                           |
| ------------------------ | ------------------------------------------------------------------ |
| **Algebra**              | Solve `2x + 5 = 17` → type `(17 - 5) / 2` → 6                      |
| **Trigonometry**         | Heights and distances, angle problems, ship/aircraft navigation    |
| **Physics — kinematics** | `v = u + at`, projectile range/height, free fall                   |
| **Physics — energy**     | `KE = 0.5 mv²`, `PE = mgh`, work and power                         |
| **Chemistry**            | Stoichiometry, pH = `-log(H+)`, molarity dilutions                 |
| **Engineering**          | Beam stress, electrical impedance (`sqrt(R² + X²)`), thermal calcs |
| **Statistics**           | z-scores, simple probability, normal-curve values                  |

## Common mistakes

- **Forgetting parentheses around the angle**. `sin 45` doesn't work; use `sin(45)`.
- **Mixing radians and degrees**. Default is radians. Use `deg` suffix or `pi/180` conversion.
- **Implicit multiplication**. `2pi` doesn't always work; use `2 * pi`.
- **Floating-point quirks**. `sin(pi)` returns `1.2246e-16` (very close to 0 but not exactly 0). Treat very small numbers as zero in physical problems.
- **Negative exponents**. Use `2^-3` or `1/2^3`, both work.

## Considerations

- **Default angle unit is radians.** If you're doing degree-based geometry, append `deg`: `cos(60 deg)`.
- **Mathjs uses ECMAScript-style precedence.** Right-associative `^` (so `2^3^2 = 2^9 = 512`, not `8^2 = 64`).
- **Implicit multiplication isn't universal.** `2(3+4)` works in mathjs but other tools may require `2*(3+4)`.
- **Pre-defined variables**: `pi`, `e`, `Infinity`, `NaN`. Don't override these.

## Limitations

- The scientific calculator parses expressions, not equations. To **solve** `2x + 5 = 17` for x, use the [Quadratic Solver](/calculator/quadratic) or rearrange manually.
- No symbolic math (can't simplify `(x + 1)(x - 1)` to `x² − 1`).
- No graphing (use Desmos / GeoGebra for plots).
- No matrix inputs in this calculator — use [Matrix Calculator](/calculator/matrix).
- No statistics-list inputs (mean of a paste of numbers); use [Statistics](/calculator/statistics).
- Doesn't handle complex numbers (no `i`). Use Wolfram Alpha for complex-arithmetic problems.

## Related calculators

- **[Basic Calculator](/calculator/basic)** — immediate-mode arithmetic
- **[Quadratic Solver](/calculator/quadratic)** — roots of ax² + bx + c
- **[Statistics](/calculator/statistics)** — mean / median / stddev
- **[Logarithm](/calculator/logarithm)** — log_b(x) with base picker
- **[Permutation & Combination](/calculator/permutation-combination)** — nPr and nCr
- **[Matrix Calculator](/calculator/matrix)** — matrix arithmetic
- **[Number System](/calculator/number-system)** — base conversion
- **[Fraction](/calculator/fraction)** — fraction arithmetic

---

**Final note.** A scientific calculator is the workhorse of homework, engineering, and serious finance. **Type one expression, evaluate once, move on.** The mistake people make is reaching for the Basic calculator and clicking through operations one at a time — the Scientific calculator with a single typed expression is faster _and_ less error-prone. Use parentheses generously; they cost zero and save grief.
