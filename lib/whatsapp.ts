import { CartItem, Product, ProductVariant } from "@/types/product";
import { formatPrice } from "./utils";

// Rosee Ribbon official WhatsApp contact
export const ROSEE_RIBBON_WHATSAPP_NUMBER = "919876543210"; // Easily configured

/**
 * Creates a WhatsApp URL for an immediate single-product order/inquiry
 */
export function getSingleProductWhatsAppUrl(
  product: Product,
  variant?: ProductVariant,
  phone: string = ROSEE_RIBBON_WHATSAPP_NUMBER
): string {
  const price = variant ? variant.price : product.basePrice;
  const variantText = variant ? `\n• *Option:* ${variant.name}` : "";

  const message = [
    `🌸 *ROSEE RIBBON — PRODUCT INQUIRY* 🌸`,
    `Hello! I came across your creations and would love to order:`,
    ``,
    `• *Item:* ${product.name}`,
    `• *Category:* ${product.categoryLabel}${variantText}`,
    `• *Price:* ${formatPrice(price)}`,
    ``,
    `Could you please share availability and delivery details for Bangalore?`,
    `Thank you! ✨`,
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates a WhatsApp URL for a complete Gift Bag / Cart checkout including custom hampers
 */
export function getCartOrderWhatsAppUrl(
  items: CartItem[],
  customCardMessage: string = "",
  deliveryLocation: string = "",
  phone: string = ROSEE_RIBBON_WHATSAPP_NUMBER
): string {
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.basePrice;
    return sum + unitPrice * item.quantity;
  }, 0);

  const formattedItems = items
    .map((item, idx) => {
      const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.basePrice;

      // Handle Custom Multi-Item Hamper breakdown
      if (item.customHamperDetails) {
        const h = item.customHamperDetails;
        const parts: string[] = [];

        parts.push(`   📦 *Box Base:* ${h.packaging.name} (${formatPrice(h.packaging.price)})`);

        if (h.candles.length > 0) {
          const totalCandles = h.candles.reduce((s, c) => s + c.quantity, 0);
          parts.push(`   🕯️ *Candles (${totalCandles}):*`);
          h.candles.forEach((c) => {
            parts.push(`      - ${c.quantity}× ${c.item.name} (${formatPrice(c.item.price * c.quantity)})`);
          });
        }

        if (h.crochetFlowers.length > 0) {
          const totalBlooms = h.crochetFlowers.reduce((s, f) => s + f.quantity, 0);
          parts.push(`   🧶 *Crochet Blooms (${totalBlooms}):*`);
          h.crochetFlowers.forEach((f) => {
            parts.push(`      - ${f.quantity}× ${f.item.name} (${formatPrice(f.item.price * f.quantity)})`);
          });
        }

        if (h.addons.length > 0) {
          parts.push(`   ✨ *Keepsake Extras:*`);
          h.addons.forEach((a) => {
            parts.push(`      - ${a.quantity}× ${a.item.name} (${formatPrice(a.item.price * a.quantity)})`);
          });
        }

        if (h.personalNote && h.personalNote.trim()) {
          parts.push(`   💌 *Hamper Box Note:* "${h.personalNote.trim()}"`);
        }

        return `${idx + 1}. *🎁 Custom Curated Hamper*\n${parts.join("\n")}\n   • Qty: ${item.quantity} Hamper × ${formatPrice(unitPrice)} = ${formatPrice(unitPrice * item.quantity)}`;
      }

      // Standard Product item
      const variantStr = item.selectedVariant ? ` (${item.selectedVariant.name})` : "";
      return `${idx + 1}. *${item.product.name}*${variantStr}\n   • Qty: ${item.quantity} × ${formatPrice(unitPrice)} = ${formatPrice(unitPrice * item.quantity)}`;
    })
    .join("\n\n");

  const messageParts = [
    `🌸 *ROSEE RIBBON — NEW ORDER* 🌸`,
    `Hello! I'd like to place an order from your website:`,
    ``,
    `*Order Items:*`,
    formattedItems,
    ``,
    `*Total Order Value:* ${formatPrice(subtotal)} (All taxes & signature ribbon wrap included)`,
    ``,
  ];

  if (customCardMessage.trim()) {
    messageParts.push(`💌 *Complimentary Gift Card Message:*`);
    messageParts.push(`"${customCardMessage.trim()}"`);
    messageParts.push(``);
  }

  if (deliveryLocation.trim()) {
    messageParts.push(`📍 *Delivery Area / Address:* ${deliveryLocation.trim()}`);
    messageParts.push(``);
  }

  messageParts.push(`Please confirm if this order can be processed. Looking forward to your reply! ✨`);

  return `https://wa.me/${phone}?text=${encodeURIComponent(messageParts.join("\n"))}`;
}
