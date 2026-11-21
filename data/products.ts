import { Product } from "@/types/product";

export const products: Product[] = [
  // ==================== CANDLES ====================
  {
    id: "candle-01",
    slug: "french-lavender-honey-soy-candle",
    name: "French Lavender & Honey Soy Candle",
    category: "candles",
    categoryLabel: "Hand-Poured Candle",
    basePrice: 699,
    shortDescription: "Calming wild lavender blossoms infused with golden honeycomb and subtle tonka bean.",
    description: "Hand-poured in small batches using 100% natural golden soy wax and braided cotton wicks. This candle casts a warm, soothing aroma reminiscent of a dusk stroll through French lavender terraces.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    tags: ["calming", "aromatherapy", "soy wax"],
    isFeatured: true,
    waxType: "100% Natural Soy Wax",
    burnTime: "38-42 Hours",
    scentNotes: {
      top: "Provencal Lavender & Bergamot",
      heart: "Golden Honeycomb & Lilac",
      base: "Creamy Tonka Bean & Soft Cedar",
    },
    variants: [
      { id: "c1-amber-200g", name: "200g Amber Glass Jar", price: 699, inStock: true },
      { id: "c1-matte-300g", name: "300g Matte Ceramic Tumbler", price: 949, inStock: true },
    ],
  },
  {
    id: "candle-02",
    slug: "warm-vanilla-santal-candle",
    name: "Warm Vanilla Santal Amber Candle",
    category: "candles",
    categoryLabel: "Hand-Poured Candle",
    basePrice: 749,
    shortDescription: "Creamy Madagascar vanilla orchid wrapped in Australian sandalwood and cashmere.",
    description: "An intimate, deeply comforting scent for cozy evenings. Crafted with botanical fragrance oils that diffuse effortlessly, filling living spaces with an inviting, velvety glow.",
    image: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=800&q=80",
    badge: "Studio Favorite",
    tags: ["cozy", "woody", "relaxing"],
    isFeatured: false,
    waxType: "Coconut Soy Blend",
    burnTime: "45 Hours",
    scentNotes: {
      top: "Orchid Petals & White Pear",
      heart: "Madagascar Vanilla & Cashmere",
      base: "Sandalwood, Amber & White Musk",
    },
    variants: [
      { id: "c2-amber-220g", name: "220g Fluted Amber Glass", price: 749, inStock: true },
    ],
  },
  {
    id: "candle-03",
    slug: "wild-rose-smoked-oud-candle",
    name: "Wild Rose & Smoked Oud Candle",
    category: "candles",
    categoryLabel: "Hand-Poured Candle",
    basePrice: 799,
    shortDescription: "Damascus crimson rose layered with rich smoked agarwood and black amber.",
    description: "An evocative, romantic blend capturing Rosee Ribbon's floral heritage. The botanical sweetness of blooming red rose petals is grounded by the mysterious, smoky depth of oud.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    tags: ["romantic", "luxury", "sensual"],
    isFeatured: true,
    waxType: "Soy Wax with Crackling Wood Wick",
    burnTime: "50 Hours",
    scentNotes: {
      top: "Damascus Rosebud & Pink Peppercorn",
      heart: "Smoked Agarwood & Clove",
      base: "Black Amber & Vetiver",
    },
    variants: [
      { id: "c3-woodwick-250g", name: "250g Dark Espresso Jar (Wood Wick)", price: 799, inStock: true },
    ],
  },

  // ==================== CROCHET FLOWERS ====================
  {
    id: "crochet-01",
    slug: "pastel-tulip-duo-crochet-stems",
    name: "The Pastel Tulip Duo Stems",
    category: "crochet-flowers",
    categoryLabel: "Crochet Blooms",
    basePrice: 599,
    shortDescription: "Two handcrafted everlasting tulips in soft blush and buttercup yellow, tied with ribbon.",
    description: "Never wilting, lovingly looped petal by petal using premium combed milk-cotton yarn. The flexible internal floral wire allows you to gently pose each stem and leaf in your favorite bud vase.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    badge: "Everlasting",
    tags: ["handcrafted", "gift idea", "everlasting"],
    isFeatured: true,
    yarnMaterial: "80% Milk Cotton, 20% Acrylic",
    stemLength: "30 cm (Bendable Wire Core)",
    variants: [
      { id: "cr1-blush-buttercup", name: "Blush Pink & Buttercup Duo", price: 599, inStock: true },
      { id: "cr1-lavender-cream", name: "Lilac Lavender & Cream White Duo", price: 599, inStock: true },
      { id: "cr1-trio-set", name: "Trio Bundle (3 Stems)", price: 849, inStock: true },
    ],
  },
  {
    id: "crochet-02",
    slug: "blush-peony-eternal-bloom",
    name: "Blush Peony Eternal Bloom",
    category: "crochet-flowers",
    categoryLabel: "Crochet Blooms",
    basePrice: 499,
    shortDescription: "A showstopping, multi-layered crochet peony in delicate vintage blush pink.",
    description: "Consisting of over 40 individual hand-crocheted petals layered together to replicate the voluptuous volume of fresh blooming peonies. A timeless keepsake for desks, vanities, or nightstands.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    badge: "Hand-Stitched",
    tags: ["peony", "romantic", "keepsake"],
    isFeatured: false,
    yarnMaterial: "Combed Organic Cotton",
    stemLength: "32 cm",
    variants: [
      { id: "cr2-soft-blush", name: "Vintage Blush", price: 499, inStock: true },
      { id: "cr2-champagne", name: "Champagne Cream", price: 499, inStock: true },
    ],
  },
  {
    id: "crochet-03",
    slug: "sunshine-daisy-lavender-bouquet",
    name: "Sunshine Daisy & Lavender Bouquet",
    category: "crochet-flowers",
    categoryLabel: "Crochet Blooms",
    basePrice: 1199,
    shortDescription: "Artisanal wrapped bouquet featuring 3 joyful daisies, 2 lavender sprigs, and green foliage.",
    description: "The quintessential everlasting arrangement. Lovingly wrapped in vintage tissue, heavyweight kraft wrapping paper, and tied with Rosee Ribbon's signature bordeaux satin bow.",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80",
    badge: "Ready to Gift",
    tags: ["bouquet", "sunflower", "celebration"],
    isFeatured: true,
    yarnMaterial: "Milk Cotton Yarn Blend",
    stemLength: "Wrapped Bouquet (~35 cm tall)",
    variants: [
      { id: "cr3-wrapped", name: "Signature Kraft Wrapped Bouquet", price: 1199, inStock: true },
      { id: "cr3-glass-vase", name: "Bouquet with Ribbed Glass Bud Vase", price: 1499, inStock: true },
    ],
  },

  // ==================== HAMPERS ====================
  {
    id: "hamper-01",
    slug: "rosee-reverie-signature-box",
    name: "The Rosee Reverie Signature Box",
    category: "hampers",
    categoryLabel: "Curated Hamper",
    basePrice: 1899,
    shortDescription: "Our signature luxury hamper: 1 Soy Candle + 2 Everlasting Crochet Tulips + Glass Match Bottle + Calligraphy Card.",
    description: "The complete artisanal gifting experience. Packaged inside a rigid reusable keepsake box with debossed Rosee Ribbon foil branding, shred fill, dried floral accents, and tied with silk ribbon.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    badge: "Most Loved Gift",
    tags: ["luxury", "complete gift", "signature"],
    isFeatured: true,
    hamperContents: [
      "1x French Lavender & Honey Soy Candle (200g)",
      "2x Handcrafted Crochet Tulip Stems (Blush & Cream)",
      "1x Apothecary Glass Match Bottle with Striker",
      "1x Customized Calligraphy Message Card",
      "Luxury Keepsake Box with Bordeaux Silk Ribbon",
    ],
    variants: [
      { id: "h1-lavender-box", name: "Lavender & Blush Palette", price: 1899, inStock: true },
      { id: "h1-vanilla-box", name: "Vanilla Santal & Champagne Palette", price: 1949, inStock: true },
    ],
  },
  {
    id: "hamper-02",
    slug: "cozy-sanctuary-wellness-hamper",
    name: "The Cozy Sanctuary Wellness Crate",
    category: "hampers",
    categoryLabel: "Curated Hamper",
    basePrice: 2299,
    shortDescription: "Curated self-care ritual: 1 Amber Candle + 1 Crochet Peony + Soy Wax Melts + Hand-poured Ceramic Coaster.",
    description: "Designed to transform any bedroom or reading nook into a serene oasis. Perfect for housewarmings, milestones, or a thoughtful 'thinking of you' surprise.",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    badge: "Wellness Crate",
    tags: ["wellness", "pamper", "housewarming"],
    isFeatured: false,
    hamperContents: [
      "1x Warm Vanilla Santal Candle (220g)",
      "1x Hand-Stitched Blush Peony Eternal Bloom",
      "4x Botanical Soy Wax Melts",
      "1x Handmade Terrazzo Trinket Tray",
      "1x Rosee Ribbon Wax-Sealed Note Card",
    ],
    variants: [
      { id: "h2-standard-crate", name: "Handcrafted Pine Wood Crate", price: 2299, inStock: true },
    ],
  },
  {
    id: "hamper-03",
    slug: "petite-bloom-glow-gift-set",
    name: "Petite Bloom & Glow Gift Set",
    category: "hampers",
    categoryLabel: "Curated Hamper",
    basePrice: 1299,
    shortDescription: "An accessible yet luxurious pairing: 1 Scented Candle Tin + 1 Crochet Daisy Stem + Gift Bag.",
    description: "A lovely, petite gesture of gratitude. Features a gold travel candle tin paired with a single sunny crochet stem in a branded parchment gift bag with satin ribbon handles.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    badge: "Budget Friendly",
    tags: ["appreciation", "birthday", "favors"],
    isFeatured: true,
    hamperContents: [
      "1x Wild Rose Soy Candle Tin (120g)",
      "1x Handcrafted Posable Sunshine Daisy",
      "Rosee Ribbon Branded Gift Bag & Tissue",
      "1x Mini Message Card",
    ],
    variants: [
      { id: "h3-petite", name: "Petite Gift Bag Set", price: 1299, inStock: true },
    ],
  },
];

// Helper functions for catalog queries (Scalable abstraction layer)
export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
