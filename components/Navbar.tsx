"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CategoryId } from "@/types/product";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const {
    totalItems,
    openCart,
    setActiveCategory,
    openQuickView,
    catalogSearchQuery,
    setCatalogSearchQuery,
  } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(catalogSearchQuery || "");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sync with global catalog search query
  useEffect(() => {
    setSearchQuery(catalogSearchQuery);
  }, [catalogSearchQuery]);

  // Click outside to close instant search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter matching products in real-time
  const matchingProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return products.filter((p) => {
      const inName = p.name.toLowerCase().includes(q);
      const inDesc = p.shortDescription.toLowerCase().includes(q);
      const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const inVariants = p.variants?.some((v) => v.name.toLowerCase().includes(q)) ?? false;
      return inName || inDesc || inTags || inVariants;
    });
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCatalogSearchQuery(searchQuery.trim());
    setIsSearchOpen(false);
    setMobileMenuOpen(false);

    const catalogElem = document.getElementById("catalog");
    if (catalogElem) {
      const yOffset = -90;
      const y = catalogElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNavClick = (category: CategoryId, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveCategory(category);
    setMobileMenuOpen(false);

    const catalogElem = document.getElementById("catalog");
    if (catalogElem) {
      const yOffset = -90;
      const y = catalogElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Studio Dispatch Bar (Clean, no middle dots) */}
      <div className="bg-[#4A121A] text-[#FBF7EE] py-2 px-4 text-center text-[11px] font-sans tracking-wider uppercase flex items-center justify-center gap-3 sm:gap-5">
        <span className="font-medium text-[#FBF7EE]/90">Delivering Across India</span>
        <span className="text-white/40">/</span>
        <span className="bg-[#E8DCB8] text-[#4A121A] px-3 py-0.5 rounded-full font-bold tracking-normal text-[10px] sm:text-[11px] shadow-sm">
          Free Delivery Above ₹999
        </span>
      
      </div>

      {/* Main Navigation */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF6F0]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(31,19,21,0.03)] py-3 sm:py-4 border-b border-[#E8DFD3]"
            : "bg-[#FAF6F0] py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Studio Brand Lockup */}
            <Link href="/" className="group flex items-center gap-2 sm:gap-3 shrink-0">
              <Image
                src="/images/brand/logo-emblem.png"
                alt="Rosee Ribbon Emblem"
                width={36}
                height={49}
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <Image
                src="/images/brand/logo-wordmark.png"
                alt="Rosee Ribbon"
                width={150}
                height={32}
                className="h-6 sm:h-7 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              <button
                onClick={(e) => handleNavClick("all", e)}
                className="text-xs uppercase tracking-wider font-semibold text-[#2D1C1F] hover:text-[#4A121A] transition-colors py-1"
              >
                All Works
              </button>

              <button
                onClick={(e) => handleNavClick("candles", e)}
                className="text-xs uppercase tracking-wider font-semibold text-[#2D1C1F] hover:text-[#4A121A] transition-colors py-1"
              >
                Soy Candles
              </button>

              <button
                onClick={(e) => handleNavClick("crochet-flowers", e)}
                className="text-xs uppercase tracking-wider font-semibold text-[#2D1C1F] hover:text-[#4A121A] transition-colors py-1"
              >
                Crochet Blooms
              </button>

              <button
                onClick={(e) => handleNavClick("hampers", e)}
                className="text-xs uppercase tracking-wider font-semibold text-[#2D1C1F] hover:text-[#4A121A] transition-colors py-1"
              >
                Hampers
              </button>
            </nav>

            {/* Right Controls: Desktop Search Bar + Cart Bag Button */}
            <div className="flex items-center gap-3">
              
              {/* Desktop Live Search Bar */}
              <div className="relative hidden sm:block" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-[#736163] absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="Search candles, blooms, hampers..."
                    className="w-44 md:w-56 lg:w-64 focus:w-72 transition-all duration-300 text-xs pl-8 pr-7 py-2 rounded-full border border-[#D5C7B7] bg-white/95 focus:bg-white text-[#14080A] placeholder-[#8C7A7C] focus:outline-none focus:border-[#4A121A] focus:ring-1 focus:ring-[#4A121A] shadow-2xs font-sans"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setCatalogSearchQuery("");
                      }}
                      className="absolute right-2.5 p-0.5 text-[#8C7A7C] hover:text-[#14080A]"
                      title="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </form>

                {/* Instant Floating Autocomplete Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && searchQuery.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E8DFD3] overflow-hidden z-50 p-2 font-sans"
                    >
                      <div className="text-[10px] uppercase font-bold tracking-wider text-[#4A121A] px-2.5 py-1.5 flex items-center justify-between border-b border-[#E8DFD3]/80">
                        <span>Matching Creations ({matchingProducts.length})</span>
                        <span className="text-[#736163] font-normal lowercase">click to preview</span>
                      </div>

                      {matchingProducts.length === 0 ? (
                        <div className="p-4 text-center text-xs text-[#736163]">
                          No creations found matching &ldquo;{searchQuery}&rdquo;
                        </div>
                      ) : (
                        <div className="max-h-72 overflow-y-auto divide-y divide-[#E8DFD3]/50 py-1">
                          {matchingProducts.slice(0, 5).map((p) => (
                            <div
                              key={p.id}
                              onClick={() => {
                                openQuickView(p);
                                setIsSearchOpen(false);
                              }}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF6F0] cursor-pointer transition-colors group"
                            >
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F5EFE6] shrink-0 border border-[#E8DFD3]">
                                <Image
                                  src={p.image}
                                  alt={p.name}
                                  fill
                                  sizes="40px"
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-[#14080A] truncate group-hover:text-[#4A121A] transition-colors">
                                  {p.name}
                                </div>
                                <div className="text-[10px] text-[#736163] truncate">
                                  {p.categoryLabel}
                                </div>
                              </div>
                              <div className="text-xs font-serif font-bold text-[#4A121A] shrink-0">
                                {formatPrice(p.basePrice)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="w-full text-center py-2 text-xs font-semibold text-white bg-[#4A121A] hover:bg-[#350C12] rounded-xl transition-colors mt-1 flex items-center justify-center gap-1.5"
                      >
                        <span>View all in catalog ({matchingProducts.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart Button with grounded CSS active state */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 sm:gap-2.5 bg-white border border-[#E8DFD3] hover:border-[#4A121A] text-[#1F1315] px-2.5 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wide shadow-subtle hover:shadow-card transition-all active:translate-y-0.5 shrink-0"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-4 h-4 text-[#4A121A]" />
                <span className="hidden sm:inline">Gift Bag</span>
                {totalItems > 0 && (
                  <span className="flex items-center justify-center bg-[#4A121A] text-white text-[10px] font-semibold w-5 h-5 rounded-full ml-0.5">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile / Tablet Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#1F1315] hover:text-[#4A121A]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu (Absolute overlay: zero layout shift, zero auto-scrolling) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Soft backdrop to close on outside tap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[80px] bg-black/25 z-30 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 z-40 lg:hidden bg-[#FAF6F0] border-b border-[#E8DFD3] px-5 pt-4 pb-6 space-y-3 shadow-xl font-sans"
            >
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-[#736163] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candles, blooms, hampers..."
                  className="w-full text-xs pl-9 pr-8 py-2 rounded-full border border-[#D5C7B7] bg-white text-[#14080A] placeholder-[#8C7A7C] focus:outline-none focus:border-[#4A121A]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setCatalogSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A7C] p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              <button
                onClick={() => handleNavClick("all")}
                className="block w-full text-left py-2 text-sm uppercase tracking-wider font-semibold text-[#14080A] hover:text-[#4A121A] transition-colors"
              >
                All Works
              </button>
              <button
                onClick={() => handleNavClick("candles")}
                className="block w-full text-left py-2 text-sm uppercase tracking-wider font-semibold text-[#2D1C1F] hover:text-[#4A121A] transition-colors"
              >
                Soy Candles
              </button>
              <button
                onClick={() => handleNavClick("crochet-flowers")}
                className="block w-full text-left py-2 text-sm uppercase tracking-wider font-semibold text-[#2D1C1F] hover:text-[#4A121A] transition-colors"
              >
                Crochet Blooms
              </button>
              <button
                onClick={() => handleNavClick("hampers")}
                className="block w-full text-left py-2 text-sm uppercase tracking-wider font-semibold text-[#2D1C1F] hover:text-[#4A121A] transition-colors"
              >
                Hampers & Gift Boxes
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
