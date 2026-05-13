## What is a prime number checker?

A **prime number checker** tests whether a given integer is prime, and (if not) returns its **prime factorization** — the unique decomposition into prime factors.

- **Prime**: a positive integer > 1 with exactly two divisors (1 and itself). Examples: 2, 3, 5, 7, 11, 13.
- **Composite**: a positive integer > 1 that has more divisors. Examples: 4 = 2×2, 6 = 2×3, 100 = 2²×5².
- **1** is neither prime nor composite (special case).
- **2** is the only even prime.

## How is primality checked?

The simplest test: divide `n` by every integer from 2 up to **√n**. If no divisor is found, n is prime. We only need to check up to √n because any factor > √n pairs with one < √n.

```
function isPrime(n):
  if n < 2: return false
  if n == 2: return true
  if n is even: return false
  for i = 3 to sqrt(n), step 2:
    if n % i == 0: return false
  return true
```

For large numbers, more sophisticated tests are used (Miller-Rabin, AKS) — but for everyday numbers up to billions, trial division is fast enough.

## Worked examples

### Is **97** prime?

```
√97 ≈ 9.85
Try divisors: 2 (no, 97 odd), 3 (97/3 = 32.33), 5 (97 not /5), 7 (97/7=13.86)
None divide 97 evenly.
Yes — 97 is prime.
```

### Is **91** prime?

```
√91 ≈ 9.54
2 (odd), 3 (9+1=10, not /3), 5 (no), 7 (91/7 = 13 ✓)
No — 91 = 7 × 13. Composite.
```

### Factorize **360**

```
360 / 2 = 180
180 / 2 = 90
90 / 2 = 45
45 / 3 = 15
15 / 3 = 5
5 / 5 = 1

360 = 2³ × 3² × 5
```

## First 50 primes (memorize these)

```
 2,  3,  5,  7, 11, 13, 17, 19, 23, 29,
31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
73, 79, 83, 89, 97,101,103,107,109,113,
127,131,137,139,149,151,157,163,167,173,
179,181,191,193,197,199,211,223,227,229
```

## Quick divisibility checks

Before plugging into a prime checker, eliminate easy composites:

| Divisor     | Trick                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| 2           | Last digit even (0, 2, 4, 6, 8)                                                                              |
| 3           | Digit sum divisible by 3 (123 → 1+2+3=6 → yes)                                                               |
| 4           | Last two digits divisible by 4                                                                               |
| 5           | Last digit 0 or 5                                                                                            |
| 6           | Divisible by both 2 and 3                                                                                    |
| 7           | Double the last digit, subtract from rest. Repeat. If 0 or divisible by 7, yes. (203 → 20−6=14 → 14/7=2 yes) |
| 8           | Last three digits divisible by 8                                                                             |
| 9           | Digit sum divisible by 9                                                                                     |
| 10          | Last digit 0                                                                                                 |
| 11          | Alternating digit sum divisible by 11 (1331 → 1−3+3−1=0 yes)                                                 |
| 12          | Divisible by both 3 and 4                                                                                    |
| 13, 17, 19+ | Just divide directly                                                                                         |

## Sieve of Eratosthenes — finding many primes at once

For "list all primes up to N":

```
1. Write numbers 2 to N
2. Pick first unmarked number (start: 2) — it's prime
3. Mark all multiples of it as composite
4. Repeat from step 2 with next unmarked
5. Stop when current > √N
6. Remaining unmarked numbers are all prime
```

Example for N = 30:

```
2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```

The sieve is much faster than checking each number individually with trial division — it's the standard way to enumerate primes for cryptography and number theory.

## Why primes matter

### Cryptography

RSA encryption depends on the fact that **factoring large numbers is hard**. If you multiply two 1024-bit primes, the resulting 2048-bit number is currently infeasible to factor — even with massive computers. Public-key crypto, secure web (HTTPS), banking, all depend on prime-based math.

### Number theory

Fundamental theorem of arithmetic: **every integer > 1 has a unique prime factorization**. This is the foundation of essentially all integer mathematics.

### Hashing

Hash table sizes are often chosen to be prime to reduce collisions.

### Music and rhythm

Polyrhythms based on coprime numbers (like 5 against 7) take 35 beats to realign — primes appear in music theory.

## Famous primes

- **2** — the only even prime
- **3, 5, 7, 11, 13, 17, 19, 23, 29, 31** — the first ten primes
- **Mersenne primes**: 2ⁿ − 1 (like 3, 7, 31, 127, 8191, ...). Used to break primality records.
- **Twin primes**: pairs (3,5), (5,7), (11,13), (17,19), (29,31), ... — believed infinite, unproven.
- **Largest known prime** (as of writing): 2^82,589,933 − 1, a 24,862,048-digit Mersenne prime.

## Components and inputs

### Number to check

A positive integer. Decimals not allowed; this is integer math.

### Output

- **Is prime?** Yes / No
- **Prime factorization** if composite
- **All divisors** (factors including 1 and itself)
- **Next prime** above the input
- **Previous prime** below the input

## Common applications

### Reducing fractions

To simplify a/b: find GCD via prime factorization, divide.

```
Reduce 360/420:
360 = 2³ × 3² × 5
420 = 2² × 3 × 5 × 7
GCD = 2² × 3 × 5 = 60
360/420 = 6/7
```

(See [GCD / LCM Calculator](/calculator/gcd-lcm).)

### Hash table sizes

Storage size of 11, 23, 47, 97 (close to powers of 2 but prime) reduces collisions when keys aren't perfectly random.

### Crypto key generation

RSA generates primes by:

1. Pick random odd number n of desired bit-length
2. Apply Miller-Rabin test
3. If composite, n += 2, retry
4. Found prime in ~ln(n) tries

## Considerations

- **1 is not prime.** By definition, primes have **exactly two divisors**. 1 has only one.
- **Negative numbers and zero** are not considered prime.
- **Primality testing scales with size.** For 10-digit numbers, instant. For 100-digit, requires Miller-Rabin. For 1000-digit (crypto), still seconds.
- **Probabilistic vs deterministic.** Miller-Rabin is probabilistic but with 1-in-2^80 false positives — effectively certain.

## Limitations

- Very large numbers (>10¹⁸) may be slow with naive trial division — use Miller-Rabin.
- Doesn't handle non-integer inputs.
- Doesn't list ALL primes up to a bound (use a sieve for that).
- Doesn't detect special prime forms (Mersenne, Sophie Germain, Fermat) explicitly.

## Related calculators

- **[GCD / LCM](/calculator/gcd-lcm)** — greatest common divisor, least common multiple
- **[Number System](/calculator/number-system)** — binary / hex / decimal conversion
- **[Modulo](/calculator/modulo)** — remainder arithmetic
- **[Scientific Calculator](/calculator/scientific)** — general computation
- **[Fraction Simplifier](/calculator/fraction)** — uses GCD

---

**Final note.** Prime numbers are the **atoms of integer arithmetic** — every positive integer factors uniquely into them. Trial division up to √n is enough for everyday checking. Beyond that, **Miller-Rabin** is the standard. Prime factorization powers everything from fraction simplification to internet-grade cryptography — same math, vastly different scales.
