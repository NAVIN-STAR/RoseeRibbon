"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, MessageCircle, Eye, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { getSingleProductWhatsAppUrl } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getSingleProductWhatsAppUrl(product);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-[26px] p-3 sm:p-4 border border-[#EADBCE]/80 shadow-[0_2px_14px_rgba(36,21,23,0.03)] hover:shadow-[0_12px_32px_rgba(36,21,23,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Image Container with 4:5 Ratio */}
      <div className="relative aspect-[4/4.8] w-full rounded-[20px] overflow-hidden bg-[#F5EFE6] mb-3.5">
        <Image
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badge && (
            <span className="bg-[#6B1D2F] text-white text-[10px] sm:text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {product.category === "candles" && product.burnTime && (
            <span className="bg-white/85 text-[#241517] text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
              {product.burnTime}
            </span>
          )}
          {product.category === "crochet-flowers" && (
            <span className="bg-white/85 text-[#241517] text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
              Never Wilts
            </span>
          )}
        </div>

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-[#241517] text-xs font-medium px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#6B1D2F]" /> Quick View
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Micro Category Label */}
          <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#736163] mb-1">
            {product.categoryLabel}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#241517] leading-snug group-hover:text-[#6B1D2F] transition-colors mb-1.5 line-clamp-1">
            {product.name}
          </h3>

          {/* Sensory / Characteristic Subtitle */}
          <p className="text-xs text-[#5A4B4D] line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription}
          </p>

          {/* Category Highlight Pill */}
          {product.scentNotes && (
            <div className="text-[11px] text-[#736163] bg-[#FAF6F0] px-2.5 py-1 rounded-lg mb-3 line-clamp-1 border border-[#EADBCE]/50">
              <span className="font-medium text-[#4A3B3D]">Notes:</span> {product.scentNotes.top}
            </div>
          )}
          {product.hamperContents && (
            <div className="text-[11px] text-[#736163] bg-[#FAF6F0] px-2.5 py-1 rounded-lg mb-3 line-clamp-1 border border-[#EADBCE]/50">
              <span className="font-medium text-[#4A3B3D]">Includes:</span> {product.hamperContents.length} curated gift items
            </div>
          )}
        </div>

        {/* Price and Action Row */}
        <div className="pt-3 border-t border-[#EADBCE]/60 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-[10px] text-[#736163] uppercase tracking-wider font-medium">Starting at</div>
            <div className="text-base sm:text-lg font-serif font-medium text-[#241517]">
              {formatPrice(product.basePrice)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Quick Order */}
            <button
              onClick={handleDirectWhatsApp}
              title="Quick inquiry on WhatsApp"
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-full border border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Add to Bag */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={handleAddToCart}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                addedAnimation
                  ? "bg-[#25D366] text-white shadow-sm"
                  : "bg-[#6B1D2F] hover:bg-[#521422] text-white shadow-sm"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{addedAnimation ? "Added!" : "Add"}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
