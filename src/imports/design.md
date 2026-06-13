# LocalMart — Design System & Brand Identity

> A hyperlocal marketplace platform connecting neighbourhood shops with everyday buyers.
> Three surfaces: Buyer App · Merchant App · Admin Dashboard.

---

## 1. Brand Positioning

LocalMart sits at the intersection of **speed** (like Zepto/Blinkit) and **community trust** (like a familiar local bazaar). The visual identity must feel:

- **Premium but approachable** — not sterile like a fintech, not chaotic like a classifieds site
- **Instantly recognisable** — one glance, one colour, burned into memory
- **Locally grounded** — warm, tactile, real — not a generic SaaS product

### Competitive Colour Reference

| Brand | Primary | Why it works |
|---|---|---|
| Zepto | `#8025EF` Purple | Bold, disruptive, premium urgency |
| Zomato | `#E23744` Red | Appetite, energy, instant recognition |
| Swiggy | `#FC8019` Orange | Warmth, food, approachable speed |
| Blinkit | `#F8C200` Yellow | Flash, brightness, lightning delivery |
| Instamart | `#12945F` Green | Freshness, grocery, trust |

**Gap in the market:** No major Indian quick-commerce brand owns a deep, rich **Teal-Indigo** — confident, modern, local, and entirely ownable.

---

## 2. Recommended Colour Scheme — **"Bazaar Teal"** ✦ BEST PICK

> This is the primary recommendation. Deep teal as the anchor gives LocalMart a distinct shelf position while communicating freshness, reliability, and forward motion.

### Palette

```
Brand Primary    #0A7C6E   Deep Bazaar Teal
Brand Accent     #FF6B35   Warm Saffron Orange
Success          #22C55E   Fresh Green
Warning          #F59E0B   Amber
Error            #EF4444   Red
Neutral 900      #111827   Near Black (text)
Neutral 600      #4B5563   Secondary text
Neutral 300      #D1D5DB   Borders
Neutral 100      #F3F4F6   Card backgrounds
Surface          #F7F8FA   App background
White            #FFFFFF   Panels, cards
```

### Usage Rules

- **Primary `#0A7C6E`** — all CTAs, active nav, primary buttons, links, progress bars
- **Accent `#FF6B35`** — promotional badges, "Order Now" bursts, cart icon dot, special offers
- **Surface `#F7F8FA`** — app and web background (never pure white at root level)
- **Neutral 900 `#111827`** — all heading text
- **Neutral 600 `#4B5563`** — body copy, labels, descriptions

### Why This Wins

The deep teal `#0A7C6E` is rare in Indian consumer apps — it reads as trustworthy (like a bank) but organic (like fresh produce). The saffron orange `#FF6B35` is the cultural call-to-action colour of Indian street markets. Together they create a palette that is globally modern and locally resonant. No one else owns this space.

---

## 3. Alternative Colour Schemes

### Option B — "Mango Rush" 🟠

A bold, energetic identity that competes directly with Swiggy in warmth but differentiates through deeper saturation.

```
Brand Primary    #E8500A   Deep Mango Orange
Brand Accent     #1A1A2E   Midnight Navy
Highlight        #FFD166   Turmeric Yellow
Surface          #FFF8F4   Warm Ivory
Neutral 900      #1A1A2E
```

**Best for:** If speed and appetite are the primary emotional triggers. Feels closest to Swiggy but more premium (deeper, less neon).

---

### Option C — "Indigo Local" 🟣

A premium, tech-forward identity that positions LocalMart as a sophisticated platform — closer to Zepto's energy.

```
Brand Primary    #4F3CC9   Deep Indigo
Brand Accent     #F7C948   Saffron Gold
Surface          #F5F4FF   Lavender White
Neutral 900      #1C1B2E
Highlight        #E8F5E9   Mint tint for grocery sections
```

**Best for:** Urban tech-savvy audience, premium positioning, standing out in category listings.

---

### Option D — "Neem Green" 🌿

Earthy and organic. Closest to Instamart but more premium through deeper saturation and pairing.

```
Brand Primary    #1B6B45   Forest Neem Green
Brand Accent     #FF9F1C   Harvest Orange
Surface          #F6FAF7   Soft Mint White
Neutral 900      #0D1F14
```

**Best for:** Grocery-heavy inventory, older demographic, trust-first positioning.

---

## 4. Typography System

### Recommended Pairing

```
Display / Headings  —  "Plus Jakarta Sans"  (Bold 700, SemiBold 600)
Body / UI           —  "Inter"              (Regular 400, Medium 500)
Data / Numbers      —  "Inter"              (Tabular numerals, Medium 500)
```

**Why Plus Jakarta Sans:** It has a slightly geometric warmth that DM Sans lacks at large sizes. Its counters feel open and readable on mobile screens. The bold weight has personality without being decorative.

### Type Scale (Mobile-first)

| Role | Size | Weight | Line Height |
|---|---|---|---|
| Hero heading | 28px | 700 | 1.2 |
| Section heading | 22px | 600 | 1.3 |
| Card title | 17px | 600 | 1.4 |
| Body | 15px | 400 | 1.6 |
| Label / Caption | 13px | 500 | 1.4 |
| Micro / Badge | 11px | 600 | 1.2 |

### Web / Admin Scale

| Role | Size | Weight |
|---|---|---|
| Page title | 32px | 700 |
| Section H2 | 24px | 600 |
| Card H3 | 18px | 600 |
| Body | 15px | 400 |
| Table cell | 14px | 400 |
| Badge / Tag | 12px | 600 |

---

## 5. Spacing & Layout Grid

```
Base unit       4px
Component gap   8px   (tight)  / 12px (default) / 16px (loose)
Section gap     24px (mobile)  / 40px (web)
Page padding    16px (mobile)  / 24px (tablet)  / 32px+ (web)
Card padding    16px (mobile)  / 20px (web)
Max content width   1200px (admin web)
```

---

## 6. Border Radius

```
Micro (badge, tag)   6px
Button               10px
Input field          10px
Card                 14px
Modal / Sheet        20px (top only for bottom sheets)
Avatar               9999px (full circle)
Image container      10px
```

---

## 7. Elevation & Shadow System

Avoid heavy box-shadows. Use subtle layering instead:

```css
--shadow-sm:   0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
--shadow-md:   0 4px 12px rgba(0,0,0,0.08);
--shadow-lg:   0 12px 32px rgba(0,0,0,0.10);
--shadow-card: 0 2px 8px rgba(10,124,110,0.08);   /* teal-tinted */
```

Cards at rest use only a 1px border `#E5E7EB`. Shadow appears only on hover or interactive state.

---

## 8. Component Specifications

### Primary Button
```
Background:    #0A7C6E
Text:          #FFFFFF  (600 weight)
Padding:       14px 24px
Radius:        10px
Hover:         #096358  (darken 8%)
Active:        scale(0.98) + darken 12%
Disabled:      #D1D5DB bg, #9CA3AF text
```

### Secondary / Ghost Button
```
Background:    transparent
Border:        1.5px solid #0A7C6E
Text:          #0A7C6E
Hover:         #F0FAF8 bg (teal-tinted light)
```

### Accent / CTA Button (Offers, Cart)
```
Background:    #FF6B35
Text:          #FFFFFF
Used for:      "Add to cart", "Checkout", promotional actions
```

### Input Fields
```
Background:    #FFFFFF
Border:        1.5px solid #D1D5DB
Border (focus): 2px solid #0A7C6E
Radius:        10px
Padding:       12px 14px
Label:         13px Medium, #4B5563
Placeholder:   #9CA3AF
```

### Status Badges

| State | Background | Text | Usage |
|---|---|---|---|
| Open | `#D1FAE5` | `#065F46` | Shop open |
| Closed | `#F3F4F6` | `#6B7280` | Shop closed |
| Pending | `#FEF3C7` | `#92400E` | Order pending |
| Delivered | `#D1FAE5` | `#065F46` | Order delivered |
| Cancelled | `#FEE2E2` | `#991B1B` | Order cancelled |
| Low Stock | `#FEF3C7` | `#B45309` | Inventory warning |
| Out of Stock | `#FEE2E2` | `#B91C1C` | No inventory |

---

## 9. Navigation Patterns

### Buyer App — Bottom Navigation
```
5 items max: Home · Shops · Orders · Offers · Profile
Active state:  Icon + label in #0A7C6E, background pill #E6F4F2
Inactive:      #9CA3AF icon and label
Height:        60px + safe area
```

### Merchant App — Bottom Navigation
```
4 items: Dashboard · Orders · Products · Profile
Active: #0A7C6E teal
New order notification dot: #FF6B35 accent
```

### Admin Dashboard — Left Sidebar
```
Width:         240px (expanded) / 64px (collapsed)
Active item:   #0A7C6E text + left 3px accent bar + #F0FAF8 bg
Hover:         #F3F4F6 bg
Section label: 11px uppercase tracking, #9CA3AF
```

---

## 10. Iconography

- **Style:** Rounded stroke icons, 1.5–2px stroke weight (Phosphor Icons or Lucide)
- **Size:** 20px in nav, 18px in lists, 16px inline
- **Category icons in buyer app:** Use emojis at 24–28px for shop type indicators (high recognition, zero loading time)
- **Never:** Mix filled and outline icon styles within the same surface

---

## 11. Imagery Guidelines

- Use warm, realistic photography of actual neighbourhood shops and fresh produce
- Avoid overly staged stock photography — candid local-market shots preferred
- Image aspect ratios: Shop cards `16:9`, Product cards `1:1`, Hero banners `2:1`
- Apply a subtle overlay `rgba(0,0,0,0.15)` on hero images where text sits on top
- All image containers: `border-radius: 10px`, `object-fit: cover`

---

## 12. Micro-interactions

```
Button press      scale(0.97), transition 100ms ease
Card hover        translateY(-2px) + shadow-md, 150ms ease
Add to cart       ★ Bounce icon animation (scale 1.0 → 1.3 → 1.0), 200ms
Nav active        Slide indicator + fade label, 150ms
Page transition   Fade + translateY(8px), 200ms ease-out
```

---

## 13. Dark Mode Tokens (Optional / Future)

```
Surface          #0F1923
Card             #1A2533
Border           #2D3A47
Text primary     #F1F5F9
Text secondary   #94A3B8
Brand primary    #0FB89C   (lightened teal for dark bg contrast)
Brand accent     #FF7A47
```

---

## 14. The Signature Element

> **Every LocalMart screen should feel like walking into a well-lit, well-organised neighbourhood store.**

The single most memorable visual signature: **a teal-to-midnight gradient shop card header** with the shop category emoji floating large and slightly off-canvas to the right. This creates a distinct, ownable card style that looks nothing like a generic e-commerce grid — it reads as a destination, not a product listing.

```
Shop card header gradient:
  background: linear-gradient(135deg, #0A7C6E 0%, #064E3B 100%);
  Category emoji: 64px, opacity 0.25, position: absolute right -8px top -8px, rotate(-12deg)
  Shop name: white, Plus Jakarta Sans 600, 17px
  Rating pill: #FF6B35 background, white text
```

---

## 15. Quick Token Summary

```css
/* Paste into :root */
--color-brand:        #0A7C6E;
--color-brand-dark:   #064E3B;
--color-brand-light:  #E6F4F2;
--color-accent:       #FF6B35;
--color-accent-light: #FFF0EB;
--color-surface:      #F7F8FA;
--color-card:         #FFFFFF;
--color-border:       #E5E7EB;
--color-text-primary: #111827;
--color-text-secondary: #4B5563;
--color-text-muted:   #9CA3AF;
--color-success:      #22C55E;
--color-warning:      #F59E0B;
--color-error:        #EF4444;

--radius-sm:  6px;
--radius-md:  10px;
--radius-lg:  14px;
--radius-xl:  20px;

--font-display: 'Plus Jakarta Sans', sans-serif;
--font-body:    'Inter', sans-serif;
```

---

*Document version 1.0 — LocalMart Design System*
*Last updated: June 2026*
