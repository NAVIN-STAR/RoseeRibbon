import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF6F0",
        surface: "#FFFFFF",
        "surface-soft": "#F5EFE6",
        bordeaux: {
          DEFAULT: "#6B1D2F",
          hover: "#541423",
          light: "#F7EEF0",
        },
        espresso: {
          DEFAULT: "#241517",
          muted: "#736163",
          soft: "#4A3B3D",
        },
        roseDust: "#C79A9E",
        warmBorder: "#EADBCE",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        "3xl": "28px",
        "4xl": "36px",
      },
      boxShadow: {
        subtle: "0 2px 12px rgba(36, 21, 23, 0.04)",
        card: "0 8px 30px rgba(36, 21, 23, 0.06)",
        float: "0 20px 40px -15px rgba(36, 21, 23, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
