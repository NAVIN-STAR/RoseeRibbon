"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CategoryId } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { totalItems, openCart, setActiveCategory } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (category: CategoryId, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveCategory(category);
    setMobileMenuOpen(false);

    const catalogElem = document.getElementById("catalog");
    if (catalogElem) {
      const yOffset = -80; // Offset for sticky navbar
      const y = catalogElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF6F0]/90 backdrop-blur-md shadow-[0_2px_15px_rgba(36,21,23,0.04)] py-3"
          : "bg-[#FAF6F0] py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Framed Editorial Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="border border-[#241517] px-3.5 py-1 font-serif text-xl md:text-2xl font-normal tracking-tight text-[#241517] group-hover:border-[#6B1D2F] group-hover:text-[#6B1D2F] transition-colors">
              Rosee Ribbon
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={(e) => handleNavClick("all", e)}
              className="text-sm font-medium text-[#4A3B3D] hover:text-[#241517] transition-colors tracking-wide"
            >
              Shop All
            </button>
            <button
              onClick={(e) => handleNavClick("candles", e)}
              className="text-sm font-medium text-[#4A3B3D] hover:text-[#241517] transition-colors tracking-wide"
            >
              Candles
            </button>
            <button
              onClick={(e) => handleNavClick("crochet-flowers", e)}
              className="text-sm font-medium text-[#4A3B3D] hover:text-[#241517] transition-colors tracking-wide"
            >
              Crochet Blooms
            </button>
            <button
              onClick={(e) => handleNavClick("hampers", e)}
              className="text-sm font-medium text-[#4A3B3D] hover:text-[#241517] transition-colors tracking-wide"
            >
              Hampers
            </button>
          </nav>

          {/* Cart Pill Button */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={openCart}
              className="relative flex items-center gap-2 bg-white/90 hover:bg-white border border-[#EADBCE] text-[#241517] px-4 py-2 rounded-full text-sm font-medium shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#6B1D2F]" />
              <span className="hidden sm:inline">Gift Bag</span>
              <span className="sm:hidden">Cart</span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center bg-[#6B1D2F] text-white text-[11px] font-semibold w-5 h-5 rounded-full ml-0.5">
                  {totalItems}
                </span>
              )}
            </motion.button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#241517] hover:text-[#6B1D2F]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF6F0] border-b border-[#EADBCE] px-4 pt-2 pb-6 space-y-3"
          >
            <button
              onClick={() => handleNavClick("all")}
              className="block w-full text-left py-2 text-base font-medium text-[#241517]"
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick("candles")}
              className="block w-full text-left py-2 text-base font-medium text-[#4A3B3D]"
            >
              🕯️ Homemade Candles
            </button>
            <button
              onClick={() => handleNavClick("crochet-flowers")}
              className="block w-full text-left py-2 text-base font-medium text-[#4A3B3D]"
            >
              🧶 Crochet Blooms
            </button>
            <button
              onClick={() => handleNavClick("hampers")}
              className="block w-full text-left py-2 text-base font-medium text-[#4A3B3D]"
            >
              🎁 Gift Hampers
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
