# Tech Stack — Aarav Investments Website Prototype
**Version:** 1.0.0  
**Date:** June 2026  
**Stack:** MERN (MongoDB · Express · React · Node.js)  
**CSS Framework:** Tailwind CSS  

---

## Table of Contents
1. [Stack Overview](#1-stack-overview)
2. [Frontend](#2-frontend)
3. [Backend](#3-backend)
4. [Database](#4-database)
5. [Package List](#5-package-list)
6. [Tailwind Configuration](#6-tailwind-configuration)
7. [Environment Variables](#7-environment-variables)
8. [Project Setup — Step by Step](#8-project-setup--step-by-step)
9. [Scripts Reference](#9-scripts-reference)
10. [Code Snippets & Config Files](#10-code-snippets--config-files)

---

## 1. Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER (Client)                       │
│  React 18  ·  React Router v6  ·  Tailwind CSS  ·  Recharts│
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP / REST
┌──────────────────────────▼──────────────────────────────────┐
│                  EXPRESS.JS SERVER (API)                     │
│  Node.js 20+  ·  Express 4  ·  CORS  ·  dotenv             │
└──────────────────────────┬──────────────────────────────────┘
                           │ Mongoose ODM
┌──────────────────────────▼──────────────────────────────────┐
│                      MONGODB ATLAS                          │
│  Collection: contacts  (contact form submissions)           │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend

### 2.1 Core Framework

| Technology | Version | Purpose |
|---|---|---|
| **React** | ^18.3.0 | UI library |
| **React DOM** | ^18.3.0 | DOM rendering |
| **React Router DOM** | ^6.24.0 | Client-side routing |

### 2.2 Styling

| Technology | Version | Purpose |
|---|---|---|
| **Tailwind CSS** | ^3.4.0 | Utility-first CSS framework |
| **PostCSS** | ^8.4.0 | CSS processing (required by Tailwind) |
| **Autoprefixer** | ^10.4.0 | Vendor prefix handling |

### 2.3 UI & Data Visualization

| Package | Version | Purpose |
|---|---|---|
| **Recharts** | ^2.12.0 | Pie charts in calculators |
| **Lucide React** | ^0.400.0 | Icon library (clean SVG icons) |

### 2.4 Utilities

| Package | Version | Purpose |
|---|---|---|
| **Axios** | ^1.7.0 | HTTP client for contact form API |
| **React Hot Toast** | ^2.4.1 | Toast notifications |

### 2.5 Build Tool

| Technology | Version | Purpose |
|---|---|---|
| **Vite** | ^5.3.0 | Dev server + production bundler |

> **Why Vite over CRA?**  
> Vite offers dramatically faster cold starts (< 500ms vs ~30s for CRA) and HMR. Much better DX for a 3-person team working on isolated components.

---

## 3. Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 20 LTS | JavaScript runtime |
| **Express** | ^4.19.0 | HTTP server framework |
| **Mongoose** | ^8.4.0 | MongoDB ODM |
| **CORS** | ^2.8.5 | Allow frontend to call backend API |
| **dotenv** | ^16.4.0 | Load environment variables from `.env` |
| **express-validator** | ^7.1.0 | Server-side form validation |
| **Nodemon** | ^3.1.0 | Auto-restart server on file changes (dev) |

---

## 4. Database

| Technology | Details |
|---|---|
| **MongoDB Atlas** | Free M0 cluster (sufficient for prototype) |
| **Collection** | `contacts` — stores contact form submissions |
| **ODM** | Mongoose (schema validation, connection pooling) |

**Contact Schema fields:**
```
name         String   required
email        String   required
phone        String   optional
subject      String   required
service      String   optional (which service they're interested in)
message      String   required
createdAt    Date     auto (timestamps: true)
```

---

## 5. Package List

### 5.1 `client/package.json`

```json
{
  "name": "aarav-investments-client",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx"
  },
  "dependencies": {
    "axios": "^1.7.2",
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.1",
    "react-router-dom": "^6.24.0",
    "recharts": "^2.12.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1"
  }
}
```

### 5.2 `server/package.json`

```json
{
  "name": "aarav-investments-server",
  "version": "1.0.0",
  "private": true,
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-validator": "^7.1.0",
    "mongoose": "^8.4.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

---

## 6. Tailwind Configuration

### `client/tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // ── Color Palette ──────────────────────────────────────
      colors: {
        green: {
          950: "#012604",    // Primary Dark Green (navbar, hero, footer)
          700: "#126009",    // Primary Mid Green (buttons, accents)
          100: "#E8F5E9",    // Light tint (section backgrounds, hover)
        },
        gold: {
          400: "#EBCC5A",    // Primary Gold (accent, CTA, highlights)
          600: "#D4AE3A",    // Gold hover state
        },
        // Text
        ink: {
          dark:  "#0D1F0D",  // Primary body text on light backgrounds
          muted: "#4B5563",  // Secondary / caption text
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        // SF Pro → system font stack (no import required on Apple devices)
        sans: [
          '"SF Pro Display"',
          '"SF Pro Text"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },

      fontSize: {
        "h1":      ["3rem",    { lineHeight: "1.15", fontWeight: "700" }],
        "h2":      ["2.25rem", { lineHeight: "1.2",  fontWeight: "700" }],
        "h3":      ["1.75rem", { lineHeight: "1.3",  fontWeight: "600" }],
        "h4":      ["1.375rem",{ lineHeight: "1.4",  fontWeight: "600" }],
        "body-lg": ["1.125rem",{ lineHeight: "1.75" }],
        "body":    ["1rem",    { lineHeight: "1.7"  }],
        "caption": ["0.8125rem", { lineHeight: "1.5" }],
      },

      // ── Spacing ────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },

      // ── Border Radius ──────────────────────────────────────
      borderRadius: {
        "card": "1rem",     // 16px — product/service cards
      },

      // ── Box Shadows ────────────────────────────────────────
      boxShadow: {
        "card":       "0 4px 20px rgba(1, 38, 4, 0.08)",
        "card-hover": "0 10px 40px rgba(1, 38, 4, 0.16)",
        "navbar":     "0 2px 12px rgba(1, 38, 4, 0.10)",
      },

      // ── Transitions ────────────────────────────────────────
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
    },
  },
  plugins: [],
};
```

### `client/postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `client/src/index.css`

```css
/* Tailwind base layers */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Custom Properties ────────────────────────────── */
:root {
  --color-green-950: #012604;
  --color-green-700: #126009;
  --color-green-100: #E8F5E9;
  --color-gold-400:  #EBCC5A;
  --color-gold-600:  #D4AE3A;
}

/* ── Base Resets ──────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "SF Pro Display", "SF Pro Text", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #0D1F0D;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

/* ── Reusable Tailwind Component Shortcuts ────────────── */
@layer components {
  /* Primary CTA button — gold fill */
  .btn-primary {
    @apply bg-gold-400 hover:bg-gold-600 text-green-950
           font-semibold px-6 py-3 rounded-lg
           transition-colors duration-250 cursor-pointer;
  }

  /* Secondary button — green outline */
  .btn-outline {
    @apply border-2 border-green-700 text-green-700
           hover:bg-green-700 hover:text-white
           font-semibold px-6 py-3 rounded-lg
           transition-all duration-250 cursor-pointer;
  }

  /* Ghost button — gold outline for dark backgrounds */
  .btn-ghost-gold {
    @apply border-2 border-gold-400 text-gold-400
           hover:bg-gold-400 hover:text-green-950
           font-semibold px-6 py-3 rounded-lg
           transition-all duration-250 cursor-pointer;
  }

  /* Standard section padding */
  .section-pad {
    @apply py-16 px-4 md:px-8 lg:px-16 xl:px-24;
  }

  /* Section heading style */
  .section-title {
    @apply text-h2 text-green-950 font-bold mb-3;
  }

  /* Gold underline accent under headings */
  .section-title-accent::after {
    content: '';
    @apply block w-16 h-1 bg-gold-400 mt-3 rounded-full;
  }

  /* Service/Product card base */
  .card {
    @apply bg-white rounded-card shadow-card
           hover:shadow-card-hover hover:-translate-y-1
           transition-all duration-350 p-6;
  }
}
```

---

## 7. Environment Variables

### `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000
```

> In production, update to your deployed server URL.

### `server/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/aarav-investments?retryWrites=true&w=majority
NODE_ENV=development
```

> **Never commit `.env` files.** Both should be listed in `.gitignore`.

---

## 8. Project Setup — Step by Step

### Step 1: Clone / Initialize repo

```bash
mkdir aarav-investments
cd aarav-investments
git init
```

### Step 2: Create client (React + Vite)

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm install react-router-dom axios recharts lucide-react react-hot-toast
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then replace `tailwind.config.js` with the config from Section 6.

### Step 3: Create server (Express)

```bash
cd ../
mkdir server
cd server
npm init -y
npm install express mongoose cors dotenv express-validator
npm install -D nodemon
```

### Step 4: Configure Vite proxy (avoids CORS in dev)

In `client/vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

> With this proxy, the frontend can call `/api/contact` instead of the full URL.  
> This means **no CORS issues** in development.

### Step 5: Set up React Router in App.jsx

```jsx
// client/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import ServicesOverview from './pages/Services/ServicesOverview';
import FinancialPlanning from './pages/Services/FinancialPlanning';
// ... import all service pages

import Products from './pages/Products/Products';
import CalculatorsHub from './pages/Calculators/CalculatorsHub';
import InvestmentCalculator from './pages/Calculators/InvestmentCalculator';
import MutualFundCalculator from './pages/Calculators/MutualFundCalculator';
import Contact from './pages/Contact/Contact';

// Constants
import { ROUTES } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path={ROUTES.HOME}                    element={<Home />} />
          <Route path={ROUTES.ABOUT}                   element={<About />} />
          <Route path={ROUTES.SERVICES}                element={<ServicesOverview />} />
          <Route path={ROUTES.SERVICE_FINANCIAL}       element={<FinancialPlanning />} />
          {/* ... all 10 service routes */}
          <Route path={ROUTES.PRODUCTS}                element={<Products />} />
          <Route path={ROUTES.CALCULATORS}             element={<CalculatorsHub />} />
          <Route path={ROUTES.CALC_INVESTMENT}         element={<InvestmentCalculator />} />
          <Route path={ROUTES.CALC_MUTUAL}             element={<MutualFundCalculator />} />
          <Route path={ROUTES.CONTACT}                 element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
```

### Step 6: Constants — routes.js

```js
// client/src/constants/routes.js
export const ROUTES = {
  HOME:                '/',
  ABOUT:               '/about',
  SERVICES:            '/services',
  SERVICE_FINANCIAL:   '/services/financial-planning',
  SERVICE_RETIREMENT:  '/services/retirement-planning',
  SERVICE_INVESTMENT:  '/services/investment-management',
  SERVICE_MUTUAL:      '/services/mutual-fund-sip',
  SERVICE_TAX:         '/services/tax-planning',
  SERVICE_LOANS:       '/services/corporate-retail-loans',
  SERVICE_INSURANCE:   '/services/insurance-solutions',
  SERVICE_NRI:         '/services/nri-investment',
  SERVICE_PORTFOLIO:   '/services/portfolio-review',
  SERVICE_ESTATE:      '/services/estate-planning',
  PRODUCTS:            '/products',
  CALCULATORS:         '/calculators',
  CALC_INVESTMENT:     '/calculators/investment',
  CALC_MUTUAL:         '/calculators/mutual-funds',
  CONTACT:             '/contact',
};
```

### Step 7: Currency formatter utility

```js
// client/src/utils/formatCurrency.js

/**
 * Formats a number to Indian rupee format: ₹ X,XX,XXX
 * @param {number} value
 * @returns {string}
 */
export function formatINR(value) {
  if (isNaN(value) || value === null) return '₹ 0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a number to Indian number system without currency symbol
 * @param {number} value
 * @returns {string}
 */
export function formatIndianNumber(value) {
  return new Intl.NumberFormat('en-IN').format(Math.round(value));
}
```

### Step 8: Calculator formulas utility

```js
// client/src/utils/calculatorUtils.js

/**
 * Investment Calculator — compound interest with annual contributions
 * @param {number} principal     - Initial invested amount
 * @param {number} annualContrib - Amount added each year
 * @param {number} ratePercent   - Annual interest rate (e.g., 12 for 12%)
 * @param {number} years         - Investment duration
 * @param {number} compoundFreq  - Times per year (1=annual, 2=semi, 4=quarterly, 12=monthly)
 * @returns {{ totalInvested: number, totalReturns: number, finalValue: number }}
 */
export function calcInvestment(principal, annualContrib, ratePercent, years, compoundFreq) {
  const r = ratePercent / 100;
  const n = compoundFreq;
  const t = years;

  // Compound growth of principal
  const principalGrowth = principal * Math.pow(1 + r / n, n * t);

  // Future value of annual contributions (annuity)
  let annuityFV = 0;
  if (r > 0 && annualContrib > 0) {
    annuityFV = annualContrib * (Math.pow(1 + r / n, n * t) - 1) / (r / n);
  } else {
    annuityFV = annualContrib * t;
  }

  const finalValue    = principalGrowth + annuityFV;
  const totalInvested = principal + annualContrib * t;
  const totalReturns  = finalValue - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    totalReturns:  Math.round(totalReturns),
    finalValue:    Math.round(finalValue),
  };
}

/**
 * Lump Sum Mutual Fund Calculator
 * @param {number} amount      - Invested amount
 * @param {number} ratePercent - Expected annual return
 * @param {number} years       - Investment period
 * @returns {{ totalInvested: number, totalReturns: number, finalValue: number }}
 */
export function calcLumpSum(amount, ratePercent, years) {
  const finalValue   = amount * Math.pow(1 + ratePercent / 100, years);
  const totalReturns = finalValue - amount;

  return {
    totalInvested: Math.round(amount),
    totalReturns:  Math.round(totalReturns),
    finalValue:    Math.round(finalValue),
  };
}

/**
 * SIP (Monthly) Calculator
 * @param {number} monthlyAmount - Monthly SIP amount
 * @param {number} ratePercent   - Expected annual return
 * @param {number} years         - Investment period
 * @returns {{ totalInvested: number, totalReturns: number, finalValue: number }}
 */
export function calcSIP(monthlyAmount, ratePercent, years) {
  const m  = ratePercent / (12 * 100);   // Monthly rate
  const N  = years * 12;                  // Total months
  const M  = monthlyAmount;

  let finalValue;
  if (m === 0) {
    finalValue = M * N;
  } else {
    finalValue = M * ((Math.pow(1 + m, N) - 1) / m) * (1 + m);
  }

  const totalInvested = M * N;
  const totalReturns  = finalValue - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    totalReturns:  Math.round(totalReturns),
    finalValue:    Math.round(finalValue),
  };
}
```

### Step 9: Express server entry

```js
// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' }));  // Vite default port
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// ── Error Handling ──────────────────────────────────────────
app.use(errorHandler);

// ── Database + Start ────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
```

---

## 9. Scripts Reference

### Running the project (development)

Open two terminal windows:

**Terminal 1 — Frontend:**
```bash
cd client
npm run dev
# → Runs on http://localhost:5173
```

**Terminal 2 — Backend:**
```bash
cd server
npm run dev
# → Runs on http://localhost:5000
```

### Building for production

```bash
cd client
npm run build
# Output in client/dist/
```

---

## 10. Code Snippets & Config Files

### `.gitignore` (root)

```
# Dependencies
node_modules/
client/node_modules/
server/node_modules/

# Environment variables
.env
client/.env
server/.env

# Build output
client/dist/

# Editor
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

### `README.md` (root)

```md
# Aarav Investments — Website Prototype

## Tech Stack
React 18 · Vite · Tailwind CSS · React Router v6 · Recharts
Node.js 20 · Express 4 · MongoDB Atlas · Mongoose

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account (free tier)

### Installation
\`\`\`bash
# Client
cd client && npm install

# Server
cd ../server && npm install
\`\`\`

### Environment Setup
Create \`server/.env\` with:
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
\`\`\`

Create \`client/.env\` with:
\`\`\`
VITE_API_BASE_URL=http://localhost:5000
\`\`\`

### Run
Terminal 1: \`cd client && npm run dev\`  
Terminal 2: \`cd server && npm run dev\`

Open http://localhost:5173
```

---

*End of Tech Stack Document v1.0.0 — Aarav Investments Prototype*
