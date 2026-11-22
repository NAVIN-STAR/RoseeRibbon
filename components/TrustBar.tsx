"use client";

import React from "react";

export function TrustBar() {
  return (
    <section className="py-10 border-y border-[#E8DFD3] bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural 3-Pillar Ledger (Numbered, grounded, no middle dots or cheesy icons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#E8DFD3]">
          
          {/* Pillar 1 */}
          <div className="pt-4 md:pt-0">
            <div className="text-[11px] font-sans font-bold tracking-wider text-[#4A121A] mb-2 uppercase">
              01 / Pure Soy Wax
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#14080A] font-semibold mb-2">
              Clean burn with botanical oils
            </h3>
            <p className="text-[13px] sm:text-sm text-[#2D1C1F] leading-relaxed max-w-sm">
              Hand-poured using 100% natural golden soy wax, braided cotton wicks,
              and phthalate-free fragrance oils. Zero paraffin, zero toxic soot.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="pt-6 md:pt-0 md:pl-10">
            <div className="text-[11px] font-sans font-bold tracking-wider text-[#4A121A] mb-2 uppercase">
              02 / Everlasting Blooms
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#14080A] font-semibold mb-2">
              Stitched from combed milk cotton
            </h3>
            <p className="text-[13px] sm:text-sm text-[#2D1C1F] leading-relaxed max-w-sm">
              Each petal and leaf is hand-crocheted with a flexible internal wire core.
              A botanical arrangement that keeps its shape and color forever.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="pt-6 md:pt-0 md:pl-10">
            <div className="text-[11px] font-sans font-bold tracking-wider text-[#4A121A] mb-2 uppercase">
              03 / Pan-India Delivery
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#14080A] font-semibold mb-2">
              Free Delivery Above ₹999
            </h3>
            <p className="text-[13px] sm:text-sm text-[#2D1C1F] leading-relaxed max-w-sm">
              Enjoy complimentary doorstep delivery across India on orders above ₹999 (₹100 standard delivery on smaller orders). Securely packed with personalized keepsake card.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
