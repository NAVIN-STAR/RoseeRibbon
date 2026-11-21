import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { CustomHamperBuilderModal } from "@/components/CustomHamperBuilderModal";

export const metadata: Metadata = {
  title: "Rosee Ribbon | Botanical Candles, Crochet Blooms & Gift Hampers | Bangalore",
  description:
    "Bespoke artisanal creations: 100% botanical soy candles, everlasting crochet flower bouquets, and luxury curated gift hampers. Handcrafted in Bangalore.",
  keywords: [
    "Rosee Ribbon",
    "RoseeRibbon",
    "Bangalore candles",
    "crochet flowers Bangalore",
    "soy wax candles Bangalore",
    "curated gift hampers Bangalore",
    "everlasting bouquets",
    "bespoke gifting Bangalore",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF6F0] text-[#241517] selection:bg-[#6B1D2F] selection:text-white font-sans antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
          <CustomHamperBuilderModal />
        </CartProvider>
      </body>
    </html>
  );
}
