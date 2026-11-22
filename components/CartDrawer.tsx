"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle, Heart, Sparkles, MapPin, Package, Gift, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { getCartOrderWhatsAppUrl } from "@/lib/whatsapp";
import { products } from "@/data/products";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    orderTotal,
    isFreeDelivery,
    freeDeliveryRemaining,
    customMessage,
    setCustomMessage,
    deliveryAddress,
    updateDeliveryAddress,
    openHamperBuilder,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddressErrors, setShowAddressErrors] = useState(false);

  const addressSectionRef = React.useRef<HTMLDivElement>(null);
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const phoneInputRef = React.useRef<HTMLInputElement>(null);
  const flatInputRef = React.useRef<HTMLInputElement>(null);
  const pinInputRef = React.useRef<HTMLInputElement>(null);
  const cityInputRef = React.useRef<HTMLInputElement>(null);

  // Address validation: Name, 10-digit Phone, Flat/Building, 5-6 digit PIN, City & State
  const isAddressValid = Boolean(
    deliveryAddress.fullName?.trim() &&
    deliveryAddress.phoneNumber?.replace(/\D/g, "").length >= 10 &&
    deliveryAddress.flatBuilding?.trim() &&
    deliveryAddress.pincode?.trim().length >= 5 &&
    deliveryAddress.cityState?.trim()
  );

  const nameError = showAddressErrors && !deliveryAddress.fullName?.trim();
  const phoneError =
    showAddressErrors &&
    deliveryAddress.phoneNumber?.replace(/\D/g, "").length < 10;
  const flatError = showAddressErrors && !deliveryAddress.flatBuilding?.trim();
  const pinError =
    showAddressErrors && deliveryAddress.pincode?.trim().length < 5;
  const cityError = showAddressErrors && !deliveryAddress.cityState?.trim();

  // Lock body scroll when cart is open on mobile and desktop
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    if (!isAddressValid) {
      setShowAddressErrors(true);
      addressSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (!deliveryAddress.fullName?.trim()) {
        nameInputRef.current?.focus();
      } else if (deliveryAddress.phoneNumber?.replace(/\D/g, "").length < 10) {
        phoneInputRef.current?.focus();
      } else if (!deliveryAddress.flatBuilding?.trim()) {
        flatInputRef.current?.focus();
      } else if (deliveryAddress.pincode?.trim().length < 5) {
        pinInputRef.current?.focus();
      } else if (!deliveryAddress.cityState?.trim()) {
        cityInputRef.current?.focus();
      }
      return;
    }
    setIsSubmitting(true);
    const url = getCartOrderWhatsAppUrl(items, customMessage, deliveryAddress);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop (clean GPU dark overlay, zero blur lag) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#14080A]/60"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            {/* Slide-over Sheet with native 120fps GPU transform */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              style={{ willChange: "transform" }}
              className="w-full sm:w-[440px] sm:max-w-md bg-[#FAF6F0] shadow-2xl border-l border-[#EADBCE] flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-[#EADBCE] flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg sm:text-xl font-semibold text-[#14080A]">Your Gift Bag</span>
                  <span className="bg-[#4A121A] text-white text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 -mr-1 rounded-full hover:bg-black/5 text-[#14080A] transition-colors touch-manipulation"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items Body */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-5 space-y-3 sm:space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12 sm:py-16 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-2xl border border-[#EADBCE]">
                      🌸
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#14080A]">Your gift bag is empty</h3>
                    <p className="text-xs sm:text-[13px] text-[#2D1C1F] max-w-xs mx-auto">
                      Explore our handcrafted candles, everlasting crochet blooms, or build a custom hamper.
                    </p>
                    <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
                      <button
                        onClick={closeCart}
                        className="px-6 py-2.5 rounded-full bg-[#4A121A] hover:bg-[#350C12] text-white text-xs font-semibold tracking-wide shadow-sm"
                      >
                        Browse Creations
                      </button>
                      <button
                        onClick={() => {
                          closeCart();
                          openHamperBuilder();
                        }}
                        className="px-6 py-2.5 rounded-full border-2 border-[#4A121A]/30 text-[#4A121A] hover:bg-white text-xs font-semibold"
                      >
                        ✨ Build Custom Hamper
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Free Delivery Threshold Bar */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#D5C7B7] mb-2 sm:mb-3 shadow-2xs">
                      <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
                        <div className="font-semibold text-[#14080A] flex items-center gap-1.5 min-w-0">
                          <Truck className="w-3.5 h-3.5 text-[#4A121A] shrink-0" />
                          {isFreeDelivery ? (
                            <span className="text-[#0A6C5E] font-bold text-xs truncate">🎉 FREE Delivery Unlocked!</span>
                          ) : (
                            <span className="text-[11px] sm:text-xs">
                              Add <strong className="text-[#4A121A]">{formatPrice(freeDeliveryRemaining)}</strong> more for <strong className="text-[#0A6C5E]">FREE Delivery</strong>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-[#4A121A] shrink-0">
                          {isFreeDelivery ? "100%" : `${Math.min(100, Math.round((subtotal / 999) * 100))}%`}
                        </span>
                      </div>
                      {/* Progress Track */}
                      <div className="w-full h-2 bg-[#FAF6F0] rounded-full overflow-hidden border border-[#E8DFD3]">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            isFreeDelivery ? "bg-[#0A6C5E]" : "bg-[#4A121A]"
                          }`}
                          style={{ width: `${Math.min(100, (subtotal / 999) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#736163] mt-1.5 font-sans">
                        <span>Standard: {isFreeDelivery ? "FREE" : "₹100 (Below ₹999)"}</span>
                        <span className="font-semibold text-[#4A121A]">Free above ₹999</span>
                      </div>
                    </div>

                    {/* Item List */}
                    <div className="space-y-3">
                      {items.map((item, idx) => {
                        const price = item.selectedVariant
                          ? item.selectedVariant.price
                          : item.product.basePrice;

                        const isCustomHamper = Boolean(item.customHamperDetails);
                        const h = item.customHamperDetails;

                        // Match catalog product and variant to resolve the exact photo
                        const catalogProduct =
                          products.find((p) => p.id === item.product.id) || item.product;
                        const matchingVariant =
                          item.selectedVariant?.id && catalogProduct.variants
                            ? catalogProduct.variants.find(
                                (v) => v.id === item.selectedVariant?.id
                              ) || item.selectedVariant
                            : item.selectedVariant;

                        // Priority: variant specific image > variant gallery image > custom hamper packaging > product image
                        const itemImage =
                          matchingVariant?.image ||
                          matchingVariant?.images?.[0] ||
                          item.selectedVariant?.image ||
                          item.selectedVariant?.images?.[0] ||
                          (isCustomHamper && item.customHamperDetails?.packaging?.image) ||
                          catalogProduct.image ||
                          item.product.image;

                        const itemAlt = (matchingVariant || item.selectedVariant)?.name
                          ? `${item.product.name} - ${(matchingVariant || item.selectedVariant)?.name}`
                          : item.product.name;

                        return (
                          <div
                            key={`${item.product.id}-${item.selectedVariant?.id || idx}`}
                            className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#D5C7B7] flex flex-col gap-2.5 shadow-subtle"
                          >
                            <div className="flex gap-3 items-start">
                              {/* Thumbnail */}
                              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-[#F5EFE6] shrink-0 border border-[#EADBCE]/80 mt-0.5">
                                <Image
                                  src={itemImage}
                                  alt={itemAlt}
                                  fill
                                  sizes="72px"
                                  className="object-cover"
                                />
                              </div>

                              {/* Info & controls */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1.5">
                                  <div className="min-w-0 flex-1">
                                    {isCustomHamper && (
                                      <span className="inline-block bg-[#4A121A] text-white text-[9px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider mb-0.5">
                                        Custom Hamper
                                      </span>
                                    )}
                                    <h4 className="font-serif text-sm sm:text-base font-semibold text-[#14080A] leading-snug line-clamp-2">
                                      {item.product.name}
                                    </h4>
                                  </div>

                                  <button
                                    onClick={() =>
                                      removeFromCart(item.product.id, item.selectedVariant?.id)
                                    }
                                    className="text-[#8C7A7C] hover:text-[#4A121A] p-1 -mt-0.5 -mr-1 transition-colors touch-manipulation"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  </button>
                                </div>

                                {(matchingVariant || item.selectedVariant) && (
                                  <div className="text-[11px] text-[#4A3538] font-semibold mt-0.5 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A121A]/70" />
                                    <span>{(matchingVariant || item.selectedVariant)?.name}</span>
                                  </div>
                                )}

                                {item.customCardMessage && item.customCardMessage.trim() && (
                                  <div className="mt-1 text-[11px] text-[#4A121A] bg-[#FAF6F0] px-2 py-1 rounded-md border border-[#D5C7B7] flex items-start gap-1">
                                    <span className="shrink-0">💌</span>
                                    <span className="italic line-clamp-2">"{item.customCardMessage.trim()}"</span>
                                  </div>
                                )}

                                {/* Price & Stepper Row */}
                                <div className="flex items-center justify-between mt-2 pt-1">
                                  <div className="text-xs sm:text-sm font-serif font-bold text-[#4A121A]">
                                    {formatPrice(price * item.quantity)}
                                    {item.quantity > 1 && (
                                      <span className="text-[10px] text-[#736163] font-sans font-normal ml-1">
                                        ({formatPrice(price)} each)
                                      </span>
                                    )}
                                  </div>

                                  {/* Stepper with generous tap targets */}
                                  <div className="flex items-center gap-1.5 bg-[#FAF6F0] rounded-full px-2 py-0.5 border border-[#D5C7B7]">
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          item.product.id,
                                          item.quantity - 1,
                                          item.selectedVariant?.id
                                        )
                                      }
                                      className="p-1 hover:text-[#4A121A] text-[#14080A] transition-colors active:scale-90 touch-manipulation"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-bold text-[#14080A] min-w-[16px] text-center">
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
                                      className="p-1 hover:text-[#4A121A] text-[#14080A] transition-colors active:scale-90 touch-manipulation"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Custom Hamper Detailed Recipe Breakdown */}
                            {isCustomHamper && h && (
                              <div className="pt-2 mt-0.5 border-t border-[#EADBCE] text-[11px] text-[#241517] space-y-1 bg-[#FAF6F0]/80 p-2.5 rounded-xl">
                                <div className="font-semibold text-[#14080A] flex items-center gap-1">
                                  <Package className="w-3 h-3 text-[#4A121A]" /> Box Contents:
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
                                    <div className="italic text-[#4A3538]">
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
                    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#D5C7B7] space-y-2 mt-3 sm:mt-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#14080A] flex items-center gap-1.5">
                          <Image
                            src="/images/brand/logo-emblem.png"
                            alt="Rosee Ribbon Seal"
                            width={16}
                            height={22}
                            className="h-4 w-auto object-contain opacity-80"
                          />
                          Complimentary Message Card
                        </label>
                        <span className="text-[10px] text-[#4A3538] font-medium">Handwritten keepsake card</span>
                      </div>
                      <textarea
                        rows={2}
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Write your personal message to be included on the card..."
                        className="w-full text-xs p-2.5 rounded-xl border border-[#D5C7B7] bg-[#FAF6F0] focus:outline-none focus:border-[#4A121A] text-[#14080A] font-medium placeholder:text-[#6B5A5C] resize-none"
                      />
                    </div>

                    {/* All-India Structured Delivery Address */}
                    <div
                      ref={addressSectionRef}
                      className={`bg-white rounded-2xl p-3.5 sm:p-4 border transition-colors space-y-3 ${
                        showAddressErrors && !isAddressValid
                          ? "border-[#E53E3E] ring-1 ring-[#E53E3E]/30"
                          : "border-[#D5C7B7]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#14080A] flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#4A121A]" />
                          Shipping Address
                        </label>
                        {isAddressValid ? (
                          <span className="text-[10px] font-bold text-[#0A6C5E] bg-[#0A6C5E]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            ✓ Address Complete
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#8C1D2A] bg-[#FFF0EE] border border-[#F5C2B8] px-2.5 py-0.5 rounded-full">
                            * Required to Order
                          </span>
                        )}
                      </div>

                      <div className="space-y-2.5 text-xs">
                        {/* Name & Phone Number */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#553E41] mb-1">
                              Recipient Name *
                            </label>
                            <input
                              ref={nameInputRef}
                              type="text"
                              value={deliveryAddress.fullName}
                              onChange={(e) => updateDeliveryAddress("fullName", e.target.value)}
                              placeholder="Full name"
                              className={`w-full text-xs p-2.5 rounded-xl border bg-[#FAF6F0] focus:outline-none text-[#14080A] font-medium placeholder:text-[#8C7A7C] transition-colors ${
                                nameError
                                  ? "border-[#E53E3E] bg-[#FFF5F5] focus:border-[#E53E3E]"
                                  : "border-[#D5C7B7] focus:border-[#4A121A]"
                              }`}
                            />
                            {nameError && (
                              <p className="text-[10px] text-[#C53030] mt-1 font-semibold">
                                * Recipient name is required
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#553E41] mb-1">
                              Phone Number *
                            </label>
                            <input
                              ref={phoneInputRef}
                              type="tel"
                              value={deliveryAddress.phoneNumber}
                              onChange={(e) => updateDeliveryAddress("phoneNumber", e.target.value)}
                              placeholder="10-digit mobile number"
                              maxLength={15}
                              className={`w-full text-xs p-2.5 rounded-xl border bg-[#FAF6F0] focus:outline-none text-[#14080A] font-medium placeholder:text-[#8C7A7C] transition-colors ${
                                phoneError
                                  ? "border-[#E53E3E] bg-[#FFF5F5] focus:border-[#E53E3E]"
                                  : "border-[#D5C7B7] focus:border-[#4A121A]"
                              }`}
                            />
                            {phoneError && (
                              <p className="text-[10px] text-[#C53030] mt-1 font-semibold">
                                * 10-digit mobile number required
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Flat / Building */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#553E41] mb-1">
                            Flat No., House No., Building Name *
                          </label>
                          <input
                            ref={flatInputRef}
                            type="text"
                            value={deliveryAddress.flatBuilding}
                            onChange={(e) => updateDeliveryAddress("flatBuilding", e.target.value)}
                            placeholder="e.g. Flat 402, Green Glen Towers"
                            className={`w-full text-xs p-2.5 rounded-xl border bg-[#FAF6F0] focus:outline-none text-[#14080A] font-medium placeholder:text-[#8C7A7C] transition-colors ${
                              flatError
                                ? "border-[#E53E3E] bg-[#FFF5F5] focus:border-[#E53E3E]"
                                : "border-[#D5C7B7] focus:border-[#4A121A]"
                            }`}
                          />
                          {flatError && (
                            <p className="text-[10px] text-[#C53030] mt-1 font-semibold">
                              * Flat/house number & building name required
                            </p>
                          )}
                        </div>

                        {/* Street & Area */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#553E41] mb-1">
                            Street, Area & Landmark
                          </label>
                          <input
                            type="text"
                            value={deliveryAddress.streetArea}
                            onChange={(e) => updateDeliveryAddress("streetArea", e.target.value)}
                            placeholder="e.g. 5th Main, Near Metro Station, Indiranagar"
                            className="w-full text-xs p-2.5 rounded-xl border border-[#D5C7B7] bg-[#FAF6F0] focus:outline-none focus:border-[#4A121A] text-[#14080A] font-medium placeholder:text-[#8C7A7C]"
                          />
                        </div>

                        {/* Postal Code & City / State */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#553E41] mb-1">
                              Postal Code (PIN) *
                            </label>
                            <input
                              ref={pinInputRef}
                              type="text"
                              value={deliveryAddress.pincode}
                              onChange={(e) => updateDeliveryAddress("pincode", e.target.value)}
                              placeholder="6-digit PIN code"
                              maxLength={10}
                              className={`w-full text-xs p-2.5 rounded-xl border bg-[#FAF6F0] focus:outline-none text-[#14080A] font-medium placeholder:text-[#8C7A7C] transition-colors ${
                                pinError
                                  ? "border-[#E53E3E] bg-[#FFF5F5] focus:border-[#E53E3E]"
                                  : "border-[#D5C7B7] focus:border-[#4A121A]"
                              }`}
                            />
                            {pinError && (
                              <p className="text-[10px] text-[#C53030] mt-1 font-semibold">
                                * Valid postal PIN required
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#553E41] mb-1">
                              City & State *
                            </label>
                            <input
                              ref={cityInputRef}
                              type="text"
                              value={deliveryAddress.cityState}
                              onChange={(e) => updateDeliveryAddress("cityState", e.target.value)}
                              placeholder="e.g. Bengaluru, Karnataka"
                              className={`w-full text-xs p-2.5 rounded-xl border bg-[#FAF6F0] focus:outline-none text-[#14080A] font-medium placeholder:text-[#8C7A7C] transition-colors ${
                                cityError
                                  ? "border-[#E53E3E] bg-[#FFF5F5] focus:border-[#E53E3E]"
                                  : "border-[#D5C7B7] focus:border-[#4A121A]"
                              }`}
                            />
                            {cityError && (
                              <p className="text-[10px] text-[#C53030] mt-1 font-semibold">
                                * City & State required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer with WhatsApp Action */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-[#D5C7B7] bg-white space-y-2.5 sm:space-y-3 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-[#2D1C1F] font-medium">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-[#14080A]">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#2D1C1F] font-medium text-[11px] sm:text-xs">
                      <span>Signature Ribbon Wrap & Box</span>
                      <span className="text-[#0A6C5E] font-bold">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between text-[#2D1C1F] font-medium items-center text-[11px] sm:text-xs">
                      <span className="flex items-center gap-1">
                        Delivery Charge
                        {!isFreeDelivery && (
                          <span className="text-[10px] text-[#736163]">(Free above ₹999)</span>
                        )}
                      </span>
                      {isFreeDelivery ? (
                        <span className="text-[#0A6C5E] font-bold">FREE</span>
                      ) : (
                        <span className="font-semibold text-[#14080A]">{formatPrice(deliveryFee)}</span>
                      )}
                    </div>
                    <div className="flex justify-between font-serif text-base sm:text-lg text-[#14080A] font-bold pt-1.5 sm:pt-2 border-t border-[#D5C7B7]">
                      <span>Estimated Total</span>
                      <span className="text-[#4A121A]">{formatPrice(orderTotal)}</span>
                    </div>
                    <div className="text-[10px] text-[#4A3538] text-right font-medium">
                      (All taxes included)
                    </div>
                  </div>

                  {/* Address validation reminder banner if incomplete */}
                  {!isAddressValid && (
                    <div className="bg-[#FFF4F2] border border-[#F5C2B8] text-[#8C1D2A] px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-[#8C1D2A] shrink-0" />
                        <span className="font-medium text-[11px] sm:text-xs truncate">
                          Delivery address required to place order
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressErrors(true);
                          addressSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                          if (!deliveryAddress.fullName?.trim()) {
                            nameInputRef.current?.focus();
                          } else if (deliveryAddress.phoneNumber?.replace(/\D/g, "").length < 10) {
                            phoneInputRef.current?.focus();
                          } else if (!deliveryAddress.flatBuilding?.trim()) {
                            flatInputRef.current?.focus();
                          } else if (deliveryAddress.pincode?.trim().length < 5) {
                            pinInputRef.current?.focus();
                          } else if (!deliveryAddress.cityState?.trim()) {
                            cityInputRef.current?.focus();
                          }
                        }}
                        className="text-[10px] sm:text-[11px] font-bold text-[#8C1D2A] underline hover:text-[#4A121A] shrink-0"
                      >
                        Fill Address ↑
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleWhatsAppCheckout}
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] touch-manipulation ${
                      isAddressValid
                        ? "bg-[#25D366] hover:bg-[#1EBE5D] text-white"
                        : "bg-[#EFE8DE] hover:bg-[#E5DCD0] text-[#4A121A] border border-[#D5C7B7]"
                    }`}
                  >
                    {isAddressValid ? (
                      <>
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                        <span>Proceed to Order on WhatsApp</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#8C1D2A]" />
                        <span>Add Delivery Address to Order</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-center text-[#4A3538] font-medium leading-tight">
                    Orders are packed with care in our studio and delivered across India. Confirmed on WhatsApp.
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
