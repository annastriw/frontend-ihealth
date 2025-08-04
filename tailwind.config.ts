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
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [typography, scrollbarHide],
};

export default config;
