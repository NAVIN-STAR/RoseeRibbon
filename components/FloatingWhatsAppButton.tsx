"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { ROSEE_RIBBON_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function FloatingWhatsAppButton() {
  const whatsappUrl = `https://wa.me/${ROSEE_RIBBON_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Rosee Ribbon! I would like to inquire about your handcrafted candles, crochet blooms, or custom hampers."
  )}`;

  return (
    <aside aria-label="WhatsApp Atelier Chat">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rosee Ribbon on WhatsApp"
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group border border-white/20"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="hidden sm:inline text-xs font-sans font-bold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
