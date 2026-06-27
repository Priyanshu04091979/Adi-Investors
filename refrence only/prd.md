# Product Requirements Document (PRD)
## Aarav Investments — Website Prototype
**Version:** 1.0.0  
**Date:** June 2026  
**Reference Site:** https://www.aaravinvestments.in/  
**Team Size:** 3 Developers  
**Build Tool:** Antigravity  

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Target Audience](#3-target-audience)
4. [Design System](#4-design-system)
5. [Site Architecture & Routes](#5-site-architecture--routes)
6. [Page-by-Page Requirements](#6-page-by-page-requirements)
   - 6.1 Home
   - 6.2 About Us
   - 6.3 Services (Overview + 10 Sub-pages)
   - 6.4 Products
   - 6.5 Calculators
   - 6.6 Contact
7. [Global Components](#7-global-components)
8. [Footer Requirements](#8-footer-requirements)
9. [Forms & Validation](#9-forms--validation)
10. [Calculators — Detailed Logic](#10-calculators--detailed-logic)
11. [Folder & File Structure](#11-folder--file-structure)
12. [Team Responsibility Matrix](#12-team-responsibility-matrix)
13. [Developer Guidelines](#13-developer-guidelines)
14. [Out of Scope (v1)](#14-out-of-scope-v1)

---

## 1. Project Overview

Aarav Investments is a financial advisory firm offering a wide range of investment and wealth management services. This project is a **frontend prototype** for their official website, built in React JS with Tailwind CSS as part of a MERN stack foundation.

The prototype will faithfully replicate the structure, services, and branding of the reference site, while incorporating:
- A modern, clean UI in deep green and gold
- Dedicated individual pages for every section
- Two interactive financial calculators with pie chart visualizations
- A contact form that submits to a backend API

---

## 2. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Accurate brand representation | Color palette, font, and tone match design system exactly |
| Full page coverage | All 17 routes render without errors |
| Calculator accuracy | Outputs match verified financial formulas |
| Responsive design | Works on 320px (mobile) → 1920px (desktop) |
| Clean handoff | Every file < 250 lines; no logic mixed with markup |
| Zero broken navigation | All internal links and dropdown routes resolve correctly |

---

## 3. Target Audience

- **Individual investors** (retail): Looking for SIP, mutual fund, and tax planning guidance
- **Corporate clients**: Seeking loan and portfolio advisory services
- **NRI investors**: Needing India-specific investment advisory
- **Retirees / near-retirees**: Interested in retirement and estate planning

---

## 4. Design System

### 4.1 Color Palette

```
Primary Dark Green   →  #012604
Primary Mid Green    →  #126009
Gold Accent          →  #EBCC5A

Supporting Tones (derived):
  Light Green Tint   →  #E8F5E9   (backgrounds, hover states)
  Gold Hover         →  #D4AE3A   (button hover)
  White              →  #FFFFFF
  Off-White          →  #F9FAFB
  Text Dark          →  #0D1F0D
  Text Muted         →  #4B5563
```

### 4.2 Typography

```
Font Family  →  "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

Heading 1    →  48px / 700 weight / line-height 1.15
Heading 2    →  36px / 700 weight / line-height 1.2
Heading 3    →  28px / 600 weight / line-height 1.3
Heading 4    →  22px / 600 weight
Body Large   →  18px / 400 weight / line-height 1.75
Body         →  16px / 400 weight / line-height 1.7
Caption      →  13px / 400 weight / color: muted
```

### 4.3 Spacing Scale (Tailwind Custom)

```
xs   →  4px
sm   →  8px
md   →  16px
lg   →  24px
xl   →  40px
2xl  →  64px
3xl  →  96px
```

### 4.4 Border Radius

```
Buttons       →  rounded-lg    (8px)
Cards         →  rounded-2xl   (16px)
Input fields  →  rounded-md    (6px)
Badges        →  rounded-full
```

### 4.5 Shadows

```
Card default   →  shadow-md
Card hover     →  shadow-xl (transition 300ms ease)
Navbar         →  shadow-sm (on scroll)
```

---

## 5. Site Architecture & Routes

```
/                          →  Home
/about                     →  About Us
/services                  →  Services Overview
/services/financial-planning           →  Financial Planning
/services/retirement-planning          →  Retirement Planning
/services/investment-management        →  Investment Management
/services/mutual-fund-sip              →  Mutual Fund & SIP Advisory
/services/tax-planning                 →  Tax Planning
/services/corporate-retail-loans       →  Corporate & Retail Loans
/services/insurance-solutions          →  Insurance Solutions
/services/nri-investment               →  NRI Investment Services
/services/portfolio-review             →  Portfolio Review & Rebalancing
/services/estate-planning              →  Estate Planning
/products                  →  Products
/calculators               →  Calculators Hub
/calculators/investment    →  Investment Calculator
/calculators/mutual-funds  →  Mutual Funds Calculator
/contact                   →  Contact Us
```

**Total routes: 18**

---

## 6. Page-by-Page Requirements

---

### 6.1 Home Page  `/`

**Purpose:** First impression, value proposition, trust signals, quick navigation to core offerings.

#### Sections (top to bottom):
1. **Hero Section**
   - Full-width banner with dark green background (`#012604`)
   - Headline: tagline about financial security/growth
   - Subheadline: 1–2 sentences about Aarav Investments
   - Two CTA buttons: `Get Started` (gold fill) and `Our Services` (outlined gold)
   - Decorative gold accent line/border element

2. **Stats Bar**
   - 3–4 key numbers (e.g., Years of Experience, Clients Served, Assets Managed, Services Offered)
   - Dark green background, gold numbers, white labels
   - Animated count-up on scroll

3. **What We Offer (Services Preview)**
   - Section title + short description
   - Grid of 4 service cards (icon, title, 1-line description, `Learn More` link)
   - Cards use off-white background with green border-left accent
   - Hover: card lifts with shadow, border goes gold

4. **Why Choose Us**
   - 3-column layout with icon + title + paragraph
   - Icons: shield (trust), chart (growth), clock (experience)
   - Light green tint background

5. **Featured Products Strip**
   - Horizontal scroll or 3-column grid of product highlight cards
   - Each card: product name, short description, `View Details` link

6. **Calculators CTA**
   - Full-width band (mid-green `#126009`)
   - Heading: "Plan Your Financial Future"
   - Two buttons: `Investment Calculator` and `Mutual Fund Calculator`

7. **Testimonials** *(static for prototype)*
   - 3 client quote cards in a flex row
   - Star rating + name + location

8. **Contact CTA Strip**
   - Dark green band
   - Headline + "Get in Touch" button (gold) → navigates to `/contact`

---

### 6.2 About Us Page  `/about`

**Purpose:** Build trust, establish credibility, introduce the firm and team.

#### Sections:
1. **Page Banner**
   - Dark green hero with page title "About Us" centered
   - Breadcrumb: Home → About Us

2. **Our Story**
   - Two-column: left = body text (history, mission, vision), right = illustrative image placeholder

3. **Mission & Vision Cards**
   - Two cards side-by-side
   - Mission card: dark green background, white text, gold icon
   - Vision card: gold background, dark green text

4. **Our Values**
   - 4-column icon grid: Integrity, Transparency, Growth, Client-First

5. **Team Section** *(static, placeholder names/photos for prototype)*
   - Team member cards: photo placeholder, name, designation, LinkedIn icon

6. **Accreditations / Certifications** *(logo placeholders)*

---

### 6.3 Services Overview Page  `/services`

**Purpose:** Central hub linking to all 10 individual service pages.

#### Sections:
1. **Page Banner** — same pattern as About Us
2. **Services Grid**
   - 5-column grid (2 rows) of service cards
   - Each card: icon, service name, 2-line description, `Explore →` link to sub-page
   - Hover: gold border, slight scale transform

#### 10 Service Sub-pages (each follows the same template):

**Template for each `/services/:slug` page:**

```
1.  Page Banner (title + breadcrumb)
2.  Hero: Short intro paragraph + relevant icon/illustration placeholder
3.  Key Benefits (3–4 bullet points with gold checkmark icons)
4.  How It Works (numbered 3-step process)
5.  Who Is This For (target audience paragraph)
6.  CTA Strip → "Talk to an Advisor" button → /contact
```

**Sub-pages and their unique content focus:**

| Route Slug | Page Title | Key Focus Points |
|---|---|---|
| `financial-planning` | Financial Planning | Goal setting, budgeting, net worth |
| `retirement-planning` | Retirement Planning | Corpus calculation, pension plans, NPS |
| `investment-management` | Investment Management | Portfolio building, asset allocation |
| `mutual-fund-sip` | Mutual Fund & SIP Advisory | Fund selection, SIP discipline, NAV |
| `tax-planning` | Tax Planning | 80C, ELSS, ITR, HRA, tax-saving instruments |
| `corporate-retail-loans` | Corporate & Retail Loans | Business loans, home loans, LAP |
| `insurance-solutions` | Insurance Solutions | Term, health, ULIP, LIC comparison |
| `nri-investment` | NRI Investment Services | FCNR, NRE/NRO, repatriation, FEMA |
| `portfolio-review` | Portfolio Review & Rebalancing | Annual review, drift correction, exit loads |
| `estate-planning` | Estate Planning | Will, nominees, succession planning |

---

### 6.4 Products Page  `/products`

**Purpose:** Showcase investable or advisory product offerings in card format.

#### Sections:
1. **Page Banner**
2. **Filter Tabs** (optional for prototype): All | Mutual Funds | Insurance | Loans | Investments
3. **Products Grid**
   - 3-column grid of product cards
   - Each card:
     - Icon/badge (category tag in gold)
     - Product name (H3, dark green)
     - 3-line description
     - Key highlight (e.g., "Returns: 12-15% p.a." or "Min. Investment: ₹500")
     - `Know More` button (outlined green, hover fills gold)

**Suggested product cards (8–10 total):**
1. Equity Mutual Funds
2. Debt Mutual Funds
3. SIP (Systematic Investment Plan)
4. Term Insurance
5. Health Insurance
6. NPS (National Pension System)
7. ELSS (Tax Saving Funds)
8. Business Loan
9. Home Loan
10. Fixed Deposits / Bonds

---

### 6.5 Calculators Page  `/calculators`

**Purpose:** Interactive tools that help users estimate investment outcomes.

#### 6.5.1 Calculators Hub  `/calculators`

- Page banner: "Financial Calculators"
- Two large card-buttons side by side:
  - Card 1: "Investment Calculator" → `/calculators/investment`
  - Card 2: "Mutual Funds Calculator" → `/calculators/mutual-funds`
- Short description on each card

---

#### 6.5.2 Investment Calculator  `/calculators/investment`

**Inputs (left column or top panel):**

| Field | Type | Range / Default |
|---|---|---|
| Invested Amount (₹) | Number Input / Slider | ₹1,000 – ₹1,00,00,000 |
| Annual Contribution (₹) | Number Input / Slider | ₹0 – ₹50,00,000 |
| Interest Rate (% p.a.) | Number Input / Slider | 1% – 30%, default 12% |
| Number of Years | Number Input / Slider | 1 – 40, default 10 |
| Compounding Frequency | Dropdown | Annually / Semi-annually / Quarterly / Monthly |

**Outputs (right column):**

| Output | Description |
|---|---|
| Total Invested Amount | Sum of principal + all annual contributions |
| Total Interest Earned | Calculated growth |
| Final Corpus | Total maturity value |
| Pie Chart | `Invested vs Returns` — two segments: gold (invested), green (returns) |

**Formula:**

```
For each year, compound the current balance and add annual contribution.

A = P × (1 + r/n)^(n×t)

Where:
  P = Principal (initial invested amount)
  r = Annual interest rate (decimal)
  n = Compounding frequency per year (1=annually, 2=semi, 4=quarterly, 12=monthly)
  t = Number of years

For annual contributions (added at start of each year):
  Use Future Value of Annuity formula:
  FV_annuity = C × [((1 + r/n)^(n×t) − 1) / (r/n)]
  Where C = annual contribution

Total Value = A + FV_annuity
```

**Chart Library:** Recharts (`PieChart`, `Pie`, `Cell`, `Legend`, `Tooltip`)  
**Pie Colors:** Gold `#EBCC5A` for Invested, Dark Green `#012604` for Returns

---

#### 6.5.3 Mutual Funds Calculator  `/calculators/mutual-funds`

**Inputs:**

| Field | Type | Options / Range |
|---|---|---|
| Investment Type | Toggle / Radio | Lump Sum / SIP |
| Investment Amount (₹) | Number Input / Slider | ₹500 – ₹1,00,00,000 |
| Expected Annual Return (%) | Number Input / Slider | 1% – 30%, default 12% |
| Investment Period (Years) | Number Input / Slider | 1 – 40, default 10 |

**Conditional behavior:**
- If **Lump Sum**: use standard compound interest
- If **SIP**: use monthly SIP formula below

**Outputs:**

| Output | Description |
|---|---|
| Invested Amount | Total money put in |
| Estimated Returns | Growth earned |
| Total Value | Final corpus |
| Pie Chart | Invested vs Returns |

**Formula:**

```
Lump Sum:
  A = P × (1 + r/100)^n
  Where r = annual return, n = years

SIP (Monthly):
  Monthly Rate  m = r / (12 × 100)
  Total Months  N = years × 12
  M (monthly investment) = Investment Amount / N  ← user enters total monthly amount
  
  FV = M × [((1 + m)^N − 1) / m] × (1 + m)
```

**Chart:** Same Recharts PieChart, same color scheme.

---

### 6.6 Contact Page  `/contact`

**Purpose:** Allow users to reach out to the firm.

#### Sections:
1. **Page Banner** — "Contact Us"
2. **Two-Column Layout:**

**Left Column — Contact Info:**
- Address block (placeholder)
- Phone number
- Email address
- Business hours
- Google Maps embed placeholder (static image with overlay)

**Right Column — Send Us a Message Form:**

| Field | Type | Validation |
|---|---|---|
| Full Name | Text input | Required, min 2 chars |
| Email Address | Email input | Required, valid format |
| Phone Number | Tel input | Optional, 10-digit |
| Subject | Text input | Required |
| Service Interest | Dropdown | All 10 services |
| Message | Textarea (6 rows) | Required, min 20 chars |
| Submit Button | Button | "Send Message" |

**On submit:**
- Show loading spinner on button
- POST to `/api/contact` backend endpoint
- On success: show green success toast "Message sent successfully!"
- On error: show red error toast "Something went wrong. Please try again."
- Clear form on success

3. **Bottom Info Cards Strip**
   - 3 cards: Visit Us / Call Us / Email Us (icons + info)

---

## 7. Global Components

### 7.1 Navbar

**Behavior:**
- Fixed/sticky on scroll
- Transparent on page top → solid `#012604` on scroll (300ms transition)
- Logo on left (text or SVG placeholder)
- Nav links: Home · About Us · Services ▾ · Products · Calculators · Contact
- Gold `Contact Us` CTA button on far right
- On mobile: hamburger menu → slide-in drawer (same links + dropdown)

**Services Dropdown (on hover/click):**
```
  Financial Planning
  Retirement Planning
  Investment Management
  Mutual Fund & SIP Advisory
  Tax Planning
  ─────────────────────────
  Corporate & Retail Loans
  Insurance Solutions
  NRI Investment Services
  Portfolio Review & Rebalancing
  Estate Planning
```

Two-column dropdown layout, green background, gold hover highlight.

---

### 7.2 Breadcrumb Component

- Used on all internal pages
- `Home > Section > Sub-section`
- Gold separator `>` character
- Last item bold white, previous items muted

---

### 7.3 Page Banner Component

Reusable across all pages:
```jsx
<PageBanner 
  title="About Us"
  subtitle="Optional subtitle text"
  breadcrumbs={['Home', 'About Us']}
/>
```

- Full-width, dark green background
- Title centered, H1
- Subtle background pattern (optional CSS pattern)

---

### 7.4 Service Card Component

```jsx
<ServiceCard
  icon={<IconComponent />}
  title="Financial Planning"
  description="Short description here"
  href="/services/financial-planning"
/>
```

---

### 7.5 Toast Notification Component

- Position: top-right
- Duration: 4 seconds auto-dismiss
- Types: success (green) / error (red) / info (gold)

---

## 8. Footer Requirements

**Layout:** 4-column grid on desktop, stacked on mobile  
**Background:** `#012604` (darkest green)  
**Text:** White / gold accents

### Column 1 — About / Brand
- Logo
- 2-3 sentence company description
- Social icons: LinkedIn, Facebook, Instagram, X (Twitter)

### Column 2 — Quick Links
```
Home
About Us
Products
Calculators
Contact Us
```

### Column 3 — Our Services
```
Financial Planning
Retirement Planning
Investment Management
Mutual Fund & SIP Advisory
Tax Planning
Corporate & Retail Loans
Insurance Solutions
NRI Investment Services
Portfolio Review & Rebalancing
Estate Planning
```

### Column 4 — Contact Info
```
📍  [Address Placeholder]
    Ahmedabad, Gujarat, India

📞  +91 XXXXX XXXXX

✉️  info@aaravinvestments.in

🕐  Mon – Sat: 9:00 AM – 6:00 PM
```

### Bottom Bar
- Full-width divider line (gold, 0.5px opacity)
- Left: © 2026 Aarav Investments. All rights reserved.
- Right: Privacy Policy · Terms of Use
- Center/right on mobile

---

## 9. Forms & Validation

All form fields use:
- Green border on focus (`#126009`)
- Red border + helper text on error
- Smooth transition: `transition-all duration-200`
- Disabled state styling on submit button while loading

---

## 10. Calculators — Detailed Logic

See Section 6.5 for full formulas.

**Additional UX requirements for both calculators:**
- All sliders and inputs are **two-way synced** — dragging slider updates input field and vice versa
- Results update **in real-time** (no submit button needed)
- Pie chart animates in on first render (`isAnimationActive={true}`)
- Currency formatted as `₹ X,XX,XXX` (Indian number system)
- A clear "Reset" button restores all fields to defaults
- On mobile: inputs stack above chart

---

## 11. Folder & File Structure

```
aarav-investments/
│
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   └── src/
│       ├── assets/                  # Images, SVGs, icons
│       │   ├── logo.svg
│       │   └── images/
│       │
│       ├── components/              # Reusable UI components (dumb)
│       │   ├── Navbar/
│       │   │   ├── Navbar.jsx
│       │   │   └── ServicesDropdown.jsx
│       │   ├── Footer/
│       │   │   └── Footer.jsx
│       │   ├── PageBanner/
│       │   │   └── PageBanner.jsx
│       │   ├── ServiceCard/
│       │   │   └── ServiceCard.jsx
│       │   ├── ProductCard/
│       │   │   └── ProductCard.jsx
│       │   ├── Toast/
│       │   │   └── Toast.jsx
│       │   ├── Breadcrumb/
│       │   │   └── Breadcrumb.jsx
│       │   └── Loader/
│       │       └── Loader.jsx
│       │
│       ├── pages/                   # Page-level components (one per route)
│       │   ├── Home/
│       │   │   └── Home.jsx
│       │   ├── About/
│       │   │   └── About.jsx
│       │   ├── Services/
│       │   │   ├── ServicesOverview.jsx       # /services
│       │   │   ├── FinancialPlanning.jsx      # /services/financial-planning
│       │   │   ├── RetirementPlanning.jsx
│       │   │   ├── InvestmentManagement.jsx
│       │   │   ├── MutualFundSIP.jsx
│       │   │   ├── TaxPlanning.jsx
│       │   │   ├── CorporateLoans.jsx
│       │   │   ├── InsuranceSolutions.jsx
│       │   │   ├── NRIInvestment.jsx
│       │   │   ├── PortfolioReview.jsx
│       │   │   └── EstatePlanning.jsx
│       │   ├── Products/
│       │   │   └── Products.jsx
│       │   ├── Calculators/
│       │   │   ├── CalculatorsHub.jsx         # /calculators
│       │   │   ├── InvestmentCalculator.jsx   # /calculators/investment
│       │   │   └── MutualFundCalculator.jsx   # /calculators/mutual-funds
│       │   └── Contact/
│       │       └── Contact.jsx
│       │
│       ├── constants/               # Static data, config
│       │   ├── colors.js            # Design tokens
│       │   ├── routes.js            # All route paths
│       │   ├── services.js          # Services data (name, slug, description, icon)
│       │   └── products.js          # Products data
│       │
│       ├── hooks/                   # Custom React hooks
│       │   ├── useScrollNavbar.js   # Detects scroll for navbar bg
│       │   └── useToast.js          # Toast state management
│       │
│       ├── utils/                   # Pure utility functions
│       │   ├── calculatorUtils.js   # All financial formulas
│       │   └── formatCurrency.js    # ₹ Indian number formatting
│       │
│       ├── context/                 # React Context (if needed)
│       │   └── ToastContext.jsx
│       │
│       ├── App.jsx                  # Root: Router + all routes
│       ├── index.jsx                # Entry point
│       └── index.css                # Tailwind directives + custom CSS vars
│
├── server/                          # Express Backend (MERN)
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js     # Handle contact form logic
│   ├── models/
│   │   └── Contact.js               # Mongoose schema for contact submissions
│   ├── routes/
│   │   └── contactRoutes.js         # POST /api/contact
│   ├── middleware/
│   │   └── errorHandler.js          # Global error middleware
│   ├── server.js                    # Express app entry
│   ├── package.json
│   └── .env                         # MONGO_URI, PORT
│
├── package.json                     # Root-level (optional monorepo)
└── README.md
```

---

## 12. Team Responsibility Matrix

| Area | Developer 1 | Developer 2 | Developer 3 |
|---|---|---|---|
| **Role** | Frontend – Pages | Frontend – Features | Backend + Integration |
| **Navbar & Footer** | ✅ |  |  |
| **Home Page** | ✅ |  |  |
| **About Us Page** | ✅ |  |  |
| **Services Overview** | ✅ |  |  |
| **All 10 Service Sub-pages** | ✅ |  |  |
| **Products Page** |  | ✅ |  |
| **Investment Calculator** |  | ✅ |  |
| **Mutual Funds Calculator** |  | ✅ |  |
| **Contact Page** |  | ✅ |  |
| **Toast / Loader Components** |  | ✅ |  |
| **Express Server Setup** |  |  | ✅ |
| **MongoDB / Contact Model** |  |  | ✅ |
| **Contact API Route** |  |  | ✅ |
| **Environment Config** |  |  | ✅ |
| **Deployment / README** |  |  | ✅ |

---

## 13. Developer Guidelines

### Code Quality
- **Max file length:** 250 lines. Split into sub-components if exceeded.
- **No inline styles.** Use Tailwind classes or `index.css` custom properties.
- **No logic in JSX return.** Move calculations, conditionals, and map logic into named variables above the return statement.
- **Named exports** for all components; default export only for pages.
- **Prop types** or JSDoc comments for every component prop.

### Naming Conventions
```
Components    →  PascalCase      (ServiceCard.jsx)
Hooks         →  camelCase       (useScrollNavbar.js)
Utilities     →  camelCase       (formatCurrency.js)
Constants     →  UPPER_SNAKE     (ROUTES.HOME)
CSS classes   →  Tailwind only (no custom class names unless unavoidable)
```

### Git Workflow
```
Branch naming:
  feature/navbar
  feature/calculators
  feature/contact-api
  fix/pie-chart-resize

Commit format:
  feat: add investment calculator with pie chart
  fix: correct SIP formula edge case at year=1
  style: adjust footer column spacing on mobile
```

### Do Not Cross
- Dev 1 does not modify `Calculators/` or `Contact/` pages
- Dev 2 does not modify `Services/` or `About/` pages  
- Dev 3 does not modify any `src/pages/` files
- Shared components in `src/components/` require a PR review from at least one other developer before merging

---

## 14. Out of Scope (v1)

The following features are explicitly **not** required in this prototype:

- User authentication / login
- CMS or admin dashboard
- Blog / news section
- Live stock or NAV data feeds
- WhatsApp / chatbot integration
- Payment gateway
- Multi-language support
- Dark mode toggle
- SEO meta tags (beyond basic `<title>`)
- Analytics integration

---

*End of PRD v1.0.0 — Aarav Investments Prototype*
