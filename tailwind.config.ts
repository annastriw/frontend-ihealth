// root: /frontend-ihealth/tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth-pattern": "url('/images/assets/bg-about-us.png')",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        paytone: ["var(--font-paytone-one)", "sans-serif"],
      },
      colors: {
        primary: "oklch(var(--primary) / <alpha-value>)",
        "primary-dark": "oklch(var(--primary-dark) / <alpha-value>)",
        "primary-foreground": "oklch(var(--primary-foreground) / <alpha-value>)",
        "accent-green": {
          50: "oklch(98% 0.04 145)",
          100: "oklch(95% 0.05 145)",
          200: "oklch(90% 0.06 145)",
          300: "oklch(85% 0.07 145)",
          400: "oklch(75% 0.09 145)",
          500: "oklch(65% 0.11 145)",
          600: "oklch(55% 0.13 145)",
          700: "oklch(45% 0.14 145)",
          800: "oklch(35% 0.13 145)",
          900: "oklch(25% 0.12 145)",
        },
      },
    },
  },
  plugins: [typography, scrollbarHide],
};

export default config;
