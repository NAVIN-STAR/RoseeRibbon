"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Package,
  Flame,
  Flower2,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Heart,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CustomHamperItem } from "@/types/product";
import { formatPrice } from "@/lib/utils";

// Step 1: Packaging options (Compulsory - Exactly 1 selected)
const PACKAGING_OPTIONS: CustomHamperItem[] = [
  {
    id: "box-kraft",
    name: "Rigid Keepsake Box with Silk Ribbon",
    price: 249,
    tag: "Signature",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "box-pine",
    name: "Handcrafted Pine Wood Crate",
    price: 449,
    tag: "Rustic Luxury",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "box-tote",
    name: "Pastel Linen Gift Bag with Satin Bow",
    price: 149,
    tag: "Petite & Cute",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
  },
];

// Step 2: Candle options (Optional - multiple & quantities)
const CANDLE_OPTIONS: CustomHamperItem[] = [
  {
    id: "c-lavender",
    name: "French Lavender & Honey Soy Candle (200g)",
    price: 699,
    tag: "Calming",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "c-vanilla",
    name: "Warm Vanilla Santal Amber Candle (220g)",
    price: 749,
    tag: "Cozy & Warm",
    image: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "c-rose",
    name: "Wild Rose & Smoked Oud Candle (250g)",
    price: 799,
    tag: "Romantic",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80",
  },
];

// Step 3: Crochet Flower options (Optional - multiple & quantities)
const CROCHET_OPTIONS: CustomHamperItem[] = [
  {
    id: "cr-tulip",
    name: "The Pastel Tulip Duo Stems (Blush & Buttercup)",
    price: 599,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cr-peony",
    name: "Vintage Blush Peony Eternal Bloom",
    price: 499,
    tag: "Single Showstopper",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cr-daisy",
    name: "Sunshine Daisy & Lavender Wrapped Bouquet",
    price: 1199,
    tag: "Full Arrangement",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
  },
];

// Step 4: Keepsake Add-on options (Optional - multiple & quantities)
const ADDON_OPTIONS: CustomHamperItem[] = [
  {
    id: "a-matches",
    name: "Apothecary Glass Match Bottle with Striker",
    price: 149,
    tag: "Keepsake",
  },
  {
    id: "a-melts",
    name: "Botanical Soy Wax Melts (4-Pack)",
    price: 249,
    tag: "Aromatherapy",
  },
  {
    id: "a-coaster",
    name: "Handmade Terrazzo Trinket Tray / Coaster",
    price: 199,
    tag: "Handmade Decor",
  },
];

export function CustomHamperBuilderModal() {
  const { isHamperBuilderOpen, closeHamperBuilder, addCustomHamper } = useCart();

  // Step 1: Compulsory packaging (always 1 selected)
  const [selectedBox, setSelectedBox] = useState<CustomHamperItem>(PACKAGING_OPTIONS[0]);

  // Steps 2, 3, 4: Quantity maps (id -> number)
  // By default, start with 1 candle and 1 crochet flower, but user can decrease to 0 / uncheck anytime!
  const [candleQtys, setCandleQtys] = useState<Record<string, number>>({
    "c-lavender": 1,
  });
  const [flowerQtys, setFlowerQtys] = useState<Record<string, number>>({
    "cr-tulip": 1,
  });
  const [addonQtys, setAddonQtys] = useState<Record<string, number>>({});
  const [hamperNote, setHamperNote] = useState("");

  if (!isHamperBuilderOpen) return null;

  // Quantity helpers
  const updateCandleQty = (id: string, delta: number) => {
    setCandleQtys((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const copy = { ...prev };
      if (next === 0) {
        delete copy[id];
      } else {
        copy[id] = next;
      }
      return copy;
    });
  };

  const updateFlowerQty = (id: string, delta: number) => {
    setFlowerQtys((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const copy = { ...prev };
      if (next === 0) {
        delete copy[id];
      } else {
        copy[id] = next;
      }
      return copy;
    });
  };

  const updateAddonQty = (id: string, delta: number) => {
    setAddonQtys((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const copy = { ...prev };
      if (next === 0) {
        delete copy[id];
      } else {
        copy[id] = next;
      }
      return copy;
    });
  };

  // Compile line items
  const selectedCandlesList = CANDLE_OPTIONS.filter((c) => (candleQtys[c.id] || 0) > 0).map((c) => ({
    item: c,
    quantity: candleQtys[c.id],
  }));

  const selectedFlowersList = CROCHET_OPTIONS.filter((f) => (flowerQtys[f.id] || 0) > 0).map((f) => ({
    item: f,
    quantity: flowerQtys[f.id],
  }));

  const selectedAddonsList = ADDON_OPTIONS.filter((a) => (addonQtys[a.id] || 0) > 0).map((a) => ({
    item: a,
    quantity: addonQtys[a.id],
  }));

  // Counts
  const totalCandlesCount = selectedCandlesList.reduce((s, c) => s + c.quantity, 0);
  const totalFlowersCount = selectedFlowersList.reduce((s, f) => s + f.quantity, 0);
  const totalAddonsCount = selectedAddonsList.reduce((s, a) => s + a.quantity, 0);
  const totalContentItems = totalCandlesCount + totalFlowersCount + totalAddonsCount;

  // Live total price
  const candlePriceTotal = selectedCandlesList.reduce((s, c) => s + c.item.price * c.quantity, 0);
  const flowerPriceTotal = selectedFlowersList.reduce((s, f) => s + f.item.price * f.quantity, 0);
  const addonPriceTotal = selectedAddonsList.reduce((s, a) => s + a.item.price * a.quantity, 0);
  const totalPrice = selectedBox.price + candlePriceTotal + flowerPriceTotal + addonPriceTotal;

  // Finish & Add 1 Hamper to Bag
  const handleFinishAndAddToCart = () => {
    if (totalContentItems === 0) return;

    addCustomHamper(
      {
        packaging: selectedBox,
        candles: selectedCandlesList,
        crochetFlowers: selectedFlowersList,
        addons: selectedAddonsList,
        personalNote: hamperNote,
      },
      totalPrice
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeHamperBuilder}
          className="fixed inset-0 bg-[#241517]/45 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className="relative bg-[#FAF6F0] w-full max-w-4xl rounded-[32px] shadow-2xl border border-[#EADBCE] overflow-hidden z-15 my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EADBCE] bg-white/70 flex items-center justify-between shrink-0">
            <div>
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#736163] flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6B1D2F]" />
                Interactive Hamper Studio
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#241517] font-normal">
                Curate Your Custom Gift Hamper
              </h2>
              <p className="text-xs text-[#5A4B4D] mt-1">
                Customize any combination (e.g., 5 candles with 1 crochet, all candles, or all blooms).
              </p>
            </div>
            <button
              onClick={closeHamperBuilder}
              className="p-2 rounded-full hover:bg-black/5 text-[#241517] transition-colors"
              aria-label="Close builder"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Builder Steps Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
            
            {/* Step 1: Packaging Style (COMPULSORY - Exactly 1) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs flex items-center justify-center font-medium">
                    1
                  </span>
                  <h3 className="font-serif text-lg text-[#241517]">
                    Choose Packaging Base <span className="text-xs text-[#6B1D2F] font-sans font-medium">(Required)</span>
                  </h3>
                </div>
                <span className="text-xs text-[#736163]">
                  Selected: <strong className="text-[#241517]">{selectedBox.name.split(" ")[0]}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACKAGING_OPTIONS.map((box) => {
                  const isSelected = selectedBox.id === box.id;
                  return (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-white border-[#6B1D2F] shadow-sm"
                          : "bg-white/60 border-[#EADBCE] hover:border-[#6B1D2F]/50"
                      }`}
                    >
                      {box.image && (
                        <div className="relative aspect-[4/2.6] rounded-xl overflow-hidden mb-2.5 bg-[#F5EFE6]">
                          <Image src={box.image} alt={box.name} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium uppercase text-[#736163] bg-[#FAF6F0] px-2 py-0.5 rounded-full">
                          {box.tag}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <div className="text-xs font-medium text-[#241517] line-clamp-1">{box.name}</div>
                      <div className="text-xs font-serif font-medium text-[#6B1D2F] mt-1">
                        {formatPrice(box.price)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Soy Candles (OPTIONAL - Uncheckable + Multi Quantity) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs flex items-center justify-center font-medium">
                    2
                  </span>
                  <h3 className="font-serif text-lg text-[#241517]">
                    Hand-Poured Soy Candles <span className="text-xs text-[#736163] font-sans font-normal">(Optional · Add as many as you like)</span>
                  </h3>
                </div>
                {totalCandlesCount > 0 ? (
                  <button
                    onClick={() => setCandleQtys({})}
                    className="text-xs text-[#6B1D2F] hover:underline font-medium"
                  >
                    Uncheck all candles ({totalCandlesCount})
                  </button>
                ) : (
                  <span className="text-xs text-[#736163] italic">0 candles selected</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CANDLE_OPTIONS.map((c) => {
                  const qty = candleQtys[c.id] || 0;
                  const isSelected = qty > 0;
                  return (
                    <div
                      key={c.id}
                      className={`relative p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-white border-[#6B1D2F] shadow-sm"
                          : "bg-white/60 border-[#EADBCE]"
                      }`}
                    >
                      <div>
                        {c.image && (
                          <div className="relative aspect-[4/2.6] rounded-xl overflow-hidden mb-2.5 bg-[#F5EFE6]">
                            <Image src={c.image} alt={c.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium uppercase text-[#736163] bg-[#FAF6F0] px-2 py-0.5 rounded-full">
                            {c.tag}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-semibold text-[#6B1D2F] bg-[#6B1D2F]/10 px-2 py-0.5 rounded-full">
                              In Hamper: {qty}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-medium text-[#241517] line-clamp-1">{c.name}</div>
                        <div className="text-xs font-serif font-medium text-[#6B1D2F] mt-1">
                          {formatPrice(c.price)} each
                        </div>
                      </div>

                      {/* Stepper / Toggle Button */}
                      <div className="pt-3 mt-2 border-t border-[#EADBCE]/60 flex items-center justify-between">
                        {isSelected ? (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5 bg-[#FAF6F0] rounded-full px-2 py-1 border border-[#EADBCE]">
                              <button
                                onClick={() => updateCandleQty(c.id, -1)}
                                className="p-0.5 hover:text-[#6B1D2F]"
                                aria-label="Decrease candle quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold text-[#241517] px-2">{qty}</span>
                              <button
                                onClick={() => updateCandleQty(c.id, 1)}
                                className="p-0.5 hover:text-[#6B1D2F]"
                                aria-label="Increase candle quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => updateCandleQty(c.id, -qty)}
                              className="text-[11px] text-[#736163] hover:text-[#6B1D2F] underline"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateCandleQty(c.id, 1)}
                            className="w-full py-1.5 rounded-full border border-[#6B1D2F]/30 hover:bg-[#6B1D2F] hover:text-white text-[#241517] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#6B1D2F]" />
                            <span>Add to Hamper</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Everlasting Crochet Blooms (OPTIONAL - Uncheckable + Multi Quantity) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs flex items-center justify-center font-medium">
                    3
                  </span>
                  <h3 className="font-serif text-lg text-[#241517]">
                    Everlasting Crochet Blooms <span className="text-xs text-[#736163] font-sans font-normal">(Optional · Add as many as you like)</span>
                  </h3>
                </div>
                {totalFlowersCount > 0 ? (
                  <button
                    onClick={() => setFlowerQtys({})}
                    className="text-xs text-[#6B1D2F] hover:underline font-medium"
                  >
                    Uncheck all flowers ({totalFlowersCount})
                  </button>
                ) : (
                  <span className="text-xs text-[#736163] italic">0 flowers selected</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CROCHET_OPTIONS.map((f) => {
                  const qty = flowerQtys[f.id] || 0;
                  const isSelected = qty > 0;
                  return (
                    <div
                      key={f.id}
                      className={`relative p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-white border-[#6B1D2F] shadow-sm"
                          : "bg-white/60 border-[#EADBCE]"
                      }`}
                    >
                      <div>
                        {f.image && (
                          <div className="relative aspect-[4/2.6] rounded-xl overflow-hidden mb-2.5 bg-[#F5EFE6]">
                            <Image src={f.image} alt={f.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium uppercase text-[#736163] bg-[#FAF6F0] px-2 py-0.5 rounded-full">
                            {f.tag}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-semibold text-[#6B1D2F] bg-[#6B1D2F]/10 px-2 py-0.5 rounded-full">
                              In Hamper: {qty}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-medium text-[#241517] line-clamp-1">{f.name}</div>
                        <div className="text-xs font-serif font-medium text-[#6B1D2F] mt-1">
                          {formatPrice(f.price)} each
                        </div>
                      </div>

                      {/* Stepper / Toggle Button */}
                      <div className="pt-3 mt-2 border-t border-[#EADBCE]/60 flex items-center justify-between">
                        {isSelected ? (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5 bg-[#FAF6F0] rounded-full px-2 py-1 border border-[#EADBCE]">
                              <button
                                onClick={() => updateFlowerQty(f.id, -1)}
                                className="p-0.5 hover:text-[#6B1D2F]"
                                aria-label="Decrease flower quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold text-[#241517] px-2">{qty}</span>
                              <button
                                onClick={() => updateFlowerQty(f.id, 1)}
                                className="p-0.5 hover:text-[#6B1D2F]"
                                aria-label="Increase flower quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => updateFlowerQty(f.id, -qty)}
                              className="text-[11px] text-[#736163] hover:text-[#6B1D2F] underline"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateFlowerQty(f.id, 1)}
                            className="w-full py-1.5 rounded-full border border-[#6B1D2F]/30 hover:bg-[#6B1D2F] hover:text-white text-[#241517] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#6B1D2F]" />
                            <span>Add to Hamper</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Keepsake Extras (OPTIONAL) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#6B1D2F] text-white text-xs flex items-center justify-center font-medium">
                    4
                  </span>
                  <h3 className="font-serif text-lg text-[#241517]">
                    Keepsake Extras & Touch-ups <span className="text-xs text-[#736163] font-sans font-normal">(Optional)</span>
                  </h3>
                </div>
                {totalAddonsCount > 0 && (
                  <button
                    onClick={() => setAddonQtys({})}
                    className="text-xs text-[#6B1D2F] hover:underline font-medium"
                  >
                    Uncheck extras
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ADDON_OPTIONS.map((addon) => {
                  const qty = addonQtys[addon.id] || 0;
                  const isSelected = qty > 0;
                  return (
                    <div
                      key={addon.id}
                      className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-white border-[#6B1D2F] shadow-sm"
                          : "bg-white/60 border-[#EADBCE]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium uppercase text-[#736163] bg-[#FAF6F0] px-2 py-0.5 rounded-full">
                          {addon.tag}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-semibold text-[#6B1D2F] bg-[#6B1D2F]/10 px-2 py-0.5 rounded-full">
                            Qty: {qty}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-medium text-[#241517]">{addon.name}</div>
                      <div className="text-xs font-serif font-medium text-[#6B1D2F] mt-1 mb-2">
                        +{formatPrice(addon.price)} each
                      </div>

                      <div className="pt-2 border-t border-[#EADBCE]/50 flex items-center justify-between">
                        {isSelected ? (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5 bg-[#FAF6F0] rounded-full px-2 py-1 border border-[#EADBCE]">
                              <button
                                onClick={() => updateAddonQty(addon.id, -1)}
                                className="p-0.5 hover:text-[#6B1D2F]"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold text-[#241517] px-2">{qty}</span>
                              <button
                                onClick={() => updateAddonQty(addon.id, 1)}
                                className="p-0.5 hover:text-[#6B1D2F]"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => updateAddonQty(addon.id, -qty)}
                              className="text-[11px] text-[#736163] hover:text-[#6B1D2F] underline"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateAddonQty(addon.id, 1)}
                            className="w-full py-1 rounded-full border border-[#6B1D2F]/30 hover:bg-[#6B1D2F] hover:text-white text-[#241517] text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#6B1D2F]" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Inside-the-Box Note */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EADBCE]">
              <label className="text-xs font-medium text-[#241517] flex items-center gap-1.5 mb-1.5">
                <Heart className="w-3.5 h-3.5 text-[#6B1D2F]" />
                Wax-Sealed Note inside this Hamper (Optional)
              </label>
              <textarea
                rows={2}
                value={hamperNote}
                onChange={(e) => setHamperNote(e.target.value)}
                placeholder="e.g. 'To the love of my life, wishing you warmth and blooming joy...'"
                className="w-full text-xs p-3 rounded-xl border border-[#EADBCE] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1D2F] text-[#241517]"
              />
            </div>

          </div>

          {/* Sticky Live Bar Footer */}
          <div className="p-4 sm:p-6 border-t border-[#EADBCE] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div>
              <div className="text-[11px] text-[#736163]">
                Your Box ({selectedBox.name.split(" ")[0]}) has:{" "}
                <strong className="text-[#241517]">
                  {[
                    totalCandlesCount > 0 ? `${totalCandlesCount} Candles` : null,
                    totalFlowersCount > 0 ? `${totalFlowersCount} Blooms` : null,
                    totalAddonsCount > 0 ? `${totalAddonsCount} Extras` : null,
                  ]
                    .filter(Boolean)
                    .join(" + ") || "No items inside yet"}
                </strong>
              </div>
              <div className="text-xl sm:text-2xl font-serif font-medium text-[#241517]">
                Total: <span className="text-[#6B1D2F]">{formatPrice(totalPrice)}</span>
                <span className="text-xs font-sans text-[#736163] font-normal ml-2">
                  (Includes ribbon wrap & taxes)
                </span>
              </div>
            </div>

            {totalContentItems === 0 ? (
              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-full">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Please select at least 1 candle, bloom, or extra to pack into your hamper.</span>
              </div>
            ) : (
              <button
                onClick={handleFinishAndAddToCart}
                className="w-full sm:w-auto bg-[#6B1D2F] hover:bg-[#521422] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Bundle as 1 Hamper & Add to Bag</span>
              </button>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
