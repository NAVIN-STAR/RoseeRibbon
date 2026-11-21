"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift } from "lucide-react";
import { products } from "@/data/products";
import { CategoryId, Product } from "@/types/product";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { useCart } from "@/context/CartContext";

export function CatalogSection() {
  const { activeCategory, setActiveCategory, openHamperBuilder } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Category counts calculation
  const counts = useMemo(() => {
    return {
      all: products.length,
      candles: products.filter((p) => p.category === "candles").length,
      "crochet-flowers": products.filter((p) => p.category === "crochet-flowers").length,
      hampers: products.filter((p) => p.category === "hampers").length,
    };
  }, []);

  // Filtered products list based on active category in CartContext
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="catalog" className="py-10 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#736163]">
            ARTISANAL COLLECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#241517] mt-2 mb-3">
            Handcrafted for warmth & delight.
          </h2>
          <p className="text-sm sm:text-base text-[#5A4B4D]">
            Explore our small-batch candle blends, forever crochet stems, and gift boxes.
            Click any item for details or direct WhatsApp ordering.
          </p>
        </div>

        {/* Animated Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          counts={counts}
        />

        {/* Product Grid with Emil Kowalski stagger */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6"
        >
          {/* Feature Card: "Curate a Custom Hamper" in Hampers or All */}
          {(activeCategory === "all" || activeCategory === "hampers") && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={openHamperBuilder}
              className="bg-gradient-to-br from-[#FAF6F0] via-[#F5EFE6] to-[#EADBCE]/50 rounded-[26px] p-6 border-2 border-dashed border-[#6B1D2F]/30 hover:border-[#6B1D2F] flex flex-col justify-between cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300 min-h-[380px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#6B1D2F] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6B1D2F] bg-white/80 px-2.5 py-1 rounded-full">
                  Interactive Studio
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#241517] mt-3 mb-2 group-hover:text-[#6B1D2F] transition-colors">
                  Build Your Own Hamper
                </h3>
                <p className="text-xs text-[#5A4B4D] leading-relaxed">
                  Mix and match any candle fragrance, everlasting crochet stem, and keepsake
                  extras into one customized gift box. Adds as 1 neat hamper to your bag!
                </p>
              </div>

              <div className="pt-4 border-t border-[#EADBCE]/60 flex items-center justify-between">
                <span className="text-xs text-[#736163]">Starts from ₹749</span>
                <span className="bg-[#6B1D2F] group-hover:bg-[#521422] text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> Start Customizing
                </span>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quick View Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

      </div>
    </section>
  );
}
