"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MessageCircle, ShoppingBag, Flame, Flower2, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { getSingleProductWhatsAppUrl } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product | null;
  initialVariant?: ProductVariant;
  onClose: () => void;
}

export function ProductModal({ product, initialVariant, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    initialVariant || (product?.variants ? product.variants[0] : undefined)
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Hamper custom color choices
  const isHamper = product?.category === "hampers";
  const isPremiumHamper = product?.id === "hamper-02";
  const [hamperPeonyColor, setHamperPeonyColor] = useState<string>("Crimson Red");
  const [hamperDaisyColor, setHamperDaisyColor] = useState<string>("Cream White");
  const [hamperJarCandle, setHamperJarCandle] = useState<string>("The Love Beneath");
  const [hamperCustomMessage, setHamperCustomMessage] = useState<string>("");

  const getHamperPrice = () => {
    if (isPremiumHamper) return 1399;
    return 799;
  };

  const activeHamperVariant: ProductVariant | undefined = isHamper && product
    ? {
        id: `${product.id}-${hamperPeonyColor}-${hamperDaisyColor}-${isPremiumHamper ? hamperJarCandle : "sig"}`,
        name: isPremiumHamper
          ? `${hamperPeonyColor} Peony · ${hamperDaisyColor} Daisy · ${hamperJarCandle}`
          : `${hamperPeonyColor} Peony · ${hamperDaisyColor} Daisy`,
        price: getHamperPrice(),
        inStock: true,
        image: product.image,
      }
    : selectedVariant;

  // Sync state whenever product changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(initialVariant || (product.variants ? product.variants[0] : undefined));
      setActiveImageIndex(0);
      setHamperPeonyColor("Crimson Red");
      setHamperDaisyColor("Cream White");
      setHamperJarCandle("The Love Beneath");
      setHamperCustomMessage("");
    }
  }, [product, initialVariant]);

  if (!product) return null;

  // Active gallery list
  const currentImages: string[] = selectedVariant?.images?.length
    ? selectedVariant.images
    : product.images?.length
    ? product.images
    : [selectedVariant?.image || product.image];

  const displayImage = currentImages[activeImageIndex] || currentImages[0] || product.image;
  const currentPrice = isHamper
    ? getHamperPrice()
    : selectedVariant
    ? selectedVariant.price
    : product.basePrice;

  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setActiveImageIndex(0);
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleAdd = () => {
    addToCart(
      product,
      isHamper ? activeHamperVariant : selectedVariant,
      1,
      isHamper ? hamperCustomMessage : undefined
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const handleDirectWhatsApp = () => {
    const url = getSingleProductWhatsAppUrl(
      product,
      isHamper ? activeHamperVariant : selectedVariant,
      undefined,
      isHamper ? hamperCustomMessage : undefined
    );
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
          className="fixed inset-0 bg-[#14080A]/60 transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative bg-[#FAF6F0] w-full max-w-3xl rounded-[24px] sm:rounded-[32px] shadow-2xl border border-[#E8DFD3] overflow-hidden z-10 my-auto flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#1F1315] shadow-xs transition-colors touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery Showcase */}
          <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-between bg-[#F5EFE6]/60 shrink-0">
            <div className="relative aspect-[4/3.5] sm:aspect-[4/4.8] max-h-[240px] md:max-h-none w-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-white shadow-sm border border-[#E8DFD3]">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#4A121A] text-white text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-full shadow-sm">
                  {product.badge}
                </div>
              )}

              {/* Navigation arrows for gallery */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1F1315] flex items-center justify-center shadow-sm transition-all touch-manipulation"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1F1315] flex items-center justify-center shadow-sm transition-all touch-manipulation"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {currentImages.length > 1 && (
              <div className="flex gap-2 mt-2.5 sm:mt-3 overflow-x-auto no-scrollbar py-1">
                {currentImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      idx === activeImageIndex
                        ? "border-[#4A121A] scale-102"
                        : "border-transparent opacity-65 hover:opacity-100"
                    }`}
                  >
                    <Image src={imgUrl} alt={`Thumbnail ${idx + 1}`} fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Narrative & Configuration */}
          <div className="md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category Eyebrow */}
              <div className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#4A121A] mb-1.5 flex items-center gap-1.5">
                {product.category === "candles" && <Flame className="w-3.5 h-3.5 text-[#4A121A]" />}
                {product.category === "crochet-flowers" && <Flower2 className="w-3.5 h-3.5 text-[#4A121A]" />}
                {product.category === "hampers" && <Gift className="w-3.5 h-3.5 text-[#4A121A]" />}
                <span>{product.categoryLabel}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14080A] mb-2 leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="text-2xl font-serif font-bold text-[#14080A] mb-3">
                {formatPrice(currentPrice)}
                <span className="text-xs font-sans text-[#4A3538] font-semibold ml-2">
                  (Incl. all taxes & calligraphy card)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#241517] leading-relaxed mb-4 font-sans">
                {product.description}
              </p>

              {/* Category Specifications */}
              {product.category === "candles" && product.scentNotes && (
                <div className="bg-white rounded-2xl p-4 border border-[#E8DFD3] mb-5 space-y-2 text-xs">
                  <div className="font-sans font-bold text-[#14080A] text-xs">Scent Profile</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[#FAF6F0] p-2 rounded-xl">
                      <div className="text-[10px] text-[#553E41] uppercase font-sans font-bold">Top</div>
                      <div className="font-semibold text-[#14080A] text-[11px]">{product.scentNotes.top}</div>
                    </div>
                    <div className="bg-[#FAF6F0] p-2 rounded-xl">
                      <div className="text-[10px] text-[#553E41] uppercase font-sans font-bold">Heart</div>
                      <div className="font-semibold text-[#14080A] text-[11px]">{product.scentNotes.heart}</div>
                    </div>
                    <div className="bg-[#FAF6F0] p-2 rounded-xl">
                      <div className="text-[10px] text-[#553E41] uppercase font-sans font-bold">Base</div>
                      <div className="font-semibold text-[#14080A] text-[11px]">{product.scentNotes.base}</div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 text-[11px] text-[#241517] font-medium">
                    <span>Wax: {product.waxType}</span>
                    <span>Burn: {product.burnTime}</span>
                  </div>
                </div>
              )}

              {product.category === "crochet-flowers" && (
                <div className="bg-white rounded-2xl p-4 border border-[#E8DFD3] mb-4 text-xs space-y-1.5 font-sans">
                  <div className="font-bold text-[#14080A]">Everlasting Craft Details:</div>
                  <div className="text-[#14080A] font-medium">Material: {product.yarnMaterial}</div>
                  <div className="text-[#14080A] font-medium">Dimensions: {product.stemLength}</div>
                  <div className="text-[11px] text-[#553E41] italic pt-1">
                    Internal floral wire enables natural styling and bending into any vase.
                  </div>
                </div>
              )}

              {product.category === "hampers" && product.hamperContents && (
                <div className="bg-white rounded-2xl p-4 border border-[#E8DFD3] mb-4 text-xs space-y-2 font-sans">
                  <div className="font-bold text-[#14080A]">What is inside this Hamper:</div>
                  <ul className="space-y-1.5 text-[#241517]">
                    {product.hamperContents.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#4A121A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hamper Color Selection Options */}
              {isHamper && (
                <div className="bg-white rounded-2xl p-4 border border-[#E8DFD3] mb-5 space-y-3.5 font-sans">
                  <div className="font-bold text-xs uppercase tracking-wider text-[#4A121A]">
                    Select Your Box Color Options:
                  </div>

                  {/* Peony Color */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-[#14080A]">1. Peony Candle Color:</span>
                      <span className="font-semibold text-[#4A121A]">{hamperPeonyColor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Crimson Red", "Blush Pink"].map((color) => {
                        const isSelected = hamperPeonyColor === color;
                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setHamperPeonyColor(color)}
                            className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                              isSelected
                                ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                                : "bg-[#FAF6F0] text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
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
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-[#14080A]">2. Daisy Candle Color:</span>
                      <span className="font-semibold text-[#4A121A]">{hamperDaisyColor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Cream White", "Mint Green", "Coral Rose"].map((color) => {
                        const isSelected = hamperDaisyColor === color;
                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setHamperDaisyColor(color)}
                            className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                              isSelected
                                ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                                : "bg-[#FAF6F0] text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
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
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-[#14080A]">3. Artisanal Glass/Jar Candle:</span>
                        <span className="font-semibold text-[#4A121A]">{hamperJarCandle}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: "The Love Beneath", val: "The Love Beneath" },
                          { name: "The Iced Matcha Latte", val: "The Iced Matcha Latte" },
                          { name: "The Sunflower Bloom", val: "The Sunflower Bloom" },
                        ].map((jar) => {
                          const isSelected = hamperJarCandle === jar.val;
                          return (
                            <button
                              key={jar.val}
                              type="button"
                              onClick={() => setHamperJarCandle(jar.val)}
                              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                                isSelected
                                  ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                                  : "bg-[#FAF6F0] text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                              }`}
                            >
                              {jar.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Custom Card Message Section */}
                  <div className="pt-3 border-t border-[#E8DFD3]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-[#14080A] flex items-center gap-1.5">
                        <Image
                          src="/images/brand/logo-emblem.png"
                          alt="Rosee Ribbon Seal"
                          width={16}
                          height={22}
                          className="h-4 w-auto object-contain opacity-80"
                        />
                        Handwritten Card Message:
                      </span>
                      <span className="text-[10px] text-[#4A121A] font-semibold bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#D5C7B7]">
                        Custom Keepsake Card
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={hamperCustomMessage}
                      onChange={(e) => setHamperCustomMessage(e.target.value)}
                      placeholder="Enter your personal greeting or message to be handwritten on the card..."
                      maxLength={250}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D5C7B7] bg-[#FAF6F0] text-[#14080A] placeholder-[#8C7A7C] focus:outline-none focus:border-[#4A121A] focus:bg-white focus:ring-1 focus:ring-[#4A121A] transition-colors resize-none"
                    />
                    <div className="text-[10px] text-[#736163] text-right mt-0.5 font-sans">
                      {hamperCustomMessage.length}/250 characters
                    </div>
                  </div>

                  <div className="text-[11px] text-[#553E41] pt-1 italic">
                    Includes {isPremiumHamper ? "2x" : "1x"} Handcrafted Velvet Rose Mini Bouquet with petite wrap & custom keepsake card.
                  </div>
                </div>
              )}

              {/* Standard Variants Selector for Non-Hampers */}
              {!isHamper && product.variants && product.variants.length > 1 && (
                <div className="mb-5">
                  <label className="block text-xs font-sans font-bold text-[#14080A] mb-2">
                    {product.category === "candles"
                      ? "Choose Color / Option:"
                      : product.allowStemCount
                      ? "Select Stem Quantity:"
                      : "Choose Option / Arrangement:"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => handleSelectVariant(v)}
                        className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                          selectedVariant?.id === v.id
                            ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                            : "bg-white text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                        }`}
                      >
                        {v.name} &bull; {formatPrice(v.price)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#E8DFD3] space-y-2 mt-4">
              <button
                onClick={handleAdd}
                className="w-full bg-[#4A121A] hover:bg-[#350C12] text-white py-3 rounded-full text-xs sm:text-sm font-sans font-medium shadow-sm flex items-center justify-center gap-2 transition-all active:translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? "Added to Bag! ✓" : `Add to Bag · ${formatPrice(currentPrice)}`}</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full border border-[#25D366]/60 text-[#128C7E] hover:bg-[#25D366]/10 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order via WhatsApp Direct</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
