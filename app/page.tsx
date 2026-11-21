import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { CatalogSection } from "@/components/CatalogSection";
import { BespokeHamperCallout } from "@/components/BespokeHamperCallout";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Editorial Navigation */}
      <Navbar />

      {/* Hero Section matching screenshot layout */}
      <Hero />

      {/* Floating Trust / Value Proposition Bar */}
      <TrustBar />

      {/* Dynamic, Scalable Interactive Catalog */}
      <CatalogSection />

      {/* Bespoke Hamper Gifting Concierge */}
      <BespokeHamperCallout />

      {/* Studio Footer */}
      <Footer />
    </div>
  );
}
