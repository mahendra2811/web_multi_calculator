## What is HRA?

**House Rent Allowance (HRA)** is a salary component paid to employees to help cover rent expenses. Under the Indian Income Tax Act, **Section 10(13A)** lets you claim a portion of HRA as **tax-exempt** if you actually pay rent and live in a rented house. The exempt portion is the minimum of three values — and that minimum rule is what trips most people up.

For a salaried Mumbai resident with ₹50,000/month basic and ₹20,000/month HRA paying ₹18,000/month rent, HRA exemption can save **₹50,000–₹70,000 in tax per year** under the old regime. The new regime, however, **disallows HRA exemption entirely**.

## How is HRA exemption calculated?

The **exempt HRA = minimum of these three values** (computed annually):

```
1. Actual HRA received (12 × monthly HRA)
2. Either:
     - 50% of Basic + DA (if you live in metro: Delhi, Mumbai, Kolkata, Chennai)
     - 40% of Basic + DA (any other city)
3. Actual annual rent paid − 10% of Basic + DA
```

```
Taxable HRA = HRA received − Exempt HRA
```

This is the _single biggest source of confusion_ in Indian tax planning. The "minimum-of-three" structure means you can't just compute one number — you have to compute all three and pick the smallest.

## Worked example: Mumbai metro

- Monthly Basic + DA: **₹50,000** → annual ₹6,00,000
- Monthly HRA received: **₹20,000** → annual ₹2,40,000
- Monthly rent paid: **₹18,000** → annual ₹2,16,000
- City: **Mumbai (metro)** → 50% of basic applies

The three values:

| #   | Formula                                      | Value     |
| --- | -------------------------------------------- | --------- |
| 1   | Actual HRA received                          | ₹2,40,000 |
| 2   | 50% of (Basic + DA) annual                   | ₹3,00,000 |
| 3   | Rent − 10% of Basic + DA = 2,16,000 − 60,000 | ₹1,56,000 |

**Exempt HRA = min(2,40,000; 3,00,000; 1,56,000) = ₹1,56,000**

So:

- ₹1,56,000 is **tax-free**
- ₹2,40,000 − ₹1,56,000 = **₹84,000 is taxable**

**Tax saved** (30% slab + 4% cess): ₹1,56,000 × 0.312 = **₹48,672/year**.

## Worked example: Bangalore non-metro

Same numbers but in Bangalore (non-metro, 40% of basic):

| #   | Formula                    | Value     |
| --- | -------------------------- | --------- |
| 1   | Actual HRA received        | ₹2,40,000 |
| 2   | 40% of (Basic + DA) annual | ₹2,40,000 |
| 3   | Rent − 10% of Basic + DA   | ₹1,56,000 |

**Exempt HRA = ₹1,56,000** (same as Mumbai in this case, because the rent-paid formula is the limiting factor)

The metro vs non-metro distinction matters most when rent is high relative to basic. With ₹35,000/month rent in Mumbai vs Bangalore, Mumbai's 50% formula gives more exemption.

## Which cities are "metro" for HRA?

By Indian tax law, **only four cities** are "metro" for HRA purposes:

- **Delhi** (NCR areas like Gurgaon, Noida are NOT metro)
- **Mumbai** (includes Navi Mumbai, Thane)
- **Kolkata**
- **Chennai**

Bangalore, Hyderabad, Pune, Ahmedabad — all classified as **non-metro** despite being major cities. The rule hasn't been updated since the original tax-act drafting. Don't fight it; just use 40% for these cities.

## Components and inputs explained

### Basic + DA (monthly)

Your Basic salary plus Dearness Allowance. NOT gross salary. NOT CTC. NOT in-hand.

DA exists mostly in government / PSU jobs. For private sector, it's usually zero; use Basic alone.

### HRA received (monthly)

The HRA component on your salary slip. NOT the rent you pay; that's a separate input.

### Rent paid (monthly)

Actual rent paid to your landlord. Must have receipts (bank transfer trail, formal rent agreement).

### Metro / non-metro

Strictly by tax-law definition (Delhi, Mumbai, Kolkata, Chennai = metro). Bangalore = non-metro.

## Documentation required for HRA exemption

| Document                                   | Required when                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Rent receipts (signed by landlord)         | Always                                                                                      |
| Rent agreement                             | Annual rent > ₹1 lakh                                                                       |
| Landlord's PAN                             | Annual rent > ₹1 lakh (else employer won't grant HRA exemption; you can still claim in ITR) |
| Bank transfer proof                        | Strongly recommended (cash rent is suspect)                                                 |
| Form 12BB (declaration to employer)        | If claiming through employer (rather than in ITR)                                           |
| Self-declaration (if landlord refuses PAN) | Rare; risks rejection                                                                       |

**Pro tip**: get bank-transferred rent receipts signed monthly. Easier to defend in scrutiny than collecting 12 receipts in March.

## Can I claim HRA while paying home loan EMI?

Yes — under specific conditions:

| Scenario                                                                                                              | HRA allowed?            |
| --------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Home loan home is in a **different city** than your job                                                               | ✅                      |
| Home loan home is **rented out** (let-out)                                                                            | ✅                      |
| Home loan home is in **same city** but you're not living there (long-distance commute, repairs, parents living there) | ✅ (with documentation) |
| Home loan home is the one you **live in** while paying rent for another property                                      | ❌                      |

If your scenario qualifies, you can claim **both HRA exemption AND Section 24(b) interest deduction** — a serious tax saving combination for middle-class buyers.

## Old vs New regime: HRA is the biggest swing factor

**Old regime**: full HRA exemption (potentially ₹2–4 lakh/year for high earners)
**New regime**: zero HRA exemption (full HRA is taxable)

Use the [Regime Compare](/calculator/regime-compare) calculator with and without HRA to see the impact. For most salaried tenants in metros, **old regime + HRA easily beats new regime**.

## Considerations

- **PAN of landlord is mandatory** for rent > ₹1 lakh/year (₹8,333/month). Without it, employer can't grant exemption — but you can still claim in ITR with self-declaration (more scrutiny risk).
- **Don't pay rent to relatives without documentation.** Rent to parents/spouse is allowed but requires bank-transfer trail and the recipient must declare it as income. Casual cash arrangements get flagged.
- **HRA from January to March** isn't lost if you forgot to declare to your employer — claim it directly in your ITR.
- **Multiple cities mid-year**: compute HRA exemption per period; the formula scales linearly.
- **WFH from a different city**: your HRA exemption is based on the city where you ACTUALLY paid rent, regardless of your office location.

## Limitations

- The calculator assumes a single rent / salary / city for the entire year. Mid-year changes need pro-rated computation.
- Doesn't model partial-year scenarios (joining mid-year, leaving mid-year, multiple cities).
- Doesn't validate documentation — landlord's PAN, rent agreement, receipts are your responsibility.
- Doesn't compute the tax saved — for that, run the [Income Tax](/calculator/income-tax) calculator with and without HRA exemption.
- Doesn't model HRA for self-employed or freelancers — they can claim rent deduction under **Section 80GG** (different rules; cap of ₹60,000/year).

## Related calculators

- **[Income Tax](/calculator/income-tax)** — total old vs new regime calculation
- **[Regime Compare](/calculator/regime-compare)** — direct old-vs-new side-by-side
- **[Salary Calculator](/calculator/salary)** — CTC to in-hand
- **[Section 80C](/calculator/section-80c)** — overall tax-saver tracker
- **[Form 16](/calculator/form-16)** — annual + monthly take-home
- **[Section 80GG](/calculator/80gg)** _(roadmap)_ — for self-employed paying rent

---

**Final note.** HRA is one of the highest-leverage tax-saving moves available to salaried tenants — and it's also the one most often miscomputed. The trap is that the **minimum-of-three formula** picks the smallest exemption; people assume they get the full HRA. **Always compute all three values and pick the smallest; don't take the lazy estimate.** This calculator does the minimum math for you so you can compare with what your HR or CA computed.
