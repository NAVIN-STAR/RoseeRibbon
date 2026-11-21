"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MessageCircle, ShoppingBag, Sparkles, Flame, Flower2, Gift } from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { getSingleProductWhatsAppUrl } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants ? product.variants[0] : undefined
  );
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const displayImage = activeImage || product.image;

  const handleAdd = () => {
    addToCart(product, selectedVariant);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const handleDirectWhatsApp = () => {
    const url = getSingleProductWhatsAppUrl(product, selectedVariant);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#241517]/40 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window with Emil Kowalski spring physics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="relative bg-[#FAF6F0] w-full max-w-3xl rounded-[32px] shadow-2xl border border-[#EADBCE] overflow-hidden z-10 my-8 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#241517] shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Showcase */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between bg-[#F5EFE6]/60">
            <div className="relative aspect-[4/4.5] w-full rounded-[24px] overflow-hidden bg-white shadow-sm border border-[#EADBCE]/50">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#6B1D2F] text-white text-[11px] font-medium px-3 py-0.5 rounded-full">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.secondaryImage && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    displayImage === product.image ? "border-[#6B1D2F]" : "border-transparent opacity-70"
                  }`}
                >
                  <Image src={product.image} alt="Thumbnail 1" fill className="object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    displayImage === product.secondaryImage ? "border-[#6B1D2F]" : "border-transparent opacity-70"
                  }`}
                >
                  <Image src={product.secondaryImage} alt="Thumbnail 2" fill className="object-cover" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Product Narrative & Ordering */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category eyebrow */}
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#736163] mb-1.5 flex items-center gap-1.5">
                {product.category === "candles" && <Flame className="w-3.5 h-3.5 text-[#6B1D2F]" />}
                {product.category === "crochet-flowers" && <Flower2 className="w-3.5 h-3.5 text-[#6B1D2F]" />}
                {product.category === "hampers" && <Gift className="w-3.5 h-3.5 text-[#6B1D2F]" />}
                <span>{product.categoryLabel}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#241517] mb-2 leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="text-xl font-serif font-medium text-[#6B1D2F] mb-4">
                {formatPrice(currentPrice)}
                <span className="text-xs font-sans text-[#736163] font-normal ml-2">
                  (Incl. all taxes & message card)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4A3B3D] leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Category-Specific Specifications */}
              {product.category === "candles" && product.scentNotes && (
                <div className="bg-white/80 rounded-2xl p-4 border border-[#EADBCE] mb-5 space-y-2 text-xs">
                  <div className="font-medium text-[#241517] flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#6B1D2F]" /> Scent Architecture
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[#FAF6F0] p-2 rounded-xl">
                      <div className="text-[10px] text-[#736163] uppercase">Top</div>
                      <div className="font-medium text-[#241517] text-[11px]">{product.scentNotes.top}</div>
                    </div>
                    <div className="bg-[#FAF6F0] p-2 rounded-xl">
                      <div className="text-[10px] text-[#736163] uppercase">Heart</div>
                      <div className="font-medium text-[#241517] text-[11px]">{product.scentNotes.heart}</div>
                    </div>
                    <div className="bg-[#FAF6F0] p-2 rounded-xl">
                      <div className="text-[10px] text-[#736163] uppercase">Base</div>
                      <div className="font-medium text-[#241517] text-[11px]">{product.scentNotes.base}</div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 text-[11px] text-[#5A4B4D]">
                    <span><strong>Wax:</strong> {product.waxType}</span>
                    <span><strong>Burn Time:</strong> {product.burnTime}</span>
                  </div>
                </div>
              )}

              {product.category === "crochet-flowers" && (
                <div className="bg-white/80 rounded-2xl p-4 border border-[#EADBCE] mb-5 text-xs space-y-1.5">
                  <div className="font-medium text-[#241517]">Everlasting Flower Details:</div>
                  <div className="text-[#5A4B4D]"><strong>Material:</strong> {product.yarnMaterial}</div>
                  <div className="text-[#5A4B4D]"><strong>Stem Length:</strong> {product.stemLength}</div>
                  <div className="text-[11px] text-[#736163] italic mt-1">
                    Internal floral wire enables natural styling and bending in any vase.
                  </div>
                </div>
              )}

              {product.category === "hampers" && product.hamperContents && (
                <div className="bg-white/80 rounded-2xl p-4 border border-[#EADBCE] mb-5 text-xs space-y-2">
                  <div className="font-medium text-[#241517] flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#6B1D2F]" /> What is inside this Hamper:
                  </div>
                  <ul className="space-y-1 text-[#4A3B3D]">
                    {product.hamperContents.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#6B1D2F] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Variants Selector */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-6">
                  <label className="block text-xs font-medium text-[#4A3B3D] mb-2">
                    Choose Option / Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selectedVariant?.id === v.id
                            ? "bg-[#6B1D2F] text-white border-[#6B1D2F]"
                            : "bg-white text-[#4A3B3D] border-[#EADBCE] hover:border-[#6B1D2F]"
                        }`}
                      >
                        {v.name} ({formatPrice(v.price)})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#EADBCE] space-y-2 mt-4">
              <button
                onClick={handleAdd}
                className="w-full bg-[#6B1D2F] hover:bg-[#521422] text-white py-3 rounded-full text-sm font-medium tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? "Added to Gift Bag! ✓" : `Add to Bag · ${formatPrice(currentPrice)}`}</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full border border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 py-2.5 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Inquire & Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
