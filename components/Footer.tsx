"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ROSEE_RIBBON_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer id="studio" className="bg-[#FAF6F0] border-t border-[#E8DFD3] pt-16 pb-12 text-[#453638]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#E8DFD3]">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/brand/logo-stacked.png"
                alt="Rosee Ribbon - The Art of Beautiful Giving"
                width={190}
                height={150}
                className="h-24 sm:h-28 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>
            <p className="text-xs sm:text-sm text-[#241517] leading-relaxed max-w-sm font-sans">
              An independent Bangalore craft studio creating small-batch soy candles,
              hand-crocheted everlasting flowers, and curated gift hampers.
            </p>
            <div className="text-xs text-[#4A3538] font-sans font-medium">
              Studio & Dispatch: Sarjapura, Bengaluru, Karnataka
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-serif text-base text-[#14080A] font-semibold">Works</div>
            <ul className="space-y-2 text-xs font-sans text-[#2D1C1F] font-medium">
              <li>
                <a href="#catalog" className="hover:text-[#4A121A] transition-colors">
                  Soy Wax Candles
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#4A121A] transition-colors">
                  Crochet Blooms
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#4A121A] transition-colors">
                  Curated Hampers
                </a>
              </li>
              <li>
                <a href="#hampers" className="hover:text-[#4A121A] transition-colors">
                  Bespoke Studio Boxes
                </a>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Ordering */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-serif text-base text-[#14080A] font-semibold">Direct Orders & Custom Notes</div>
            <p className="text-xs text-[#241517] leading-relaxed font-sans">
              Orders are confirmed personally via WhatsApp to ensure your fragrance choices,
              ribbon finishes, and personalized message cards are prepared by hand.
            </p>
          </div>

        </div>

        {/* Bottom Credits (Clean, zero middle dot soup) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#3D282B] font-sans font-medium gap-4">
          <div>
            © {new Date().getFullYear()} Rosee Ribbon.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#4A3538] font-medium">
            <span>100% Golden Soy Wax</span>
            <span className="text-[#D5C7B7]">/</span>
            <span>Combed Milk Cotton</span>
            <span className="text-[#D5C7B7]">/</span>
            <span>Delivering Across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
