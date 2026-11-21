"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, CategoryId, CustomHamperDetails, Product, ProductVariant } from "@/types/product";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  addCustomHamper: (details: CustomHamperDetails, totalPrice: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  customMessage: string;
  setCustomMessage: (msg: string) => void;
  pincode: string;
  setPincode: (pin: string) => void;
  
  // Custom Hamper Builder Modal State
  isHamperBuilderOpen: boolean;
  openHamperBuilder: () => void;
  closeHamperBuilder: () => void;

  // Active Catalog Category Filter (Syncs Navbar with Catalog)
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "rosee_ribbon_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHamperBuilderOpen, setIsHamperBuilderOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [customMessage, setCustomMessage] = useState("");
  const [pincode, setPincode] = useState("Bangalore, Karnataka");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore errors reading localStorage
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore errors writing to localStorage
    }
  }, [items, mounted]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const openHamperBuilder = () => setIsHamperBuilderOpen(true);
  const closeHamperBuilder = () => setIsHamperBuilderOpen(false);

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === variant?.id &&
          !item.customHamperDetails
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedVariant: variant }];
      }
    });
    setIsOpen(true);
  };

  /**
   * Bundles customer's selections into 1 single Custom Hamper CartItem
   */
  const addCustomHamper = (details: CustomHamperDetails, totalPrice: number) => {
    const customId = `custom-hamper-${Date.now()}`;
    
    // Construct dynamic description
    const candleCount = details.candles.reduce((s, c) => s + c.quantity, 0);
    const flowerCount = details.crochetFlowers.reduce((s, f) => s + f.quantity, 0);
    const addonCount = details.addons.reduce((s, a) => s + a.quantity, 0);

    const summaries: string[] = [];
    if (candleCount > 0) summaries.push(`${candleCount} ${candleCount === 1 ? "Candle" : "Candles"}`);
    if (flowerCount > 0) summaries.push(`${flowerCount} ${flowerCount === 1 ? "Bloom" : "Blooms"}`);
    if (addonCount > 0) summaries.push(`${addonCount} ${addonCount === 1 ? "Extra" : "Extras"}`);

    const summaryText = summaries.length > 0 ? summaries.join(", ") : "Custom curated items";

    const customProduct: Product = {
      id: customId,
      slug: customId,
      name: `Custom Hamper (${details.packaging.name})`,
      category: "hampers",
      categoryLabel: "Custom Curated Hamper",
      basePrice: totalPrice,
      shortDescription: `Curated with ${summaryText}.`,
      description: "Custom bespoke hamper assembled with signature Rosee Ribbon satin bow & wax seal.",
      image: details.packaging.image || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      tags: ["custom", "bespoke", "hamper"],
    };

    setItems((prev) => [
      ...prev,
      {
        product: customProduct,
        quantity: 1,
        customHamperDetails: details,
      },
    ]);

    setIsHamperBuilderOpen(false);
    setIsOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedVariant?.id === variantId)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant?.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = item.selectedVariant ? item.selectedVariant.price : item.product.basePrice;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        addCustomHamper,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        customMessage,
        setCustomMessage,
        pincode,
        setPincode,
        isHamperBuilderOpen,
        openHamperBuilder,
        closeHamperBuilder,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
