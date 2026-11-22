"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Eye, ChevronLeft, ChevronRight, Minus } from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, initialVariant?: ProductVariant) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants ? product.variants[0] : undefined
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Hamper custom color choices
  const isHamper = product.category === "hampers";
  const isPremiumHamper = product.id === "hamper-02";
  const [hamperPeonyColor, setHamperPeonyColor] = useState<string>("Crimson Red");
  const [hamperDaisyColor, setHamperDaisyColor] = useState<string>("Cream White");
  const [hamperJarCandle, setHamperJarCandle] = useState<string>("The Love Beneath");
  const [hamperCustomMessage, setHamperCustomMessage] = useState<string>("");

  const getHamperPrice = () => {
    if (isPremiumHamper) return 1399;
    return 799;
  };

  // Gallery images list (from variant or product)
  const currentImages = selectedVariant?.images?.length
    ? selectedVariant.images
    : product.images?.length
    ? product.images
    : [selectedVariant?.image || product.image];

  const displayImage =
    currentImages[activeImageIndex] ||
    selectedVariant?.image ||
    product.image;

  const currentPrice = isHamper
    ? getHamperPrice()
    : selectedVariant
    ? selectedVariant.price
    : product.basePrice;

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleSelectVariant = (e: React.MouseEvent, variant: ProductVariant) => {
    e.stopPropagation();
    setSelectedVariant(variant);
    setActiveImageIndex(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isHamper) {
      const variantName = isPremiumHamper
        ? `${hamperPeonyColor} Peony · ${hamperDaisyColor} Daisy · ${hamperJarCandle}`
        : `${hamperPeonyColor} Peony · ${hamperDaisyColor} Daisy`;
      const hamperVariant: ProductVariant = {
        id: `${product.id}-${hamperPeonyColor}-${hamperDaisyColor}-${isPremiumHamper ? hamperJarCandle : "sig"}`,
        name: variantName,
        price: getHamperPrice(),
        inStock: true,
        image: product.image,
      };
      addToCart(product, hamperVariant, 1, hamperCustomMessage);
    } else {
      addToCart(product, selectedVariant);
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product, selectedVariant)}
      className="group relative bg-white rounded-[24px] p-3 sm:p-4 border border-[#E8DFD3] shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/4.8] w-full rounded-[18px] overflow-hidden bg-[#F5EFE6] mb-3.5 select-none">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />

        {/* Minimal Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#4A121A] text-white text-[10px] font-sans font-medium tracking-wide px-2.5 py-0.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.category === "candles" && product.burnTime && (
            <span className="bg-white/95 text-[#1F1315] text-[10px] font-sans font-medium px-2 py-0.5 rounded-full shadow-sm">
              {product.burnTime}
            </span>
          )}
          {product.category === "crochet-flowers" && (
            <span className="bg-white/95 text-[#1F1315] text-[10px] font-sans font-medium px-2 py-0.5 rounded-full shadow-sm">
              Everlasting
            </span>
          )}
        </div>

        {/* Multi-Image Carousel Arrows (Visible when hovered or on mobile if > 1 image) */}
        {currentImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              title="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#1F1315] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              title="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#1F1315] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide Dots */}
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
              {currentImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeImageIndex
                      ? "w-4 bg-[#4A121A]"
                      : "w-1.5 bg-black/20"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white text-[#1F1315] text-xs font-sans font-medium px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#4A121A]" /> View Details
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Micro Category Label */}
          <div className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#4A121A] mb-1">
            {product.categoryLabel}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-[#14080A] leading-tight group-hover:text-[#4A121A] transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Sensory Subtitle */}
          <p className="text-xs sm:text-[13px] text-[#2D1C1F] line-clamp-2 leading-relaxed mb-3 font-sans">
            {product.shortDescription}
          </p>

          {/* Scent or Material Spec Tag */}
          {product.scentNotes && (
            <div className="text-[11px] text-[#241517] bg-[#FAF6F0] px-2.5 py-1 rounded-lg mb-3 line-clamp-1 border border-[#D5C7B7] font-sans">
              <span className="font-semibold text-[#14080A]">Notes:</span> {product.scentNotes.top}
            </div>
          )}
          {product.yarnMaterial && (
            <div className="text-[11px] text-[#241517] bg-[#FAF6F0] px-2.5 py-1 rounded-lg mb-3 line-clamp-1 border border-[#D5C7B7] font-sans">
              <span className="font-semibold text-[#14080A]">Craft:</span> {product.yarnMaterial}
            </div>
          )}

          {/* Single Flowers: Stem Count Option Selector */}
          {product.allowStemCount && product.variants && product.variants.length > 1 && (
            <div className="mb-3">
              <div className="text-[10px] font-sans uppercase font-bold text-[#4A121A] mb-1.5">
                Stem Quantity:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={(e) => handleSelectVariant(e, v)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition-all ${
                        isSelected
                          ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                          : "bg-[#FAF6F0] text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                      }`}
                    >
                      {v.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Candles: Color & Option Selector */}
          {product.category === "candles" && product.variants && product.variants.length > 1 && (
            <div className="mb-3">
              <div className="text-[10px] font-sans uppercase font-bold text-[#4A121A] mb-1.5">
                Choose Color / Option:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={(e) => handleSelectVariant(e, v)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition-all ${
                        isSelected
                          ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                          : "bg-[#FAF6F0] text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                      }`}
                    >
                      {v.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bouquets: Arrangement Selector */}
          {product.crochetSubcategory === "bouquet" && product.variants && product.variants.length > 1 && (
            <div className="mb-3">
              <div className="text-[10px] font-sans uppercase font-bold text-[#4A121A] mb-1.5">
                Choose Arrangement:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={(e) => handleSelectVariant(e, v)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition-all text-left ${
                        isSelected
                          ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                          : "bg-[#FAF6F0] text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                      }`}
                    >
                      {v.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hampers: Candle Color & Option Selector */}
          {isHamper && (
            <div className="mb-3 space-y-2.5 bg-[#FAF6F0]/80 p-2.5 rounded-xl border border-[#D5C7B7]">
              {/* Peony Color */}
              <div>
                <div className="text-[10px] font-sans uppercase font-bold text-[#4A121A] mb-1 flex items-center justify-between">
                  <span>Peony Candle Color:</span>
                  <span className="text-[#14080A] font-semibold">{hamperPeonyColor}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Crimson Red", "Blush Pink"].map((color) => {
                    const isSelected = hamperPeonyColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHamperPeonyColor(color);
                        }}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-sans transition-all ${
                          isSelected
                            ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                            : "bg-white text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Daisy Color */}
              <div>
                <div className="text-[10px] font-sans uppercase font-bold text-[#4A121A] mb-1 flex items-center justify-between">
                  <span>Daisy Candle Color:</span>
                  <span className="text-[#14080A] font-semibold">{hamperDaisyColor}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Cream White", "Mint Green", "Coral Rose"].map((color) => {
                    const isSelected = hamperDaisyColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHamperDaisyColor(color);
                        }}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-sans transition-all ${
                          isSelected
                            ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                            : "bg-white text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Premium Hamper Only: Glass Candle Choice */}
              {isPremiumHamper && (
                <div>
                  <div className="text-[10px] font-sans uppercase font-bold text-[#4A121A] mb-1 flex items-center justify-between">
                    <span>Glass Candle:</span>
                    <span className="text-[#14080A] font-semibold">{hamperJarCandle}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "Love Beneath", val: "The Love Beneath" },
                      { name: "Iced Matcha", val: "The Iced Matcha Latte" },
                      { name: "Sunflower Bloom", val: "The Sunflower Bloom" },
                    ].map((jar) => {
                      const isSelected = hamperJarCandle === jar.val;
                      return (
                        <button
                          key={jar.val}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHamperJarCandle(jar.val);
                          }}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-sans transition-all ${
                            isSelected
                              ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                              : "bg-white text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                          }`}
                        >
                          {jar.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Card Message */}
              <div className="pt-2 border-t border-[#D5C7B7]/70">
                <div className="text-[10px] font-sans uppercase font-bold text-[#4A121A] mb-1 flex items-center justify-between">
                  <span>💌 Custom Card Message:</span>
                  <span className="text-[9px] text-[#736163] font-normal lowercase">optional</span>
                </div>
                <input
                  type="text"
                  value={hamperCustomMessage}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setHamperCustomMessage(e.target.value)}
                  placeholder="Enter greeting for the card..."
                  maxLength={160}
                  className="w-full text-[11px] px-2.5 py-1.5 rounded-lg border border-[#D5C7B7] bg-white text-[#14080A] placeholder-[#8C7A7C] focus:outline-none focus:border-[#4A121A] focus:ring-1 focus:ring-[#4A121A]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Price and Action Row */}
        <div className="pt-3.5 border-t border-[#E8DFD3] flex items-center justify-between gap-3 mt-auto">
          <div>
            <div className="text-[10px] text-[#4A121A] uppercase tracking-wider font-sans font-bold">
              {isHamper || (product.variants && product.variants.length > 1) ? "Selected" : "Price"}
            </div>
            <div className="text-2xl sm:text-[26px] font-serif font-bold text-[#14080A] leading-none mt-0.5">
              {formatPrice(currentPrice)}
            </div>
          </div>

          <div>
            {/* Add to Bag */}
            <button
              onClick={handleAddToCart}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                addedAnimation
                  ? "bg-[#25D366] text-white"
                  : "bg-[#4A121A] hover:bg-[#350C12] text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{addedAnimation ? "Added!" : "Add to Bag"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
