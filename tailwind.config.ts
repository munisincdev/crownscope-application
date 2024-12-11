import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        headers: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Primary colors for main actions and branding
        primary: {
          DEFAULT: "#351c43", // Deep purple for primary brand color
          light: "#8d779c",   // Lighter purple for hover states
          foreground: "#FFFFFF",
        },
        // Secondary colors for supporting elements
        secondary: {
          DEFAULT: "#ab1f74", // Pink for secondary actions
          light: "#c18ab2",   // Lighter pink for hover states
          foreground: "#FFFFFF",
        },
        // Product-specific colors
        product: {
          travel: "#8da4ce",    // Blue for travel insurance
          medical: "#1fab56",   // Green for medical insurance
          golfer: "#8ac199",    // Sage green for golfer's insurance
          accident: "#7f6561",  // Brown for personal accident
          domestic: "#617b7f",  // Slate for domestic package
        },
        // Quick action colors
        action: {
          claim: "#8d779c",     // Purple for claims
          cover: "#1fab56",     // Green for buy cover
          documents: "#8da4ce", // Blue for documents
          renewal: "#7f6561",   // Brown for renewal
        },
        // Navigation colors
        nav: {
          DEFAULT: "#351c43",   // Deep purple for active state
          inactive: "#545454",  // Gray for inactive state
          background: "#e6d0de", // Light pink for nav background
        },
        accent: {
          DEFAULT: "#ab1f74",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#545454",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#1fab56",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;