"use client";

import React from "react";
import { motion } from "framer-motion";
import { CategoryId } from "@/types/product";

interface CategoryTabsProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  counts: Record<CategoryId, number>;
}

const mainCategories: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "candles", label: "Soy Candles" },
  { id: "crochet-flowers", label: "Crochet Blooms" },
  { id: "hampers", label: "Hampers" },
];

const crochetSubcategories: { id: CategoryId; label: string }[] = [
  { id: "crochet-flowers", label: "All Blooms" },
  { id: "crochet-single", label: "Single Flowers" },
  { id: "bouquet-1", label: "Single Flower Bouquet" },
  { id: "bouquet-3", label: "Multi-Flower Bouquet" },
];

export function CategoryTabs({ activeCategory, onSelectCategory, counts }: CategoryTabsProps) {
  const isCrochetActive =
    activeCategory === "crochet-flowers" ||
    activeCategory === "crochet-single" ||
    activeCategory === "crochet-bouquets" ||
    activeCategory === "bouquet-1" ||
    activeCategory === "bouquet-3";

  return (
    <div className="flex flex-col items-center my-8 px-4">
      {/* Primary Category Bar (Clean 4 Core Atelier Collections) */}
      <div className="inline-flex p-1 bg-white rounded-full border border-[#D5C7B7] shadow-subtle gap-1 overflow-x-auto no-scrollbar max-w-full">
        {mainCategories.map((cat) => {
          const isSelected =
            cat.id === "crochet-flowers"
              ? isCrochetActive
              : activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative px-5 sm:px-6 py-2 rounded-full text-xs font-sans tracking-wide transition-colors whitespace-nowrap select-none flex items-center gap-2 ${
                isSelected ? "text-white font-semibold" : "text-[#2D1C1F] font-medium hover:text-[#14080A]"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 bg-[#4A121A] rounded-full"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
              <span
                className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                  isSelected ? "bg-white/20 text-white" : "bg-[#FAF6F0] text-[#3D282B] border border-[#E8DFD3]"
                }`}
              >
                {counts[cat.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Crochet Subcategory Tabs (Smoothly revealed when Crochet Blooms is active) */}
      {isCrochetActive && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 mt-3.5 p-1 bg-[#FAF6F0] border border-[#D5C7B7] rounded-full shadow-inner overflow-x-auto no-scrollbar max-w-full"
        >
          {crochetSubcategories.map((sub) => {
            const isSubSelected =
              sub.id === "crochet-flowers"
                ? activeCategory === "crochet-flowers" || activeCategory === "crochet-bouquets"
                : activeCategory === sub.id;

            return (
              <button
                key={sub.id}
                onClick={() => onSelectCategory(sub.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSubSelected
                    ? "bg-white text-[#4A121A] font-bold shadow-xs border border-[#D5C7B7]"
                    : "text-[#3D282B] font-medium hover:text-[#14080A]"
                }`}
              >
                <span>{sub.label}</span>
                <span className="text-[10px] font-mono font-medium text-[#553E41]">({counts[sub.id] ?? 0})</span>
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
