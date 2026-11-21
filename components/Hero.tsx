"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Flame, Flower2, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Hero() {
  const { openHamperBuilder } = useCart();

  return (
    <section className="relative pt-6 pb-14 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow & Unique Brand Statement */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#EADBCE] mb-5 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#736163]">
              ROSEE RIBBON · BANGALORE ATELIER
            </span>
          </motion.div>

          {/* Differentiated Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#241517] leading-[1.08] tracking-[-0.03em] mb-6"
          >
            Hand-poured, hand-stitched, <br className="hidden sm:inline" />
            tied with a ribbon.
          </motion.h1>

          {/* Subtitle covering all 3 pillars */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-base sm:text-lg text-[#5A4B4D] leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Small-batch botanical soy candles, everlasting crochet floral stems,
            and bespoke gift hampers. Thoughtfully crafted in Bangalore for moments
            that deserve to be remembered.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#catalog"
              className="inline-flex items-center justify-center bg-[#6B1D2F] hover:bg-[#521422] text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all active:scale-[0.97]"
            >
              Explore Creations
            </a>

            <button
              onClick={openHamperBuilder}
              className="inline-flex items-center justify-center border border-[#6B1D2F]/30 hover:border-[#6B1D2F] text-[#241517] hover:bg-black/[0.02] px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all active:scale-[0.97] gap-2"
            >
              <Gift className="w-4 h-4 text-[#6B1D2F]" />
              <span>Curate a Custom Hamper</span>
            </button>
          </motion.div>
        </div>

        {/* 3-Photo Visual Triptych: Candles + Crochet Blooms + Hampers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto items-center"
        >
          {/* Card 1: Hand-Poured Soy Candles */}
          <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-[0_12px_30px_rgba(36,21,23,0.06)] border border-[#EADBCE] bg-[#F5EFE6] group sm:translate-y-4">
            <Image
              src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85"
              alt="Hand-poured soy candle with botanicals"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-serif font-medium text-white flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                Soy Candles
              </span>
              <span className="text-[11px] text-white/80">38+ hrs burn</span>
            </div>
          </div>

          {/* Card 2 (Center Hero): Everlasting Crochet Blooms (Taller Arch) */}
          <div className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden shadow-[0_20px_45px_rgba(36,21,23,0.1)] border-2 border-[#EADBCE] bg-[#F5EFE6] group sm:-translate-y-2 z-10">
            <Image
              src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85"
              alt="Handmade crochet flowers in vase"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4">
              <span className="bg-[#6B1D2F] text-white text-[11px] font-medium tracking-wide px-3 py-1 rounded-full shadow-sm">
                Most Loved
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <span className="text-sm font-serif font-medium text-white flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                <Flower2 className="w-4 h-4 text-rose-300" />
                Crochet Blooms
              </span>
              <span className="text-xs text-white/90 font-medium">Never Wilts</span>
            </div>
          </div>

          {/* Card 3: Curated Luxury Hampers */}
          <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-[0_12px_30px_rgba(36,21,23,0.06)] border border-[#EADBCE] bg-[#F5EFE6] group sm:translate-y-4">
            <Image
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85"
              alt="Curated gift hamper box tied with satin ribbon"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-serif font-medium text-white flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Gift className="w-3.5 h-3.5 text-amber-200" />
                Curated Hampers
              </span>
              <span className="text-[11px] text-white/80">Custom Ribbon</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
