"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Heart, Sparkles } from "lucide-react";

export function TrustBar() {
  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white/85 backdrop-blur-md rounded-full py-3.5 px-6 sm:px-10 border border-[#EADBCE] shadow-[0_2px_14px_rgba(36,21,23,0.03)] flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#4A3B3D]"
        >
          {/* Proposition 1: Bangalore atelier */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F]" />
            <span className="font-medium text-[#241517]">
              Handcrafted in Bangalore · Doorstep Delivery
            </span>
          </div>

          <div className="hidden md:block w-px h-3 bg-[#EADBCE]" />

          {/* Proposition 2: Handwritten Card */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F]" />
            <span className="font-medium text-[#241517]">
              Handwritten wax-sealed message card on every order
            </span>
          </div>

          <div className="hidden md:block w-px h-3 bg-[#EADBCE]" />

          {/* Proposition 3: Transparency */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F]" />
            <span className="font-medium text-[#241517]">
              All prices include packaging & taxes
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
