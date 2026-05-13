## What is GST?

**Goods and Services Tax (GST)** is India's unified indirect tax. Introduced on 1 July 2017, it replaced VAT, service tax, excise duty, octroi, and a tangle of state-level taxes with a single nationwide tax structure. Every time you buy something — from a restaurant meal to a software subscription — GST is being charged somewhere in the chain.

There are five common slabs: **0%, 5%, 12%, 18%, 28%**, plus cess on luxury and "sin" goods (cars above a threshold, tobacco, soft drinks). This calculator computes GST in either direction — adding it to an exclusive amount, or backing it out of an inclusive total.

## How is GST calculated?

Two directions matter — and they're not the same math.

### Adding GST (price is exclusive of tax)

```
GST amount = price × (rate / 100)
Total = price + GST amount
```

Example: ₹10,000 + 18% GST = ₹1,800 GST + ₹11,800 total.

### Removing GST (price is inclusive of tax)

```
Base price = total / (1 + rate / 100)
GST amount = total − base price
```

Example: ₹11,800 inclusive of 18% GST → base = ₹11,800 / 1.18 = ₹10,000; GST = ₹1,800.

**Common mistake**: computing 18% of ₹11,800 directly gives ₹2,124 — which is wrong. You have to _divide_ to back-out an inclusive amount, not multiply.

## Worked example: SaaS invoice for a freelancer

You charge an Indian client ₹50,000 + GST. GST rate for IT services is 18%.

| Line item                | Amount      |
| ------------------------ | ----------- |
| Service fee              | ₹50,000     |
| CGST 9% (centre's share) | ₹4,500      |
| SGST 9% (state's share)  | ₹4,500      |
| **Total invoice**        | **₹59,000** |

You receive ₹59,000. ₹9,000 goes to the government (via you remitting it during quarterly returns). Your net income is ₹50,000.

If the client is outside your state, replace CGST + SGST with **IGST 18% = ₹9,000** (the centre collects, then shares with the destination state).

## GST slabs by common product / service

| Slab    | Examples                                                                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **0%**  | Fresh milk, fresh vegetables, books, newspapers, education up to high school, healthcare                                         |
| **5%**  | Tea, coffee, packaged paneer, life-saving drugs, economy flights, train tickets, non-AC restaurants                              |
| **12%** | Butter, ghee, cheese, processed food, mobile phones, branded apparel below ₹1,000                                                |
| **18%** | Most services (IT, consultancy, telecom, banking), soap, AC restaurants, hotels under ₹7,500/night, branded apparel above ₹1,000 |
| **28%** | Luxury cars, motorcycles, ACs, refrigerators, soft drinks, tobacco (+ additional cess)                                           |

Slabs change at every GST Council meeting. Always confirm the applicable rate for big-ticket purchases.

## CGST, SGST, IGST — which one when?

| Type of sale                                  | Tax composition                     | Example                                                             |
| --------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------- |
| **Intra-state** (same state buyer and seller) | CGST (half rate) + SGST (half rate) | Mumbai shop sells to Mumbai customer at 18%: 9% CGST + 9% SGST      |
| **Inter-state** (different state)             | IGST (full rate)                    | Bangalore seller invoices Mumbai client at 18%: 18% IGST            |
| **Import**                                    | IGST + Basic Customs Duty           | Import a laptop into India: IGST + BCD applies                      |
| **Export**                                    | Zero-rated; refundable input GST    | Indian software exporter charges 0% GST, claims refund of input GST |

The total tax to the consumer is identical (18% either way). Only the centre-state revenue split changes.

## Components and inputs explained

### Mode (exclusive vs inclusive)

- **Exclusive**: the amount you type is the base price; GST will be added on top
- **Inclusive**: the amount you type includes GST; GST will be backed out

If your supplier's quote says "₹X + GST", it's exclusive. If it says "₹X inclusive" or "₹X (all-inclusive)", it's inclusive.

### Amount

The base or total amount as per the mode.

### GST rate

Pick the applicable slab (0/5/12/18/28%) or enter a custom rate.

## Who needs to register for GST?

| Threshold                                                     | Required?                                           |
| ------------------------------------------------------------- | --------------------------------------------------- |
| Turnover > ₹40 L/year (goods) or > ₹20 L/year (services)      | Mandatory                                           |
| Special category states (Manipur, Mizoram, Nagaland, Tripura) | Threshold drops to ₹10 L (services) / ₹20 L (goods) |
| E-commerce sellers (any turnover)                             | Mandatory                                           |
| Inter-state suppliers (any turnover)                          | Mandatory                                           |
| Casual taxable persons                                        | Mandatory                                           |
| Voluntary registration                                        | Allowed (to claim input credit)                     |

Most salaried individuals and small freelancers (< ₹20 L turnover) don't need to register.

## Input Tax Credit (ITC)

If you're GST-registered:

- GST you **pay on business inputs** (laptops, office rent, software subscriptions) → claim as **input tax credit**
- GST you **collect from customers** on outputs (your services / sales) → output tax
- **You pay the government**: Output GST − Input Tax Credit

This prevents double-taxation through the supply chain. Salaried individuals can't claim ITC — the GST on your laptop / phone is a final cost.

## Considerations

- **Quote inclusive vs exclusive matters in negotiations.** A "₹1L deal" inclusive is ₹84,746 base + ₹15,254 GST; exclusive is ₹1L base + ₹18,000 GST. ₹15,254 vs ₹18,000 isn't trivial.
- **Place of supply rules** are tricky for services. Default: location of recipient. Several exceptions for events, immovable property, transportation.
- **TCS under GST** (different from income tax TCS) applies for e-commerce operators at 1% of net taxable value.
- **Reverse charge** mechanism: for some categories (legal services from unregistered lawyers, goods from unregistered suppliers), the buyer pays GST directly to the government.
- **Composition scheme** (small dealer simplified flat rate of 1-6%) is an alternative for turnover up to ₹1.5 cr — gives up ITC.

## Tax implications and filing

- **GSTR-1**: monthly outward supplies summary (by 11th of next month)
- **GSTR-3B**: monthly summary return with tax payment (by 20th of next month)
- **GSTR-9**: annual return (by 31 December of next FY)
- **GST audit (GSTR-9C)**: required for turnover > ₹5 cr

Use accounting software (Zoho Books, ClearTax, TallyPrime) to auto-generate returns; manual filing is error-prone.

## Limitations

- The calculator only handles single-rate scenarios. For invoices with mixed-rate line items, compute each line separately.
- Doesn't apply cess on luxury/sin goods (28% slab items often have an additional 1–25% cess).
- Doesn't handle reverse charge or composition scheme.
- Doesn't compute place-of-supply rules — for inter-state vs intra-state classification, refer to GST guidelines.
- Doesn't pull historical rates — slab changes after each GST Council meeting.

## Related calculators

- **[Discount Calculator](/calculator/discount)** — for sale-price + GST scenarios
- **[Sales Tax](/calculator/sales-tax)** — US-equivalent
- **[VAT Calculator](/calculator/vat)** — UK/EU-equivalent
- **[Income Tax](/calculator/income-tax)** — direct tax counterpart
- **[Brokerage / F&O](/calculator/brokerage)** — STT + GST on stock trades
- **[Stamp Duty](/calculator/stamp-duty)** — property registration

---

**Final note.** GST is the most-frequently-applied number in Indian commerce — every restaurant bill, every invoice, every online purchase. Most people get it slightly wrong on inclusive amounts (multiplying instead of dividing). **The two-second discipline that helps: always know whether the amount you're working with is base or total before doing the math.** This calculator just removes the guesswork.
