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
        merlot: {
          DEFAULT: "#4A121A", // Deep Velvet Merlot / Black Cherry (Distinct from competitor's maroon)
          hover: "#350C12",
          light: "#F7EEF0",
          subtle: "rgba(74, 18, 26, 0.08)",
        },
        champagne: {
          DEFAULT: "#D4AF37",
          soft: "#E8DCB8",
          light: "#FBF7EE",
        },
        espresso: {
          DEFAULT: "#1F1315",
          muted: "#6B5A5C",
          soft: "#453638",
        },
        olive: "#5E6D5B",
        warmBorder: "#E8DFD3",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        "3xl": "28px",
        "4xl": "36px",
      },
      boxShadow: {
        subtle: "0 2px 14px rgba(31, 19, 21, 0.03)",
        card: "0 8px 30px rgba(31, 19, 21, 0.05)",
        float: "0 20px 45px -15px rgba(31, 19, 21, 0.08)",
        luxury: "0 25px 50px -12px rgba(74, 18, 26, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
