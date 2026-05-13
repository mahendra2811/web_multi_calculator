## What is a GCD / LCM calculator?

A **GCD / LCM calculator** finds the **greatest common divisor (GCD)** and **least common multiple (LCM)** of two or more integers. These are foundational tools in arithmetic — used in simplifying fractions, finding common denominators, scheduling, encryption, and number theory.

- **GCD** (also called HCF — Highest Common Factor): the largest integer that divides all the inputs.
- **LCM**: the smallest positive integer divisible by all the inputs.

## Definitions and key formula

For two numbers `a` and `b`:

```
GCD(a, b) × LCM(a, b) = a × b

⇒ LCM(a, b) = (a × b) / GCD(a, b)
```

This identity lets you compute LCM cheaply once you have GCD.

## How GCD is computed — Euclidean algorithm

Most efficient method:

```
GCD(a, b) = GCD(b, a mod b)
GCD(a, 0) = a
```

Repeat until the second argument is 0.

### Example: GCD(252, 105)

```
252 mod 105 = 42   → GCD(105, 42)
105 mod 42 = 21    → GCD(42, 21)
42 mod 21 = 0      → GCD = 21
```

So GCD(252, 105) = **21**.

### LCM

```
LCM(252, 105) = (252 × 105) / 21 = 26,460 / 21 = 1,260
```

## Worked example — prime factorization method

For small numbers, prime factorization is illuminating:

```
36 = 2² × 3²
60 = 2² × 3 × 5

GCD: take MIN exponent of each prime
   = 2² × 3¹ = 12
LCM: take MAX exponent of each prime
   = 2² × 3² × 5 = 180

Check: 36 × 60 = 2,160 = 12 × 180 ✓
```

## Common applications

### Simplifying fractions

```
Reduce 48/72:
GCD(48, 72) = 24
48 ÷ 24 = 2
72 ÷ 24 = 3
Reduced: 2/3
```

### Finding common denominators

```
1/4 + 1/6 = ?
LCM(4, 6) = 12
1/4 = 3/12
1/6 = 2/12
Sum: 5/12
```

### Scheduling problems

"Bus A comes every 12 minutes, bus B every 18 minutes. They both came at 8 am. When next together?"

```
LCM(12, 18) = 36
Next coincidence: 8:36 am.
```

"Two LED lights flash every 6 and 10 seconds. They flashed together once. When again?"

```
LCM(6, 10) = 30
30 seconds later.
```

### Tile / grid problems

"What's the largest square tile that fits exactly into a 252 cm × 105 cm rectangle?"

```
GCD(252, 105) = 21
A 21 × 21 cm tile works. Need (252/21) × (105/21) = 12 × 5 = 60 tiles.
```

### Engineering — gear ratios

Synchronizing gears with N₁ and N₂ teeth: full rotation every LCM(N₁, N₂) teeth pass — divided by each gear's teeth to get rotations.

## Worked example — three numbers

```
Find GCD(24, 36, 60):
GCD(24, 36) = 12
GCD(12, 60) = 12
⇒ GCD(24, 36, 60) = 12

Find LCM(24, 36, 60):
LCM(24, 36) = 72
LCM(72, 60) = 360
⇒ LCM(24, 36, 60) = 360
```

GCD is **associative** — order doesn't matter for multi-number GCD/LCM.

## Properties

| Property       | Formula                                              |
| -------------- | ---------------------------------------------------- |
| Identity       | GCD(a, a) = a, LCM(a, a) = a                         |
| With 0         | GCD(a, 0) = a, LCM(a, 0) = 0                         |
| With 1         | GCD(a, 1) = 1, LCM(a, 1) = a                         |
| Coprime        | GCD(a, b) = 1 ⇒ LCM = a × b                          |
| Distributive   | GCD(ka, kb) = k × GCD(a, b)                          |
| Multiplicative | If GCD(a, b) = 1: GCD(ab, c) = GCD(a, c) × GCD(b, c) |

## Coprime numbers

Two numbers are **coprime** (relatively prime) if GCD = 1. They share no prime factors:

```
GCD(7, 12) = 1  → coprime
GCD(6, 25) = 1  → coprime
GCD(8, 12) = 4  → not coprime
```

Coprimality matters for:

- RSA encryption (uses coprime exponents)
- Generating fractions in lowest terms
- Number-theory proofs

## Worked example — Indian street vendor

A sweet vendor wants to make boxes containing the **same number of laddoos and pedhas**, using all of his stock. He has 96 laddoos and 72 pedhas.

```
GCD(96, 72) = 24
Each box gets 96/24 = 4 laddoos and 72/24 = 3 pedhas.
He makes 24 boxes.
```

If he wants the **largest box** with both items, GCD answers it directly.

## Stern-Brocot / continued fractions

GCD via Euclidean algorithm naturally produces the **continued fraction** of a/b, useful for approximating irrationals with rationals.

```
GCD(355, 113):
355 = 3×113 + 16
113 = 7×16 + 1
16 = 16×1 + 0
GCD = 1
```

The quotients 3, 7, 16 form the continued fraction for 355/113 (a famous π approximation, 355/113 ≈ 3.14159292).

## Components and inputs

### Numbers

Enter 2 or more positive integers, comma-separated or one per line. Negative numbers conventionally use absolute value.

### Output

- **GCD** — the largest common divisor
- **LCM** — the least common multiple
- **All divisors** of each input (factor lists)
- **Step-by-step** Euclidean algorithm trace

## Common mistakes

### Confusing GCD and LCM

- GCD ≤ smallest input
- LCM ≥ largest input
- LCM × GCD = product (for 2 numbers only — not for 3+)

### Forgetting that GCD(a, b, c) ≠ GCD(a, b) × GCD(b, c)

GCD doesn't compose by multiplication. Take it pairwise:

```
GCD(a, b, c) = GCD(GCD(a, b), c)
```

### LCM blowing up with many large primes

LCM of 7, 11, 13, 17, 19, 23 = 7 × 11 × 13 × 17 × 19 × 23 = 1,062,347. LCM grows fast when numbers are pairwise coprime.

## Considerations

- **Always works for positive integers.** For negatives, take absolute values.
- **LCM(0, anything) = 0** by convention.
- **Euclidean algorithm is O(log(min(a,b)))** — extremely fast.
- **Prime factorization** is intuitive but O(√n) — slower for large numbers.

## Limitations

- Integer math only (no fractions or decimals as inputs).
- For very large numbers (> 10¹⁵), modular arithmetic optimizations may be needed.
- Doesn't handle polynomial GCD (polynomial Euclidean algorithm is different).
- Doesn't find Bézout coefficients (the extended Euclidean returns those — use a separate calculator).

## Related calculators

- **[Prime Checker](/calculator/prime-checker)** — factor numbers into primes
- **[Fraction](/calculator/fraction)** — uses GCD for simplification
- **[Modulo](/calculator/modulo)** — remainder arithmetic, closely related
- **[Scientific Calculator](/calculator/scientific)** — general math
- **[Number System](/calculator/number-system)** — base conversion

---

**Final note.** GCD and LCM are **simple but ubiquitous**. Use GCD for **fraction reduction, tiling, ratio simplification**. Use LCM for **common denominators, scheduling, gear synchronization**. The **Euclidean algorithm** is one of the oldest algorithms still in daily use (Euclid, c. 300 BC) — and remains the most efficient method known.
