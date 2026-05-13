## What is a tip calculator?

A **tip calculator** computes the gratuity portion of a restaurant bill, plus the per-person share when splitting with friends. It's one of the most-used everyday calculators globally — and one of the most country-dependent, since tipping norms swing from "0% — already included" in much of Asia to "20% minimum or you're rude" in the US.

CalcMaster's tip calculator computes the **tip amount, total bill, and per-person split** in real time. Adjust the percentage with a slider — see all three numbers update instantly.

## How is a tip calculated?

The formula is trivial:

```
Tip amount = bill × (tip % / 100)
Total bill = bill + tip amount
Per-person = total / number of people
```

The hard part isn't the math; it's deciding what percentage to use, which depends on the country, restaurant type, service quality, and whether service charge is already pre-added.

## Tip norms by country

| Country              | Standard tip | Notes                                                                                                                      |
| -------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **India**            | 5–10%        | Service charge often pre-added (5–10% on bill); tip on top is optional but appreciated. Round up cash for delivery/auto.   |
| **United States**    | 18–22%       | Cultural minimum is 15%; 20% is normal; 25% for exceptional service. Servers paid less than minimum wage and rely on tips. |
| **Canada**           | 15–20%       | Similar to US but slightly less aggressive.                                                                                |
| **UK**               | 10–12.5%     | Often pre-added; check before paying. Pubs / counter service: no tip.                                                      |
| **EU (continental)** | 5–10%        | Round up the bill or leave a few euros. Service is generally included.                                                     |
| **Japan**            | 0%           | Tipping can be considered rude. Cash service is excellent without tips.                                                    |
| **Singapore**        | 0%           | Service charge (usually 10%) is pre-added; no additional tip expected.                                                     |
| **UAE**              | 10%          | Often included as "service charge"; tipping on top is appreciated.                                                         |
| **Australia**        | 0–10%        | Workers paid full wage; tipping is for exceptional service only.                                                           |

When unsure, look at the bill: if "service charge" is itemized, no additional tip needed.

## Worked example: dinner with friends in Mumbai

Bill: **₹2,400** (food + drinks). Service charge 10%: ₹240 added by restaurant. GST 5% on food: ₹120. Tip you want to leave: **10%** of the food bill (₹240). Split 4 ways.

| Line item                               | Amount     |
| --------------------------------------- | ---------- |
| Food + drinks                           | ₹2,400     |
| Service charge (10%)                    | ₹240       |
| GST (5%, on food only)                  | ₹120       |
| **Restaurant total**                    | **₹2,760** |
| Tip (10% on food, after service charge) | ₹240       |
| **Your total**                          | **₹3,000** |
| **Per person (4 way split)**            | **₹750**   |

Note: many people consider the **service charge as the tip** and don't add a separate gratuity. Others consider it a restaurant fee and add tip on top. Both are valid; the calculator handles either.

## Components and inputs explained

### Bill amount

The pre-tip bill — typically the subtotal shown before service charge and tax. Some users prefer to tip on the after-tax total; both are common.

### Tip percentage

The slider gives 0–25% in 1% steps. Common values:

- **0%** — Japan, Singapore, regions where service is pre-included
- **5%** — light tip, casual dining
- **10%** — standard India / UK / EU
- **15%** — Canada / good US service
- **18%** — US average
- **20%** — US excellent service / fine dining
- **25%** — exceptional / large parties

### Number of people splitting

Default 1 (you're solo). Change for group bills. The per-person amount is the total bill (with tip) ÷ N.

## Tipping non-restaurant service

| Service                           | Typical tip                                    |
| --------------------------------- | ---------------------------------------------- |
| **Food delivery (Zomato/Swiggy)** | ₹20–₹50 in India; 10–15% in US                 |
| **Auto / cab driver**             | Round up to nearest ₹10–₹50 (India); 15% in US |
| **Hotel bellhop**                 | ₹100–₹200 per bag (luxury hotels)              |
| **Housekeeping**                  | ₹100–₹200/night left in room                   |
| **Hair stylist / barber**         | 10–15% of bill                                 |
| **Spa / massage**                 | 10–15%                                         |
| **Doorman / valet**               | ₹100–₹200                                      |
| **Tour guide (private)**          | 10–15% of tour cost                            |

These aren't strict rules — they're norms. In India, people tip much less than these on average; in the US, much more.

## Should you tip on the pre-tax or after-tax amount?

In the US, most people tip on the **pre-tax subtotal** (the food/drink amount before sales tax). In India, GST is often invisible on the bill, so it's effectively the same. The math difference is small (a few rupees) — don't agonize.

For clarity in CalcMaster's calculator: tip is computed on the **input bill amount** you provide. If you want to tip on pre-tax, type the pre-tax subtotal. If after-tax, type the gross.

## Bill splitting strategies

When you're a group of friends/colleagues, four common ways to split:

1. **Equal split** — total ÷ N. Easy, but unfair if some had more drinks/food.
2. **Itemized split** — each person pays for their own + their share of shared items (appetizers, dessert). Fair but slow.
3. **Item-and-evenly split** — main course attributed to each person; tip + tax + shared items divided evenly.
4. **Apps (Splitwise, etc.)** — track shared expenses across multiple meals over weeks/months.

CalcMaster handles option 1 (equal split). For itemized splits, paper-and-pen or a dedicated app is faster.

## Considerations

- **Service charge isn't legally enforceable in India.** As of 2022, the Consumer Affairs Ministry ruled restaurants cannot force service charge. If you disagree with it, you can refuse to pay; restaurants must remove it from the bill. In practice, most people pay it.
- **Tip in cash, not card** in India and many places — cash tips reach the server directly, card tips often go through the restaurant's accounting (and may or may not reach the server).
- **Round up** — leaving ₹420 as a tip on a ₹2,395 bill is awkward. Round to ₹400 or ₹500.
- **Tip generously on small bills.** A ₹40 tip on a ₹200 chai is meaningful to the server. A ₹40 tip on ₹4,000 is insulting.
- **For exceptional poor service** — leave a small but visible tip (₹10–₹50) rather than zero. Zero can look like you forgot.

## Limitations

- The calculator handles only equal splits. For itemized, use a spreadsheet or app.
- Doesn't compute service-charge-aware tips (i.e., "tip on top of service charge" vs "treat service charge as the tip"). You decide the percentage.
- Doesn't handle tax/service-charge automatically — you input the pre-tip bill amount; the math is on that.
- Doesn't handle multi-currency (USD bill with INR tip, etc.). Use [Currency Converter](/calculator/currency-converter) first.

## Related calculators

- **[Split Bill](/calculator/split-bill)** — focused on N-person split with tip
- **[Discount Calculator](/calculator/discount)** — for sale-price math
- **[Percentage Calculator](/calculator/percentage)** — generic % operations
- **[GST Calculator](/calculator/gst)** — Indian indirect tax
- **[Sales Tax](/calculator/sales-tax)** — US-equivalent

---

**Final note.** Tipping is half math, half social custom. The math is easy; the custom is the part that travel + cultural awareness teach you. **In India, 10% is generous; in the US, 18% is the floor.** This calculator computes both. The right tip is the one that feels fair to you AND respectful of local norms.
