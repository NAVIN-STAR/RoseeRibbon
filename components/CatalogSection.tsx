"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, ArrowRight, Search, X } from "lucide-react";
import { products } from "@/data/products";
import { CategoryId, Product } from "@/types/product";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { useCart } from "@/context/CartContext";

export function CatalogSection() {
  const {
    activeCategory,
    setActiveCategory,
    openHamperBuilder,
    quickViewProduct,
    quickViewVariant,
    openQuickView,
    closeQuickView,
    catalogSearchQuery,
    setCatalogSearchQuery,
  } = useCart();

  // Category counts calculation
  const counts = useMemo(() => {
    return {
      all: products.length,
      candles: products.filter((p) => p.category === "candles").length,
      "crochet-flowers": products.filter((p) => p.category === "crochet-flowers").length,
      "crochet-single": products.filter(
        (p) => p.category === "crochet-flowers" && p.crochetSubcategory === "single"
      ).length,
      "crochet-bouquets": products.filter(
        (p) => p.category === "crochet-flowers" && p.crochetSubcategory === "bouquet"
      ).length,
      "bouquet-1": products.filter(
        (p) => p.category === "crochet-flowers" && p.bouquetType === "1-flower"
      ).length,
      "bouquet-3": products.filter(
        (p) => p.category === "crochet-flowers" && p.bouquetType === "3-flower"
      ).length,
      hampers: products.filter((p) => p.category === "hampers").length,
    };
  }, []);

  // Filtered products list with search query support
  const filteredProducts = useMemo(() => {
    let list = products;

    if (activeCategory === "candles") {
      list = list.filter((p) => p.category === "candles");
    } else if (activeCategory === "crochet-flowers") {
      list = list.filter((p) => p.category === "crochet-flowers");
    } else if (activeCategory === "crochet-single") {
      list = list.filter(
        (p) => p.category === "crochet-flowers" && p.crochetSubcategory === "single"
      );
    } else if (activeCategory === "crochet-bouquets") {
      list = list.filter(
        (p) => p.category === "crochet-flowers" && p.crochetSubcategory === "bouquet"
      );
    } else if (activeCategory === "bouquet-1") {
      list = list.filter(
        (p) => p.category === "crochet-flowers" && p.bouquetType === "1-flower"
      );
    } else if (activeCategory === "bouquet-3") {
      list = list.filter(
        (p) => p.category === "crochet-flowers" && p.bouquetType === "3-flower"
      );
    } else if (activeCategory === "hampers") {
      list = list.filter((p) => p.category === "hampers");
    }

    if (catalogSearchQuery.trim()) {
      const q = catalogSearchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = p.shortDescription.toLowerCase().includes(q);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const inVariants = p.variants?.some((v) => v.name.toLowerCase().includes(q)) ?? false;
        return inName || inDesc || inTags || inVariants;
      });
    }

    return list;
  }, [activeCategory, catalogSearchQuery]);

  return (
    <section id="catalog" className="py-14 md:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-2">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium sm:font-semibold text-[#14080A] mb-3">
            The Catalog
          </h2>
          <p className="text-sm sm:text-base text-[#241517] font-sans">
            Small batches made by hand. Select any piece for olfactory notes,
            materials, or direct WhatsApp ordering.
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          counts={counts}
        />

        {/* Active Search Query Filter Pill */}
        {catalogSearchQuery.trim() && (
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-[#D5C7B7] mb-4 shadow-2xs mt-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#14080A]">
              <Search className="w-4 h-4 text-[#4A121A]" />
              <span>
                Search results for: <strong className="text-[#4A121A]">&ldquo;{catalogSearchQuery}&rdquo;</strong> ({filteredProducts.length} {filteredProducts.length === 1 ? "creation" : "creations"} found)
              </span>
            </div>
            <button
              onClick={() => setCatalogSearchQuery("")}
              className="text-xs text-[#4A121A] hover:underline font-semibold flex items-center gap-1.5 bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#D5C7B7]"
            >
              <span>Clear search</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-[#D5C7B7] my-8">
            <Search className="w-8 h-8 text-[#8C7A7C] mx-auto mb-2" />
            <div className="font-serif text-xl text-[#14080A] font-semibold mb-1">
              No creations match &ldquo;{catalogSearchQuery}&rdquo;
            </div>
            <p className="text-xs text-[#736163] mb-4">
              Try checking for typos or searching for &ldquo;peony&rdquo;, &ldquo;rose&rdquo;, &ldquo;matcha&rdquo;, or &ldquo;hamper&rdquo;.
            </p>
            <button
              onClick={() => {
                setCatalogSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-5 py-2 rounded-full bg-[#4A121A] hover:bg-[#350C12] text-white text-xs font-semibold"
            >
              View All Creations
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
          {/* Custom Hamper Card */}
          {(activeCategory === "all" || activeCategory === "hampers") && !catalogSearchQuery.trim() && (
            <div
              onClick={openHamperBuilder}
              className="bg-white rounded-[24px] p-6 border-2 border-dashed border-[#4A121A]/30 hover:border-[#4A121A] flex flex-col justify-between cursor-pointer group shadow-subtle hover:shadow-card transition-all duration-300 min-h-[380px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#4A121A] text-[#E8DCB8] flex items-center justify-center mb-5 shadow-sm">
                  <Gift className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#4A121A] mb-2">
                  Bespoke Studio
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#14080A] mb-2 group-hover:text-[#4A121A] transition-colors">
                  Build a Custom Hamper
                </h3>
                <p className="text-xs sm:text-[13px] text-[#241517] leading-relaxed font-sans">
                  Choose your container base, then add any quantity of candles, crochet stems,
                  and personalized message cards. Added as one bundled gift to your bag.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD3] flex items-center justify-between">
                <span className="bg-[#4A121A] group-hover:bg-[#350C12] text-white text-xs font-sans font-medium px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors">
                  <span>Start Building</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <ProductModal
            product={quickViewProduct}
            initialVariant={quickViewVariant}
            onClose={closeQuickView}
          />
        )}

      </div>
    </section>
  );
}
