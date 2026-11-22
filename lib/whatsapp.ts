import { CartItem, Product, ProductVariant, DeliveryAddress } from "@/types/product";
import { formatPrice } from "./utils";

// Rosee Ribbon official WhatsApp contact
export const ROSEE_RIBBON_WHATSAPP_NUMBER = "918431941172"; // Easily configured

/**
 * Creates a WhatsApp URL for an immediate single-product order/inquiry
 */
export function getSingleProductWhatsAppUrl(
  product: Product,
  variant?: ProductVariant,
  phone: string = ROSEE_RIBBON_WHATSAPP_NUMBER,
  customCardMessage?: string
): string {
  const price = variant ? variant.price : product.basePrice;
  const variantText = variant ? `\n• *Option:* ${variant.name}` : "";
  const cardNoteText = customCardMessage && customCardMessage.trim()
    ? `\n• *Custom Card Message:* "${customCardMessage.trim()}"`
    : "";

  const message = [
    `🌸 *ROSEE RIBBON — PRODUCT INQUIRY* 🌸`,
    `Hello! I came across your creations and would love to order:`,
    ``,
    `• *Item:* ${product.name}`,
    `• *Category:* ${product.categoryLabel}${variantText}${cardNoteText}`,
    `• *Price:* ${formatPrice(price)}`,
    ``,
    `Could you please share availability and delivery details to my location?`,
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
  deliveryAddress?: DeliveryAddress | string,
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
      const cardNoteStr = item.customCardMessage && item.customCardMessage.trim()
        ? `\n   💌 *Card Message:* "${item.customCardMessage.trim()}"`
        : "";
      return `${idx + 1}. *${item.product.name}*${variantStr}${cardNoteStr}\n   • Qty: ${item.quantity} × ${formatPrice(unitPrice)} = ${formatPrice(unitPrice * item.quantity)}`;
    })
    .join("\n\n");

  const deliveryFee = items.length === 0 ? 0 : subtotal >= 999 ? 0 : 100;
  const orderTotal = subtotal + deliveryFee;
  const deliveryStr = deliveryFee === 0 ? "FREE (Order above ₹999)" : `${formatPrice(deliveryFee)} (Orders below ₹999)`;

  const messageParts = [
    `🌸 *ROSEE RIBBON — NEW ORDER* 🌸`,
    `Hello! I'd like to place an order from your website:`,
    ``,
    `*Order Items:*`,
    formattedItems,
    ``,
    `• *Items Subtotal:* ${formatPrice(subtotal)}`,
    `• *Delivery Charge:* ${deliveryStr}`,
    `• *Total Amount Payable:* ${formatPrice(orderTotal)} (All taxes & signature ribbon wrap included)`,
    ``,
  ];

  if (customCardMessage.trim()) {
    messageParts.push(`💌 *Complimentary Gift Card Message:*`);
    messageParts.push(`"${customCardMessage.trim()}"`);
    messageParts.push(``);
  }

  if (deliveryAddress) {
    if (typeof deliveryAddress === "object") {
      const addrLines: string[] = [];
      if (deliveryAddress.fullName?.trim()) addrLines.push(`• *Recipient Name:* ${deliveryAddress.fullName.trim()}`);
      if (deliveryAddress.phoneNumber?.trim()) addrLines.push(`• *Phone Number:* ${deliveryAddress.phoneNumber.trim()}`);
      if (deliveryAddress.flatBuilding?.trim()) addrLines.push(`• *Flat / House No. & Building:* ${deliveryAddress.flatBuilding.trim()}`);
      if (deliveryAddress.streetArea?.trim()) addrLines.push(`• *Street / Area / Landmark:* ${deliveryAddress.streetArea.trim()}`);
      if (deliveryAddress.cityState?.trim()) addrLines.push(`• *City & State:* ${deliveryAddress.cityState.trim()}`);
      if (deliveryAddress.pincode?.trim()) addrLines.push(`• *Postal Code (PIN):* ${deliveryAddress.pincode.trim()}`);

      if (addrLines.length > 0) {
        messageParts.push(`📍 *Delivery Address (Across India):*`);
        messageParts.push(addrLines.join("\n"));
        messageParts.push(``);
      }
    } else if (typeof deliveryAddress === "string" && deliveryAddress.trim()) {
      messageParts.push(`📍 *Delivery Area / Address:* ${deliveryAddress.trim()}`);
      messageParts.push(``);
    }
  }

  messageParts.push(`Please confirm if this order can be processed. Looking forward to your reply! ✨`);

  return `https://wa.me/${phone}?text=${encodeURIComponent(messageParts.join("\n"))}`;
}
