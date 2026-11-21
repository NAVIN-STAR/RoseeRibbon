"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle, Heart, Sparkles, MapPin, Package, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { getCartOrderWhatsAppUrl } from "@/lib/whatsapp";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    customMessage,
    setCustomMessage,
    pincode,
    setPincode,
    openHamperBuilder,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    const url = getCartOrderWhatsAppUrl(items, customMessage, pincode);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#241517]/30 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Slide-over Sheet with Emil Kowalski spring */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl border-l border-[#EADBCE] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#EADBCE] flex items-center justify-between bg-white/60">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl text-[#241517]">Your Gift Bag</span>
                  <span className="bg-[#6B1D2F] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-full hover:bg-black/5 text-[#241517] transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-2xl border border-[#EADBCE]">
                      🌸
                    </div>
                    <h3 className="font-serif text-lg text-[#241517]">Your gift bag is empty</h3>
                    <p className="text-xs text-[#736163] max-w-xs mx-auto">
                      Explore our handcrafted candles, everlasting crochet blooms, or build a custom hamper.
                    </p>
                    <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
                      <button
                        onClick={closeCart}
                        className="px-6 py-2.5 rounded-full bg-[#6B1D2F] text-white text-xs font-medium tracking-wide shadow-sm"
                      >
                        Browse Creations
                      </button>
                      <button
                        onClick={() => {
                          closeCart();
                          openHamperBuilder();
                        }}
                        className="px-6 py-2.5 rounded-full border border-[#6B1D2F]/40 text-[#6B1D2F] hover:bg-white text-xs font-medium"
                      >
                        ✨ Build Custom Hamper
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Item List */}
                    <div className="space-y-3">
                      {items.map((item, idx) => {
                        const price = item.selectedVariant
                          ? item.selectedVariant.price
                          : item.product.basePrice;

                        const isCustomHamper = Boolean(item.customHamperDetails);
                        const h = item.customHamperDetails;

                        return (
                          <div
                            key={`${item.product.id}-${item.selectedVariant?.id || idx}`}
                            className="bg-white rounded-2xl p-3.5 border border-[#EADBCE]/80 flex flex-col gap-2 shadow-subtle"
                          >
                            <div className="flex gap-3 items-center">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE6] shrink-0 border border-[#EADBCE]/50">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  {isCustomHamper && (
                                    <span className="bg-[#6B1D2F] text-white text-[9px] font-semibold px-2 py-0.2 rounded-full uppercase tracking-wider">
                                      Custom Hamper
                                    </span>
                                  )}
                                  <h4 className="font-serif text-sm font-medium text-[#241517] truncate">
                                    {item.product.name}
                                  </h4>
                                </div>

                                {item.selectedVariant && (
                                  <div className="text-[11px] text-[#736163]">
                                    {item.selectedVariant.name}
                                  </div>
                                )}
                                <div className="text-xs font-medium text-[#6B1D2F] mt-0.5">
                                  {formatPrice(price)}
                                </div>
                              </div>

                              {/* Stepper */}
                              <div className="flex items-center gap-1.5 bg-[#FAF6F0] rounded-full px-2 py-1 border border-[#EADBCE]/60">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1,
                                      item.selectedVariant?.id
                                    )
                                  }
                                  className="p-0.5 hover:text-[#6B1D2F]"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-medium text-[#241517] px-1">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1,
                                      item.selectedVariant?.id
                                    )
                                  }
                                  className="p-0.5 hover:text-[#6B1D2F]"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() =>
                                  removeFromCart(item.product.id, item.selectedVariant?.id)
                                }
                                className="text-[#736163] hover:text-[#6B1D2F] p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Custom Hamper Detailed Recipe Breakdown */}
                            {isCustomHamper && h && (
                              <div className="pt-2 mt-1 border-t border-[#EADBCE]/50 text-[11px] text-[#5A4B4D] space-y-1 bg-[#FAF6F0]/70 p-2.5 rounded-xl">
                                <div className="font-medium text-[#241517] flex items-center gap-1">
                                  <Package className="w-3 h-3 text-[#6B1D2F]" /> Box Contents:
                                </div>
                                <div className="pl-3.5 space-y-0.5">
                                  <div>• <strong>Box:</strong> {h.packaging.name}</div>
                                  {h.candles.length > 0 && (
                                    <div>
                                      • <strong>Candles ({h.candles.reduce((s, c) => s + c.quantity, 0)}):</strong>{" "}
                                      {h.candles.map((c) => `${c.quantity}× ${c.item.name.split("(")[0]}`).join(", ")}
                                    </div>
                                  )}
                                  {h.crochetFlowers.length > 0 && (
                                    <div>
                                      • <strong>Blooms ({h.crochetFlowers.reduce((s, f) => s + f.quantity, 0)}):</strong>{" "}
                                      {h.crochetFlowers.map((f) => `${f.quantity}× ${f.item.name.split("(")[0]}`).join(", ")}
                                    </div>
                                  )}
                                  {h.addons.length > 0 && (
                                    <div>
                                      • <strong>Extras:</strong>{" "}
                                      {h.addons.map((a) => `${a.quantity}× ${a.item.name.split("(")[0]}`).join(", ")}
                                    </div>
                                  )}
                                  {h.personalNote && h.personalNote.trim() && (
                                    <div className="italic text-[#736163]">
                                      • <strong>Note:</strong> &ldquo;{h.personalNote}&rdquo;
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Complimentary Card Message Section */}
                    <div className="bg-white rounded-2xl p-4 border border-[#EADBCE] space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-[#241517] flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-[#6B1D2F]" />
                          Complimentary Message Card
                        </label>
                        <span className="text-[10px] text-[#736163]">Handwritten with wax seal</span>
                      </div>
                      <textarea
                        rows={2}
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Write your personal message to be included on the card..."
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1D2F] text-[#241517] placeholder:text-[#8A797B]"
                      />
                    </div>

                    {/* Bangalore Delivery Area / Address */}
                    <div className="bg-white rounded-2xl p-4 border border-[#EADBCE] space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-[#241517] flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#6B1D2F]" />
                          Delivery Location
                        </label>
                        <span className="text-[10px] font-medium text-[#6B1D2F] bg-[#6B1D2F]/10 px-2 py-0.5 rounded-full">
                          Bangalore Delivery
                        </span>
                      </div>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. Indiranagar, Koramangala, Whitefield, or address..."
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF6F0] focus:outline-none focus:border-[#6B1D2F] text-[#241517]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer with WhatsApp Action */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[#EADBCE] bg-white space-y-3">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-[#5A4B4D]">
                      <span>Items Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#5A4B4D]">
                      <span>Signature Ribbon Wrap & Box</span>
                      <span className="text-[#128C7E] font-medium">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between font-serif text-base text-[#241517] pt-2 border-t border-[#EADBCE]">
                      <span>Estimated Total</span>
                      <span className="text-[#6B1D2F] font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="text-[10px] text-[#736163] text-right">
                      (All taxes included)
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsAppCheckout}
                    disabled={isSubmitting}
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 rounded-full text-sm font-medium tracking-wide shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Proceed to Order on WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-center text-[#736163]">
                    Orders are reviewed and confirmed directly with our Bangalore atelier on WhatsApp.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
