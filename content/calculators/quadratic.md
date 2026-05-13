## What is a quadratic equation calculator?

A **quadratic equation calculator** finds the roots (solutions) of an equation of the form:

```
ax² + bx + c = 0
```

where `a ≠ 0`. The roots are the values of `x` that make the equation true — geometrically, the points where the parabola `y = ax² + bx + c` crosses the x-axis.

Quadratic equations have **at most two real roots**. They may also have **one repeated root**, or **two complex roots** (no real solutions). The calculator handles all three cases.

## How is it solved?

The standard **quadratic formula**:

```
x = (-b ± √(b² − 4ac)) / 2a
```

The expression under the square root, `b² − 4ac`, is called the **discriminant** (Δ). It tells you what type of roots to expect:

| Discriminant | Roots                                             |
| ------------ | ------------------------------------------------- |
| Δ > 0        | Two distinct real roots                           |
| Δ = 0        | One repeated real root (parabola touches x-axis)  |
| Δ < 0        | Two complex roots (parabola doesn't cross x-axis) |

## Worked example: two real roots

Solve **x² − 5x + 6 = 0**:

```
a = 1, b = −5, c = 6
Δ = (−5)² − 4(1)(6) = 25 − 24 = 1
√Δ = 1

x = (5 ± 1) / 2
x₁ = 6 / 2 = 3
x₂ = 4 / 2 = 2

Roots: x = 2, 3
```

Verify: `(2)² − 5(2) + 6 = 4 − 10 + 6 = 0 ✓`

## Worked example: repeated root

Solve **x² − 4x + 4 = 0**:

```
a = 1, b = −4, c = 4
Δ = 16 − 16 = 0
x = (4 ± 0) / 2 = 2

Root: x = 2 (repeated, multiplicity 2)
```

The parabola touches the x-axis at x = 2 but doesn't cross.

## Worked example: complex roots

Solve **x² + 2x + 5 = 0**:

```
a = 1, b = 2, c = 5
Δ = 4 − 20 = −16
√Δ = √(−16) = 4i  (where i = √−1)

x = (−2 ± 4i) / 2
x₁ = −1 + 2i
x₂ = −1 − 2i

Roots: complex conjugates
```

No real solutions — the parabola sits above the x-axis. Complex roots always come in conjugate pairs for real coefficients.

## Vertex form

Any quadratic can be rewritten in **vertex form**:

```
y = a(x − h)² + k
```

where `(h, k)` is the vertex (the minimum or maximum point).

```
h = −b / 2a
k = c − b²/4a
```

For **x² − 5x + 6**:

```
h = 5/2 = 2.5
k = 6 − 25/4 = −0.25
```

Vertex: (2.5, −0.25). Below the x-axis (since k < 0), confirming two real roots.

## Factored form

If the roots are r₁ and r₂:

```
ax² + bx + c = a(x − r₁)(x − r₂)
```

For **x² − 5x + 6 = (x − 2)(x − 3)** ✓.

Some quadratics factor nicely; many don't. The formula always works.

## Vieta's formulas

For roots r₁ and r₂:

```
Sum:     r₁ + r₂ = −b/a
Product: r₁ × r₂ = c/a
```

Useful sanity check. For **x² − 5x + 6**:

```
Sum: 2 + 3 = 5 ✓ (matches −(−5)/1)
Product: 2 × 3 = 6 ✓ (matches 6/1)
```

## Components and inputs

### a, b, c — coefficients

The three numbers from `ax² + bx + c = 0`. Decimals and negatives allowed. `a` must not be zero (else it's a linear equation).

### Output

- **Discriminant** (and what it means)
- **Real roots** (if any), with both values
- **Vertex** (h, k)
- **Factored form** (if roots are rational)
- **Visual graph** (parabola with roots marked)

## Common real-world applications

### Physics — projectile motion

```
y(t) = -½gt² + v₀t + y₀
```

Find when projectile hits ground (y = 0). Solve for t.

**Example**: a ball thrown up at 20 m/s from 1.5 m height. When does it land?

```
−4.9t² + 20t + 1.5 = 0
a = −4.9, b = 20, c = 1.5
t = (−20 ± √(400 + 29.4)) / −9.8
  = (−20 ± 20.73) / −9.8
t₁ = (−20 + 20.73)/−9.8 ≈ −0.07 s (before throw, reject)
t₂ = (−20 − 20.73)/−9.8 ≈ 4.16 s ✓
```

Ball lands at t ≈ 4.16 seconds.

### Geometry — area constraints

"A rectangle has perimeter 24 m and area 35 m². Find dimensions."

```
Length + Width = 12, Length × Width = 35
L(12 − L) = 35
−L² + 12L − 35 = 0
L² − 12L + 35 = 0
L = (12 ± √(144 − 140)) / 2 = (12 ± 2)/2
L = 7 or 5
```

Dimensions: 7 m × 5 m.

### Business — break-even analysis

Profit = Revenue − Cost is quadratic when price affects demand. Setting it to zero gives break-even sales levels.

### Algebra homework

"Find x where x² − 7x = −12":

```
x² − 7x + 12 = 0
a = 1, b = −7, c = 12
Δ = 49 − 48 = 1
x = (7 ± 1)/2 = 4 or 3
```

## Considerations

- **Always reduce to standard form first**: `ax² + bx + c = 0` with everything on the left side.
- **Watch the signs**: if your equation is `5 − 3x + 2x²`, that's `a = 2, b = −3, c = 5`.
- **Complex roots aren't "wrong"** — they're valid mathematical solutions, just not visible on the real-number x-axis.
- **Vertex first, then roots** is sometimes easier than the formula — especially for quick sketching.

## Limitations

- Solves **only** quadratics (degree 2). For higher degrees (cubic, quartic), use a polynomial solver.
- Coefficients must be real numbers — doesn't accept complex coefficients in this version.
- Symbolic / algebraic manipulation (factoring symbolically) is not handled — purely numeric.
- Inequalities (`x² < 4`) not solved — use a separate inequality solver.

## Related calculators

- **[Scientific Calculator](/calculator/scientific)** — manual computation, includes square root
- **[Polynomial Solver](/calculator/polynomial)** — higher-degree equations
- **[Linear Equation](/calculator/linear-equation)** — `ax + b = 0`
- **[System of Equations](/calculator/system-equations)** — multiple unknowns
- **[Graphing Calculator](/calculator/graphing)** — visualize functions
- **[Distance / Slope](/calculator/distance-slope)** — coordinate geometry

---

**Final note.** The quadratic formula `x = (-b ± √(b²−4ac))/2a` is the **most useful algebraic tool you'll learn in school**. Memorize it once; use it forever. The **discriminant** tells you the nature of the roots at a glance. For real-world problems (physics, geometry, finance), always check whether negative roots are physical — sometimes you reject one root because it violates the setup (time before zero, negative length, etc.).
