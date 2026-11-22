"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  ShoppingBag,
  Plus,
  Minus,
  Heart,
  AlertCircle,
  Search,
  Flame,
  Flower2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CustomHamperItem, CustomHamperLineItem, Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";

// Compulsory Step 1 Packaging Options
const PACKAGING_OPTIONS: CustomHamperItem[] = [
  {
    id: "box-signature",
    name: "Classic Presentation Gift Box",
    price: 149,
    tag: "Signature White & Kraft",
    image: "/images/hampers/signature-box.jpg",
  },
  {
    id: "box-premium",
    name: "Deluxe Keepsake Box with Satin Bow",
    price: 249,
    tag: "Deluxe Pink Keepsake",
    image: "/images/hampers/premium-box.jpg",
  },
];

// Derived Catalog Groups
const CANDLE_PRODUCTS = products.filter((p) => p.category === "candles");
const CROCHET_STEM_PRODUCTS = products.filter(
  (p) => p.category === "crochet-flowers" && p.crochetSubcategory === "single"
);
const CROCHET_BOUQUET_PRODUCTS = products.filter(
  (p) => p.category === "crochet-flowers" && p.crochetSubcategory === "bouquet"
);

type FilterTab = "all" | "candles" | "stems" | "bouquets";

export function CustomHamperBuilderModal() {
  const { isHamperBuilderOpen, closeHamperBuilder, addCustomHamper } = useCart();

  // Step 1: Compulsory packaging
  const [selectedBox, setSelectedBox] = useState<CustomHamperItem>(PACKAGING_OPTIONS[0]);

  // Selected variant per product (productId -> variantId)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    "candle-sculpted-peony": "peony-crimson",
    "candle-meadow-daisy": "daisy-white",
  });

  // Quantities for items (key: productId__variantId, or productId, or addon__addonId)
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "candle-sculpted-peony__peony-crimson": 1,
    "crochet-single-rose": 1,
  });

  // Search & Filter Tabs
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [hamperNote, setHamperNote] = useState("");

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (isHamperBuilderOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isHamperBuilderOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isHamperBuilderOpen) {
        closeHamperBuilder();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHamperBuilderOpen, closeHamperBuilder]);

  // Helpers to resolve active variant and item keys
  const getActiveVariant = (product: Product): ProductVariant | undefined => {
    if (!product.variants || product.variants.length === 0) return undefined;
    const currentId = selectedVariants[product.id] || product.variants[0].id;
    return product.variants.find((v) => v.id === currentId) || product.variants[0];
  };

  const getItemKey = (product: Product, variant?: ProductVariant): string => {
    if (variant) return `${product.id}__${variant.id}`;
    return product.id;
  };

  const updateQty = (key: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[key] || 0;
      const next = Math.max(0, current + delta);
      const copy = { ...prev };
      if (next === 0) {
        delete copy[key];
      } else {
        copy[key] = next;
      }
      return copy;
    });
  };

  // Compile selected items lists with color information
  const selectedCandlesList = useMemo<CustomHamperLineItem[]>(() => {
    const list: CustomHamperLineItem[] = [];
    CANDLE_PRODUCTS.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((v) => {
          const key = getItemKey(product, v);
          const qty = quantities[key] || 0;
          if (qty > 0) {
            list.push({
              item: {
                id: key,
                name: `${product.name} (${v.name})`,
                price: v.price,
                image: v.image || product.image,
                tag: v.name,
                color: v.name,
                variantId: v.id,
                variantName: v.name,
              },
              quantity: qty,
            });
          }
        });
      } else {
        const qty = quantities[product.id] || 0;
        if (qty > 0) {
          list.push({
            item: {
              id: product.id,
              name: product.name,
              price: product.basePrice,
              image: product.image,
              tag: product.badge || "Glass Candle",
            },
            quantity: qty,
          });
        }
      }
    });
    return list;
  }, [quantities]);

  const selectedFlowersList = useMemo<CustomHamperLineItem[]>(() => {
    const list: CustomHamperLineItem[] = [];
    [...CROCHET_STEM_PRODUCTS, ...CROCHET_BOUQUET_PRODUCTS].forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((v) => {
          const key = getItemKey(product, v);
          const qty = quantities[key] || 0;
          if (qty > 0) {
            list.push({
              item: {
                id: key,
                name: `${product.name} (${v.name})`,
                price: v.price,
                image: v.image || product.image,
                tag: v.name,
                color: v.name,
                variantId: v.id,
                variantName: v.name,
              },
              quantity: qty,
            });
          }
        });
      } else {
        const qty = quantities[product.id] || 0;
        if (qty > 0) {
          list.push({
            item: {
              id: product.id,
              name: product.name,
              price: product.basePrice,
              image: product.image,
              tag: product.badge || (product.crochetSubcategory === "single" ? "Single Stem" : "Bouquet"),
            },
            quantity: qty,
          });
        }
      }
    });
    return list;
  }, [quantities]);

  // Aggregate item counts and pricing
  const totalCandlesCount = selectedCandlesList.reduce((s, c) => s + c.quantity, 0);
  const totalFlowersCount = selectedFlowersList.reduce((s, f) => s + f.quantity, 0);
  const totalContentItems = totalCandlesCount + totalFlowersCount;

  const candlePriceTotal = selectedCandlesList.reduce((s, c) => s + c.item.price * c.quantity, 0);
  const flowerPriceTotal = selectedFlowersList.reduce((s, f) => s + f.item.price * f.quantity, 0);
  const totalPrice = selectedBox.price + candlePriceTotal + flowerPriceTotal;

  // Search filtering
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filterFn = (product: Product) => {
      if (!q) return true;
      const inName = product.name.toLowerCase().includes(q);
      const inDesc = product.shortDescription.toLowerCase().includes(q);
      const inTags = product.tags.some((t) => t.toLowerCase().includes(q));
      const inVariants = product.variants?.some((v) => v.name.toLowerCase().includes(q)) ?? false;
      return inName || inDesc || inTags || inVariants;
    };

    const candles = CANDLE_PRODUCTS.filter(filterFn);
    const stems = CROCHET_STEM_PRODUCTS.filter(filterFn);
    const bouquets = CROCHET_BOUQUET_PRODUCTS.filter(filterFn);

    return { candles, stems, bouquets };
  }, [searchQuery]);

  const hasAnyResults =
    filteredItems.candles.length > 0 ||
    filteredItems.stems.length > 0 ||
    filteredItems.bouquets.length > 0;

  const handleFinishAndAddToCart = () => {
    if (totalContentItems === 0) return;

    addCustomHamper(
      {
        packaging: selectedBox,
        candles: selectedCandlesList,
        crochetFlowers: selectedFlowersList,
        addons: [],
        personalNote: hamperNote,
      },
      totalPrice
    );
  };

  // Render a product item card with interactive variant/color chips
  const renderProductCard = (product: Product) => {
    const activeVar = getActiveVariant(product);
    const activeKey = getItemKey(product, activeVar);
    const activeQty = quantities[activeKey] || 0;
    const isSelected = activeQty > 0;

    // Display image and price depending on variant selection
    const displayImage = activeVar?.image || product.image;
    const displayPrice = activeVar ? activeVar.price : product.basePrice;

    // Sum of all variants of this product in the box
    const totalProductQty = product.variants
      ? product.variants.reduce((acc, v) => acc + (quantities[getItemKey(product, v)] || 0), 0)
      : activeQty;

    return (
      <div
        key={product.id}
        className={`relative p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
          totalProductQty > 0
            ? "bg-white border-[#4A121A] shadow-subtle ring-1 ring-[#4A121A]/10"
            : "bg-white/95 border-[#D5C7B7] hover:border-[#4A121A]/50 hover:bg-white"
        }`}
      >
        <div>
          {/* Product Image */}
          <div className="relative aspect-[4/2.7] rounded-xl overflow-hidden mb-2.5 bg-[#F5EFE6]">
            <Image
              src={displayImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 160px, 260px"
              loading="lazy"
              className="object-cover transition-transform duration-300 hover:scale-103"
            />
          </div>

          {/* Badges */}
          <div className="flex items-center justify-between mb-1.5 gap-2">
            <span className="text-[10px] font-bold uppercase text-[#4A121A] bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#E8DFD3] truncate max-w-[150px]">
              {activeVar?.name || product.badge || product.categoryLabel}
            </span>
            {totalProductQty > 0 && (
              <span className="text-[10px] font-bold text-[#4A121A] bg-[#4A121A]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                In Box: {totalProductQty}
              </span>
            )}
          </div>

          <div className="text-xs font-semibold text-[#14080A] line-clamp-1 mb-1" title={product.name}>
            {product.name}
          </div>

          {/* Color / Variant Option Selector Chips */}
          {product.variants && product.variants.length > 1 && (
            <div className="my-2 p-1.5 bg-[#FAF6F0] rounded-xl border border-[#E8DFD3]/80">
              <div className="text-[9px] uppercase font-bold text-[#4A121A] mb-1 flex items-center justify-between">
                <span>Select Color:</span>
                <span className="text-[#14080A] font-semibold">{activeVar?.name}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.variants.map((v) => {
                  const isVarSelected = activeVar?.id === v.id;
                  const varKey = getItemKey(product, v);
                  const varQty = quantities[varKey] || 0;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [product.id]: v.id,
                        }))
                      }
                      className={`px-2 py-0.5 rounded-md text-[10px] font-sans transition-all flex items-center gap-1 ${
                        isVarSelected
                          ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                          : "bg-white text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                      }`}
                    >
                      <span>{v.name}</span>
                      {varQty > 0 && (
                        <span
                          className={`text-[9px] px-1 rounded-full font-bold ${
                            isVarSelected ? "bg-white text-[#4A121A]" : "bg-[#4A121A] text-white"
                          }`}
                        >
                          {varQty}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="text-xs font-serif font-bold text-[#4A121A] mt-1">
            {formatPrice(displayPrice)} each
          </div>
        </div>

        {/* Stepper / Add button */}
        <div className="pt-3 mt-2 border-t border-[#E8DFD3] flex items-center justify-between">
          {isSelected ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 bg-[#FAF6F0] rounded-full px-2 py-1 border border-[#D5C7B7]">
                <button
                  type="button"
                  onClick={() => updateQty(activeKey, -1)}
                  className="p-0.5 hover:text-[#4A121A] active:scale-90 transition-transform"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#14080A] px-2">{activeQty}</span>
                <button
                  type="button"
                  onClick={() => updateQty(activeKey, 1)}
                  className="p-0.5 hover:text-[#4A121A] active:scale-90 transition-transform"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => updateQty(activeKey, -activeQty)}
                className="text-[11px] text-[#4A3538] hover:text-[#4A121A] underline font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => updateQty(activeKey, 1)}
              className="w-full py-1.5 rounded-full border border-[#4A121A] hover:bg-[#4A121A] hover:text-white text-[#4A121A] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 bg-white shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Box</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isHamperBuilderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop (clean GPU dark overlay, zero blur lag) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeHamperBuilder}
            className="fixed inset-0 bg-[#14080A]/65"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="relative bg-[#FAF6F0] w-full max-w-4xl rounded-[32px] shadow-2xl border border-[#E8DFD3] overflow-hidden z-20 my-6 flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#E8DFD3] bg-white flex items-center justify-between shrink-0">
              <div>
                <div className="text-[11px] font-sans font-semibold tracking-wider uppercase text-[#4A121A] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4A121A]" />
                  Bespoke Studio Gifting
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#14080A] font-medium leading-tight">
                  Curate Your Custom Hamper
                </h2>
                <p className="text-xs text-[#553E41] mt-1 font-sans">
                  Choose your luxury packaging, then mix & match botanical soy candles and everlasting crochet blooms.
                </p>
              </div>
              <button
                onClick={closeHamperBuilder}
                className="p-2 rounded-full hover:bg-black/5 text-[#14080A] transition-colors"
                aria-label="Close builder"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Builder Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-7 space-y-6 sm:space-y-8 font-sans">
              
              {/* Step 1: Packaging Base */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#4A121A] text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#14080A]">
                      Select Packaging Base <span className="text-xs text-[#4A121A] font-sans font-bold">(Required)</span>
                    </h3>
                  </div>
                  <span className="text-xs text-[#3D282B] font-medium">
                    Selected: <strong className="text-[#14080A] font-bold">{selectedBox.name}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {PACKAGING_OPTIONS.map((box) => {
                    const isSelected = selectedBox.id === box.id;
                    return (
                      <div
                        key={box.id}
                        onClick={() => setSelectedBox(box)}
                        className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "bg-white border-[#4A121A] shadow-subtle ring-1 ring-[#4A121A]/10"
                            : "bg-white/90 border-[#D5C7B7] hover:border-[#4A121A]/70"
                        }`}
                      >
                        {box.image && (
                          <div className="relative aspect-[4/2.6] rounded-xl overflow-hidden mb-2.5 bg-[#F5EFE6]">
                            <Image
                              src={box.image}
                              alt={box.name}
                              fill
                              sizes="(max-width: 640px) 300px, 320px"
                              loading="lazy"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase text-[#4A121A] bg-[#FAF6F0] px-2.5 py-0.5 rounded-full border border-[#E8DFD3]">
                            {box.tag}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#4A121A] text-white flex items-center justify-center shadow-xs">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-[#14080A]">{box.name}</div>
                        <div className="text-xs font-serif font-bold text-[#4A121A] mt-1">
                          {formatPrice(box.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Content Selection with Live Search & Category Tabs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#4A121A] text-white text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#14080A]">
                      Choose Items to Pack into Box
                    </h3>
                  </div>
                  <span className="text-xs text-[#4A121A] font-bold">
                    {totalContentItems} {totalContentItems === 1 ? "item" : "items"} added
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative mb-3">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736163]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by flower, candle, color or scent (e.g. Peony, Rose, Daisy, Matcha, Lily, Blush)..."
                    className="w-full text-xs pl-10 pr-9 py-2.5 rounded-full border border-[#D5C7B7] bg-white text-[#14080A] placeholder-[#8C7A7C] focus:outline-none focus:border-[#4A121A] focus:ring-1 focus:ring-[#4A121A] transition-all shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736163] hover:text-[#14080A] p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5 pb-1">
                  {[
                    { id: "all", label: `All Items (${products.length - 2})` },
                    { id: "candles", label: `🕯️ Soy Candles (${CANDLE_PRODUCTS.length})` },
                    { id: "stems", label: `🌿 Crochet Stems (${CROCHET_STEM_PRODUCTS.length})` },
                    { id: "bouquets", label: `💐 Luxury Bouquets (${CROCHET_BOUQUET_PRODUCTS.length})` },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as FilterTab)}
                        className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                          isActive
                            ? "bg-[#4A121A] text-white font-semibold shadow-xs"
                            : "bg-white text-[#14080A] font-medium border border-[#D5C7B7] hover:border-[#4A121A]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Empty Search State */}
                {!hasAnyResults && (
                  <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-[#D5C7B7]">
                    <Search className="w-8 h-8 text-[#8C7A7C] mx-auto mb-2" />
                    <div className="font-serif text-lg text-[#14080A] font-semibold mb-1">
                      No matching creations found
                    </div>
                    <p className="text-xs text-[#736163] mb-4">
                      We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching for &quot;rose&quot;, &quot;peony&quot;, &quot;matcha&quot;, or &quot;daisy&quot;.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="px-4 py-1.5 rounded-full bg-[#4A121A] text-white text-xs font-semibold hover:bg-[#350C12]"
                    >
                      Clear Search
                    </button>
                  </div>
                )}

                {/* Group: Soy Candles */}
                {(activeTab === "all" || activeTab === "candles") && filteredItems.candles.length > 0 && (
                  <div className="mb-7">
                    <div className="flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-wider text-[#4A121A] mb-3">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Botanical Soy Candles ({filteredItems.candles.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
                      {filteredItems.candles.map(renderProductCard)}
                    </div>
                  </div>
                )}

                {/* Group: Crochet Stems */}
                {(activeTab === "all" || activeTab === "stems") && filteredItems.stems.length > 0 && (
                  <div className="mb-7">
                    <div className="flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-wider text-[#4A121A] mb-3">
                      <Flower2 className="w-3.5 h-3.5" />
                      <span>Everlasting Single Stems ({filteredItems.stems.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
                      {filteredItems.stems.map(renderProductCard)}
                    </div>
                  </div>
                )}

                {/* Group: Luxury Bouquets */}
                {(activeTab === "all" || activeTab === "bouquets") && filteredItems.bouquets.length > 0 && (
                  <div className="mb-7">
                    <div className="flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-wider text-[#4A121A] mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Handcrafted Luxury Bouquets ({filteredItems.bouquets.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
                      {filteredItems.bouquets.map(renderProductCard)}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Inside-the-Box Personalized Message Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D5C7B7]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#14080A] flex items-center gap-1.5">
                    <Image
                      src="/images/brand/logo-emblem.png"
                      alt="Rosee Ribbon Seal"
                      width={16}
                      height={22}
                      className="h-4 w-auto object-contain opacity-80"
                    />
                    <span>Personalized Handwritten Card (Complimentary)</span>
                  </label>
                  <span className="text-[10px] text-[#736163]">Optional</span>
                </div>
                <textarea
                  rows={2}
                  value={hamperNote}
                  onChange={(e) => setHamperNote(e.target.value)}
                  placeholder="Write your personal message to be handwritten inside the keepsake box..."
                  maxLength={250}
                  className="w-full text-xs p-3 rounded-xl border border-[#D5C7B7] bg-[#FAF6F0] focus:outline-none focus:border-[#4A121A] focus:bg-white text-[#14080A] font-medium placeholder:text-[#6B5A5C] resize-none transition-colors"
                />
                <div className="text-[10px] text-[#736163] text-right mt-1">
                  {hamperNote.length}/250 characters
                </div>
              </div>

            </div>

            {/* Bottom Bar with Expandable Itemized List */}
            <div className="border-t border-[#D5C7B7] bg-white shrink-0 font-sans shadow-lg">
              {/* Expandable Selected Items Drawer */}
              {isSummaryExpanded && (
                <div className="p-4 sm:p-5 bg-[#FAF6F0] border-b border-[#D5C7B7] max-h-48 overflow-y-auto space-y-2 text-xs">
                  <div className="font-bold text-[#14080A] flex items-center justify-between mb-1">
                    <span>Packed in Box:</span>
                    <button
                      type="button"
                      onClick={() => setQuantities({})}
                      className="text-[#4A121A] hover:underline text-[11px] font-normal"
                    >
                      Clear all items
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[#3D282B] py-1 border-b border-[#E8DFD3]">
                    <span>📦 {selectedBox.name}</span>
                    <span className="font-bold">{formatPrice(selectedBox.price)}</span>
                  </div>
                  {selectedCandlesList.map((c) => (
                    <div key={c.item.id} className="flex items-center justify-between py-1 border-b border-[#E8DFD3]">
                      <span>🕯️ {c.quantity}× {c.item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{formatPrice(c.item.price * c.quantity)}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(c.item.id, -c.quantity)}
                          className="text-[#736163] hover:text-[#4A121A] p-0.5"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {selectedFlowersList.map((f) => (
                    <div key={f.item.id} className="flex items-center justify-between py-1 border-b border-[#E8DFD3]">
                      <span>🧶 {f.quantity}× {f.item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{formatPrice(f.item.price * f.quantity)}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(f.item.id, -f.quantity)}
                          className="text-[#736163] hover:text-[#4A121A] p-0.5"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Main Actions Bar */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#3D282B] font-medium">
                      Box: <strong className="text-[#14080A] font-bold">{selectedBox.name.split(" ")[0]}</strong> ·{" "}
                      {[
                        totalCandlesCount > 0 ? `${totalCandlesCount} Candles` : null,
                        totalFlowersCount > 0 ? `${totalFlowersCount} Blooms` : null,
                      ]
                        .filter(Boolean)
                        .join(" + ") || "Empty"}
                    </span>
                    {totalContentItems > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsSummaryExpanded((prev) => !prev)}
                        className="text-[11px] font-bold text-[#4A121A] hover:underline flex items-center gap-0.5"
                      >
                        <span>{isSummaryExpanded ? "Hide contents" : "View packed items"}</span>
                        {isSummaryExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#14080A]">
                    Total: <span className="text-[#4A121A]">{formatPrice(totalPrice)}</span>
                    <span className="text-xs font-sans text-[#4A3538] font-normal ml-2">
                      (Includes silk ribbon & card)
                    </span>
                  </div>
                </div>

                {totalContentItems === 0 ? (
                  <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-full">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Select at least 1 candle or bloom to bundle your hamper.</span>
                  </div>
                ) : (
                  <button
                    onClick={handleFinishAndAddToCart}
                    className="w-full sm:w-auto bg-[#4A121A] hover:bg-[#350C12] text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-luxury flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Bundle as 1 Hamper & Add to Bag</span>
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
