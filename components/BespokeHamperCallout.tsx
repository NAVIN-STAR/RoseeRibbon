"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, MessageCircle, HeartHandshake } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function BespokeHamperCallout() {
  const { openHamperBuilder } = useCart();

  return (
    <section id="hampers" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[#F5EFE6] rounded-[36px] p-8 sm:p-12 lg:p-14 border border-[#EADBCE] overflow-hidden shadow-subtle">
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#6B1D2F]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <Gift className="w-4 h-4 text-[#6B1D2F]" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#736163]">
                BESPOKE GIFTING CONCIERGE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#241517] leading-tight mb-4">
              Curate your own bespoke hamper.
            </h2>

            <p className="text-sm sm:text-base text-[#5A4B4D] leading-relaxed mb-8">
              Every celebration is unique. Pick any hand-poured candle, choose your favorite
              everlasting crochet stems, and let our studio assemble it in our rigid keepsake box,
              tied with a signature satin ribbon and personalized calligraphy note.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={openHamperBuilder}
                className="bg-[#6B1D2F] hover:bg-[#521422] text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-sm flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Custom Hamper Builder</span>
              </motion.button>

              <div className="text-xs text-[#736163] flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#6B1D2F]" />
                <span>Discounts available for bulk & corporate orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
