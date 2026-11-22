"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Hero() {
  const { openHamperBuilder, setActiveCategory } = useCart();

  const scrollToCatalog = (category?: "candles" | "crochet-flowers" | "hampers") => {
    if (category) {
      setActiveCategory(category);
    }
    const el = document.getElementById("catalog");
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading (No sparkles, no AI pseudo-poetry) */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium sm:font-semibold text-[#14080A] leading-[1.08] tracking-[-0.025em] mb-6">
            Handmade candles, crochet blooms, and gift hampers.
          </h1>

          <p className="text-base sm:text-lg text-[#241517] leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
            Small batches poured with golden soy wax, floral stems crocheted petal by petal
            from combed cotton, and customized gift crates. Made in our Bangalore studio and
            packed with silk ribbon.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openHamperBuilder}
              className="inline-flex items-center justify-center bg-[#4A121A] hover:bg-[#350C12] text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-luxury transition-all active:translate-y-0.5 gap-2"
            >
              <Gift className="w-4 h-4 text-[#E8DCB8]" />
              <span>Curate a Custom Hamper</span>
            </button>

            <button
              onClick={() => scrollToCatalog()}
              className="inline-flex items-center justify-center border-2 border-[#14080A]/30 hover:border-[#4A121A] text-[#14080A] hover:bg-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all active:translate-y-0.5"
            >
              View Catalog
            </button>
          </div>
        </div>

        {/* 3-Craft Lookbook Panels (Clean typography, no dot soup) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Panel 1: Soy Candle */}
          <div
            onClick={() => scrollToCatalog("candles")}
            className="group relative rounded-[28px] overflow-hidden border border-[#E8DFD3] bg-white shadow-subtle hover:shadow-card transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[3/3.8] w-full overflow-hidden bg-[#F5EFE6]">
              <Image
                src="/images/candles/rose/rose-crimson-box.png"
                alt="Hand-sculpted peony blossom candle in white presentation gift box"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-wider font-bold bg-white/95 text-[#14080A] px-3 py-1 rounded-full shadow-sm">
                  Soy Candles
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium leading-tight text-white mb-1">
                    Botanical Soy Candles
                  </h3>
                  <div className="text-xs text-[#F2E8DC] font-sans font-medium">
                    100% botanical soy wax & fine fragrance
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#4A121A] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs text-[#2D1C1F] font-medium bg-white">
              <span>Sculpted blooms, brass urlis & glass candles</span>
              <span className="font-serif font-bold text-[#4A121A] text-base">From ₹39</span>
            </div>
          </div>

          {/* Panel 2 (Center): Everlasting Blooms */}
          <div
            onClick={() => scrollToCatalog("crochet-flowers")}
            className="group relative rounded-[32px] overflow-hidden border-2 border-[#E8DFD3] hover:border-[#4A121A] bg-white shadow-card hover:shadow-luxury transition-all duration-300 cursor-pointer flex flex-col justify-between md:-translate-y-2 z-10"
          >
            <div className="relative aspect-[3/4.1] w-full overflow-hidden bg-[#F5EFE6]">
              <Image
                src="/images/crochet/bouquets/single/rose-bouquet-1-slide.png"
                alt="Handcrafted everlasting crochet rose bouquet"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-[10px] uppercase tracking-wider font-bold bg-[#4A121A] text-white px-3 py-1 rounded-full shadow-sm">
                  Forever Bloom
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium sm:font-semibold leading-tight text-white mb-1">
                    Crochet Blooms & Bouquets
                  </h3>
                  <div className="text-xs text-[#F2E8DC] font-sans font-medium">
                    Combed milk cotton / black & gold luxury wrap
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center group-hover:bg-[#4A121A] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs text-[#2D1C1F] font-medium bg-white">
              <span>Single stems & wrapped presentation bouquets</span>
              <span className="font-serif font-bold text-[#4A121A] text-base">From ₹129</span>
            </div>
          </div>

          {/* Panel 3: Curated Hampers */}
          <div
            onClick={openHamperBuilder}
            className="group relative rounded-[28px] overflow-hidden border border-[#E8DFD3] bg-white shadow-subtle hover:shadow-card transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[3/3.8] w-full overflow-hidden bg-[#F5EFE6]">
              <Image
                src="/images/hampers/premium-box.jpg"
                alt="Rosee Ribbon Deluxe Premium Hamper Box with silk ribbon"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-wider font-bold bg-white/95 text-[#14080A] px-3 py-1 rounded-full shadow-sm">
                  Bespoke Gift Boxes
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium leading-tight text-white mb-1">
                    The Rosee Reverie Box
                  </h3>
                  <div className="text-xs text-[#F2E8DC] font-sans font-medium">
                    Candle + blooms + custom card
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#4A121A] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs text-[#2D1C1F] font-medium bg-white">
              <span>Packed in rigid keepsake box</span>
              <span className="font-serif font-bold text-[#4A121A] text-base">From ₹799</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
