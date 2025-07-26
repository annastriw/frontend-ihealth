// root: /frontend-ihealth/tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // import plugin

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-pattern': "url('/images/assets/bg-about-us.png')",
      },
      colors: {
        primary: "#22c55e", // hijau iHealth
        secondary: "#facc15", // opsional: kuning contoh
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // contoh font modern
      },
    },
  },
  plugins: [
    typography, // aktifkan plugin typography
  ],
};

export default config;
