"use client";

import React from "react";
import { Gift, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function BespokeHamperCallout() {
  const { openHamperBuilder } = useCart();

  return (
    <section id="hampers" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-white rounded-[32px] p-8 sm:p-14 lg:p-16 border border-[#E8DFD3] shadow-card">
          <div className="max-w-2xl">
            <div className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#4A121A] mb-3">
              Custom Gifting
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium sm:font-semibold text-[#14080A] leading-tight mb-4">
              Curate a custom hamper.
            </h2>

            <p className="text-sm sm:text-base text-[#241517] leading-relaxed mb-8 font-sans">
              Hand-select any botanical soy candle, choose your everlasting crochet stems,
              and our Bangalore studio will pack it in a rigid keepsake box tied with signature
              silk ribbon and a handwritten message card.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={openHamperBuilder}
                className="bg-[#4A121A] hover:bg-[#350C12] text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase shadow-luxury flex items-center gap-2 transition-all active:translate-y-0.5"
              >
                <Gift className="w-4 h-4 text-[#E8DCB8]" />
                <span>Open Hamper Studio</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>

              <span className="text-xs text-[#3D282B] font-sans font-medium">
                Corporate and wedding bulk inquiries welcome.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
