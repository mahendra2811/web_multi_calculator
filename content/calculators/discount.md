## What is a discount?

A **discount** is a price reduction from the original (or "list" or "MRP") price. Retailers use discounts to clear inventory, drive seasonal demand, reward loyalty, or compete with rivals. Shoppers use discount math to figure out **how much they're actually saving** vs the original or alternative price.

The "actually" is doing a lot of work in that sentence. Stacked discounts, MRP gaming, and bank-card cashbacks make the headline savings often very different from the real savings.

## How is a discount calculated?

For a single discount:

```
Savings = original × (discount % / 100)
Final price = original − savings = original × (1 − discount %/100)
```

For multiple stacked discounts (this is where most people get it wrong):

```
Final price = original × (1 − d₁/100) × (1 − d₂/100) × … × (1 − dₙ/100)
Effective discount % = (1 − Final / Original) × 100
```

Note: percentage discounts **multiply**, not add. A "70% off + extra 20% off" deal is not 90% off.

## Worked example: stacked discounts

Original price: **₹2,000**. Two sequential discounts: 70%, then an "extra" 20% on the discounted price.

| Step                   | Calculation                 | Price             |
| ---------------------- | --------------------------- | ----------------- |
| Start                  | —                           | ₹2,000            |
| 70% off                | 2,000 × 0.30                | ₹600              |
| +20% off               | 600 × 0.80                  | ₹480              |
| **Final**              | —                           | **₹480**          |
| **Effective discount** | (2,000 − 480) / 2,000 × 100 | **76%** (not 90%) |

The second 20% applied to the _already-discounted_ ₹600, not the original ₹2,000. The "90% off" intuition is wrong by 14 percentage points — or ₹280 in savings you thought you were getting.

## Stacked discount cheat sheet

| Stacked      | Naive math   | Actual effective |
| ------------ | ------------ | ---------------- |
| 50 + 50      | 100% (free!) | 75%              |
| 70 + 20      | 90%          | 76%              |
| 30 + 30 + 10 | 70%          | 56%              |
| 50 + 30 + 20 | 100%         | 72%              |
| 80 + 80      | 160% (?!)    | 96%              |
| 90 + 90      | 180% (?!)    | 99%              |

Two 50% discounts don't make the item free — they leave it at 25% of the original. Two 90% discounts don't refund you 80% — they leave 1% of the original.

## The MRP gaming trick

Indian retail loves the MRP-based discount. A T-shirt with MRP ₹2,499 sold for ₹999 looks like a 60% discount. But:

- MRP is _maximum_ retail price — manufacturers can print anything
- Many brands print artificially high MRPs to make every sale look steep
- The "true" price for that T-shirt may have been ₹999 the whole time on Amazon and Myntra

**The fix**: ignore the MRP. Compare across 3 sellers (Amazon, Flipkart, Myntra, the brand's own site). Whichever is lowest is the real price; the "discount" off MRP is theatre.

## Worked example: bank offers + sale

Original price: **₹50,000** (laptop). Stacked deals:

| Offer          | What it does               |
| -------------- | -------------------------- |
| Festive sale   | 20% off list               |
| HDFC card      | Extra 10% off (max ₹3,000) |
| EMI conversion | 5% cashback (paid later)   |

Math:

- After 20% off: ₹50,000 × 0.80 = ₹40,000
- After 10% off (capped ₹3,000): ₹40,000 − min(4,000, 3,000) = ₹37,000
- 5% cashback on EMI: ₹37,000 × 0.05 = ₹1,850 (credited later)
- **Net effective price**: ₹37,000 − ₹1,850 = **₹35,150**
- **Effective discount**: (50,000 − 35,150) / 50,000 × 100 = **29.7%**

A "20 + 10 + 5" stack didn't give you 35%; it gave you 29.7%. _Still good, just not what the banner said._

## Components and inputs explained

### Original price

The pre-discount price you're starting from. For MRP claims, sanity-check against 2–3 alternative sellers first.

### Discount amount or percentage

Type either a percentage (20%) or absolute (₹500 off). Most retail discounts are percentage-based; some flat-amount.

### Stacking

For stacked offers, add each discount as a separate item. CalcMaster handles the multiplicative math automatically.

### GST handling

If the original price is GST-inclusive (most retail), apply discount first, then derive base + GST. If exclusive (B2B), apply discount on base, then add GST.

## Common types

| Type                       | What it means                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------- |
| **Percentage off**         | Most common. Multiplicative when stacked.                                             |
| **Flat amount off**        | "₹500 off". Subtract directly. Additive when stacked.                                 |
| **BOGO (buy one get one)** | Effectively 50% off if items are identical. Less if you only wanted one.              |
| **Buy X get Y free**       | Effective discount = Y / (X + Y) × 100. Buy-2-get-1 = 33% off.                        |
| **Coupon code**            | Single-use; check minimum order value and exclusions.                                 |
| **Bank card offer**        | Percentage with cap. "10% up to ₹500" means at ₹5,000+ purchase it's a flat ₹500 off. |
| **Cashback**               | Paid back later; reduces effective price but not displayed price.                     |
| **Tier discount**          | Bigger order = larger discount. Common in B2B.                                        |

## When the discount is real

Genuine discount triggers (worth jumping on):

- **End-of-season clearance** (Dec–Jan, Mar): clearing physical inventory, deepest cuts
- **Festive sales** (Big Billion, Great Indian, Diwali): real discounts on electronics, often theatrical on apparel
- **Launch-window bank stacks**: card + festival + cashback combine to real 25–35% off premium items
- **Pre-launch / pre-order**: discounts on phones, laptops in the week before official sale

When the discount is theatre:

- **"Always on sale"** items (mid-tier fashion, jewellery) — the "discounted" price is the regular price
- **"Limited time"** with no deadline shown
- **Coupon-locked products** (you have to use a code) — usually the code is unlocked permanently
- **MRP-based discounts** for products where MRP isn't enforced (anything online)

## Considerations

- **Compare total cost, not discount %.** A 50% discount on a ₹3,000 product is worse than a 20% discount on a ₹1,000 alternative.
- **Bank-offer caps trip you.** "10% off up to ₹500" maxes out at ₹5,000 purchase. Bigger orders get the same flat ₹500.
- **Coupon stacking rules.** Most sites allow one coupon per order. Read the T&Cs.
- **Cashback timing.** "Get ₹500 cashback in 30 days" is worth less than ₹500 off today, especially if you forget to redeem.
- **Return policy matters.** A 70% off non-returnable item is worse than a 40% off easy-return.

## Limitations

- The calculator doesn't model bank-offer caps automatically — type the actual cash discount applied.
- Doesn't account for cashback (delayed credit) vs immediate discount.
- Doesn't handle subscription-discount complexity (e.g. Prime member rate).
- Doesn't compute "amortized" discount over a multi-year purchase (free maintenance for 2 years).
- Doesn't model gift-with-purchase value (which is usually less than the markup).

## Related calculators

- **[Percentage Calculator](/calculator/percentage)** — for the underlying math
- **[GST Calculator](/calculator/gst)** — inclusive/exclusive price handling
- **[Sales Tax](/calculator/sales-tax)** — US-equivalent
- **[VAT](/calculator/vat)** — UK/EU-equivalent
- **[Margin / Markup](/calculator/margin-markup)** — from the seller's side

---

**Final note.** Retailers know shoppers are bad at stacked-percentage math. The single discipline that makes you a better shopper: **before you check out, compute the actual final price and compare it to the same item on two other sites**. If your "76% off" item is still ₹200 more expensive than an alternative seller's "40% off" version, the bigger discount isn't actually the better deal.
