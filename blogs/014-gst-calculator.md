---
title: "GST calculator: inclusive ↔ exclusive in both directions"
excerpt: 'How to add GST, how to back-it-out, why "GST extra" and "GST inclusive" make different math, and the slabs that matter for everyday purchases.'
kind: calculator
category: finance
calculatorSlug: gst
tags: [gst, tax, india, invoice]
publishedAt: "2026-05-13"
---

GST — _Goods and Services Tax_ — is India's combined indirect tax. There are five common slabs: **0%, 5%, 12%, 18%, 28%**. The calculator handles all of them, in both directions.

> [Open the GST Calculator](/calculator/gst) to convert any amount.

## Two directions, two formulas

### Adding GST (price is exclusive)

You see a quote of ₹10,000 + 18% GST. The total is:

`total = price × (1 + GST/100)`

So ₹10,000 + 18% GST = **₹11,800**. (GST component: ₹1,800.)

### Removing GST (price is inclusive)

You see a final price of ₹11,800 inclusive of 18% GST. The base price is:

`base = total / (1 + GST/100)`

So ₹11,800 / 1.18 = **₹10,000**. (GST component: ₹1,800.)

The common mistake is computing 18% of ₹11,800 directly — that gives ₹2,124, which is wrong. You have to _divide_ to back-out an inclusive amount, not multiply.

## The slabs (cheat sheet for everyday items)

| Slab    | Examples                                                                                              |
| ------- | ----------------------------------------------------------------------------------------------------- |
| **0%**  | Fresh milk, fresh vegetables, books                                                                   |
| **5%**  | Tea, coffee, packaged paneer, life-saving drugs, economy flights, restaurant (non-AC)                 |
| **12%** | Butter, ghee, cheese, mobile phones, processed food                                                   |
| **18%** | Most services, software, soap, AC restaurant, hotels under ₹7,500/night, branded apparel above ₹1,000 |
| **28%** | Luxury cars, motorcycles, ACs, fridges, tobacco, soft drinks                                          |

(Slabs change every Council meeting — always confirm for tax filings.)

## CGST, SGST, IGST — which one when?

- **Intra-state sale**: tax splits equally — CGST (half) + SGST (half). 18% becomes 9% CGST + 9% SGST.
- **Inter-state sale**: the entire amount is IGST. 18% becomes 18% IGST.
- **Import**: IGST on import.

The total tax is the same. Only the routing differs (for reconciliation between central and state governments).

## Real-world examples the calculator handles

- **Adding GST to a quote** — vendor sent you ₹50,000 + GST; what's the total invoice?
- **Splitting a receipt** — your dinner receipt says ₹2,360 inclusive of 18% GST; what was the base?
- **Comparing vendors** — vendor A quotes inclusive, vendor B quotes exclusive. Normalize and compare.
- **Reverse-engineering a discounted invoice** — original ₹X, discount Y%, GST Z%, final ₹? (CalcMaster handles this chain.)

## Run yours

Open the [GST Calculator](/calculator/gst) and stop doing this math in your head wrong.
