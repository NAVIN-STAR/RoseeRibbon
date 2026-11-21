"use client";

import React from "react";
import { motion } from "framer-motion";
import { CategoryId } from "@/types/product";

interface CategoryTabsProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  counts: Record<CategoryId, number>;
}

const categories: { id: CategoryId; label: string; icon: string }[] = [
  { id: "all", label: "All Creations", icon: "✨" },
  { id: "candles", label: "Homemade Candles", icon: "🕯️" },
  { id: "crochet-flowers", label: "Crochet Blooms", icon: "🧶" },
  { id: "hampers", label: "Curated Hampers", icon: "🎁" },
];

export function CategoryTabs({ activeCategory, onSelectCategory, counts }: CategoryTabsProps) {
  return (
    <div className="flex justify-center items-center my-8 px-4 overflow-x-auto no-scrollbar">
      <div className="inline-flex p-1.5 bg-white/70 backdrop-blur-md rounded-full border border-[#EADBCE]/80 shadow-[0_2px_12px_rgba(36,21,23,0.03)] gap-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap select-none flex items-center gap-2 ${
                isActive ? "text-white" : "text-[#5A4B4D] hover:text-[#241517]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 bg-[#6B1D2F] rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat.icon}</span>
              <span className="relative z-10">{cat.label}</span>
              <span
                className={`relative z-10 text-[11px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-black/5 text-[#736163]"
                }`}
              >
                {counts[cat.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
