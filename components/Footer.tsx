"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Heart, Flame, Flower2, Gift, ShieldCheck } from "lucide-react";
import { ROSEE_RIBBON_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer id="studio" className="bg-[#F5EFE6] border-t border-[#EADBCE] pt-16 pb-12 text-[#4A3B3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#EADBCE]">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block border border-[#241517] px-3.5 py-1 font-serif text-2xl tracking-tight text-[#241517]">
              Rosee Ribbon
            </span>
            <p className="text-sm text-[#5A4B4D] leading-relaxed max-w-sm">
              An artisanal Bangalore gifting atelier dedicated to the slow craft of
              botanical soy candles, everlasting crochet floral stems, and bespoke gift hampers.
            </p>
            <div className="text-xs text-[#736163]">
              📍 Atelier & Dispatch: Bangalore, Karnataka, India
            </div>
          </div>

          {/* Catalog Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base text-[#241517]">The Collection</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog" className="hover:text-[#6B1D2F] transition-colors">
                  🕯️ Hand-Poured Botanical Candles
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#6B1D2F] transition-colors">
                  🧶 Everlasting Crochet Floral Stems
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#6B1D2F] transition-colors">
                  🎁 Curated & Bespoke Hampers
                </a>
              </li>
              <li>
                <a href="#hampers" className="hover:text-[#6B1D2F] transition-colors">
                  💌 Handwritten Calligraphy Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Care & WhatsApp Ordering */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-base text-[#241517]">Direct Concierge</h4>
            <p className="text-xs text-[#5A4B4D] leading-relaxed">
              We coordinate orders personally via WhatsApp to ensure your customized
              wax-sealed message card, ribbon finish, and delivery timing are flawless.
            </p>
            <a
              href={`https://wa.me/${ROSEE_RIBBON_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Credits & Quality Commitments */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#736163] gap-4">
          <div>
            © {new Date().getFullYear()} Rosee Ribbon. Handcrafted in Bangalore, India.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>100% Soy Wax</span>
            <span>•</span>
            <span>Combed Milk Cotton</span>
            <span>•</span>
            <span>Bangalore Doorstep Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
