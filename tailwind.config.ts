// root: /frontend-ihealth/tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // sesuaikan path jika berbeda
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-pattern': "url('/images/assets/bg-about-us.png')",
      },
    },
  },
  plugins: [],
};

export default config;
