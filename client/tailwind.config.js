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
          950: "#422522",    // Primary Dark Espresso (navbar, hero, footer)
          900: "#331B19",    // Darker Espresso (gradient center)
          800: "#3B201D",    // Espresso tone
          700: "#855632",    // Primary Mid Copper Brown (buttons, accents)
          600: "#986741",    // Soft Copper
          500: "#855632",    // Copper fallback
          100: "#FAF6F0",    // Light Cream background tint
          50:  "#FDFCF7",    // Very light off-white cream
        },
        gold: {
          400: "#BD8A53",    // Camel/Gold Tan CTA
          600: "#A1713B",    // Darker Camel hover state
        },
        // Text
        ink: {
          dark:  "#33211F",  // Primary deep espresso-brown text
          muted: "#705E5C",  // Muted warm grey
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
        "card":       "0 4px 20px rgba(66, 37, 34, 0.08)",
        "card-hover": "0 10px 40px rgba(66, 37, 34, 0.16)",
        "navbar":     "0 2px 12px rgba(66, 37, 34, 0.10)",
      },

      // ── Transitions & Animations ───────────────────────────
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
      animation: {
        pulse: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
