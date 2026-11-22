"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, CategoryId, CustomHamperDetails, Product, ProductVariant, DeliveryAddress } from "@/types/product";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number,
    customCardMessage?: string
  ) => void;
  addCustomHamper: (details: CustomHamperDetails, totalPrice: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  orderTotal: number;
  isFreeDelivery: boolean;
  freeDeliveryRemaining: number;
  customMessage: string;
  setCustomMessage: (msg: string) => void;
  pincode: string;
  setPincode: (pin: string) => void;
  deliveryAddress: DeliveryAddress;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
  updateDeliveryAddress: (field: keyof DeliveryAddress, value: string) => void;
  
  // Custom Hamper Builder Modal State
  isHamperBuilderOpen: boolean;
  openHamperBuilder: () => void;
  closeHamperBuilder: () => void;

  // Active Catalog Category Filter (Syncs Navbar with Catalog)
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;

  // Global QuickView & Catalog Search
  quickViewProduct: Product | null;
  quickViewVariant?: ProductVariant;
  openQuickView: (product: Product, initialVariant?: ProductVariant) => void;
  closeQuickView: () => void;
  catalogSearchQuery: string;
  setCatalogSearchQuery: (query: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "rosee_ribbon_cart_v1";
const ADDRESS_STORAGE_KEY = "rosee_ribbon_address_v1";

const defaultDeliveryAddress: DeliveryAddress = {
  fullName: "",
  phoneNumber: "",
  flatBuilding: "",
  streetArea: "",
  pincode: "",
  cityState: "",
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHamperBuilderOpen, setIsHamperBuilderOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewVariant, setQuickViewVariant] = useState<ProductVariant | undefined>(undefined);
  const [catalogSearchQuery, setCatalogSearchQuery] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>(defaultDeliveryAddress);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedAddr = localStorage.getItem(ADDRESS_STORAGE_KEY);
      if (savedAddr) {
        const parsed = JSON.parse(savedAddr);
        setDeliveryAddress(parsed);
        if (parsed.pincode) setPincode(parsed.pincode);
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

  // Save address to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(deliveryAddress));
    } catch {
      // Ignore errors writing to localStorage
    }
  }, [deliveryAddress, mounted]);

  const updateDeliveryAddress = (field: keyof DeliveryAddress, value: string) => {
    setDeliveryAddress((prev) => ({ ...prev, [field]: value }));
    if (field === "pincode") setPincode(value);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const openHamperBuilder = () => setIsHamperBuilderOpen(true);
  const closeHamperBuilder = () => setIsHamperBuilderOpen(false);

  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    quantity: number = 1,
    customCardMessage?: string
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === variant?.id &&
          item.customCardMessage === customCardMessage &&
          !item.customHamperDetails
      );

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity, selectedVariant: variant, customCardMessage }];
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
      description: "Custom bespoke hamper assembled with signature Rosee Ribbon satin bow.",
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

  const deliveryFee = items.length === 0 ? 0 : subtotal >= 999 ? 0 : 100;
  const orderTotal = subtotal + deliveryFee;
  const isFreeDelivery = subtotal >= 999;
  const freeDeliveryRemaining = Math.max(0, 999 - subtotal);

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
        deliveryFee,
        orderTotal,
        isFreeDelivery,
        freeDeliveryRemaining,
        customMessage,
        setCustomMessage,
        pincode,
        setPincode,
        deliveryAddress,
        setDeliveryAddress,
        updateDeliveryAddress,
        isHamperBuilderOpen,
        openHamperBuilder,
        closeHamperBuilder,
        activeCategory,
        setActiveCategory,
        quickViewProduct,
        quickViewVariant,
        openQuickView: (p: Product, initialVariant?: ProductVariant) => {
          setQuickViewProduct(p);
          setQuickViewVariant(initialVariant);
        },
        closeQuickView: () => {
          setQuickViewProduct(null);
          setQuickViewVariant(undefined);
        },
        catalogSearchQuery,
        setCatalogSearchQuery,
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
