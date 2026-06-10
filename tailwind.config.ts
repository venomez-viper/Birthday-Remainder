import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme")

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
        handwritten: ["var(--font-handwritten)", "cursive"],
      },
      colors: {
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        /* ── Book-specific palette (theme-independent) ── */
        "book-paper":     "#f5e6c8",
        "book-cream":     "#faf3e6",
        "book-text":      "#4a3728",
        "book-accent":    "#8b4c5e",
        "book-muted":     "#9a8b7a",
        "book-gold":      "#c9956b",
        "book-border":    "#d4c5a9",
        "book-highlight":  "#fff8ed",
        "book-leather":   "#3a4a3a",
        "book-spine":     "#2d3a2d",
        "desk":           "#1a1210",
        /* ── Raised surfaces on the page (one source of truth) ── */
        "book-card":      "#f0e9dc",  // default raised card
        "book-card-warm": "#e8deca",  // warmer stat card
        "book-sage":      "#d0d6c0",  // sage accent banner
        "book-sage-line": "#b8bfa6",  // sage hairline
        "book-line":      "#d1c2a3",  // decorative hairline / frame
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        "sway": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "sway": "sway 4s ease-in-out infinite",
      },
      boxShadow: {
        "book": "0 25px 60px -10px rgba(0,0,0,0.7), 0 10px 25px -5px rgba(0,0,0,0.5), 4px 4px 15px rgba(0,0,0,0.3)",
        "page-left": "inset -8px 0 20px -8px rgba(0,0,0,0.15), -2px 4px 12px rgba(0,0,0,0.1)",
        "page-right": "inset 8px 0 20px -8px rgba(0,0,0,0.15), 2px 4px 12px rgba(0,0,0,0.1)",
        "tab": "2px 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
