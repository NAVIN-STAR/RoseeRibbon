export type CategoryId = 'all' | 'candles' | 'crochet-flowers' | 'hampers';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface CustomHamperItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  tag?: string;
}

export interface CustomHamperLineItem {
  item: CustomHamperItem;
  quantity: number;
}

export interface CustomHamperDetails {
  packaging: CustomHamperItem; // Compulsory base
  candles: CustomHamperLineItem[]; // 0 to N candles
  crochetFlowers: CustomHamperLineItem[]; // 0 to N crochet blooms
  addons: CustomHamperLineItem[]; // 0 to N extras
  personalNote?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'candles' | 'crochet-flowers' | 'hampers';
  categoryLabel: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  tags: string[];
  isFeatured?: boolean;
  
  // Category-specific details
  scentNotes?: {
    top: string;
    heart: string;
    base: string;
  };
  burnTime?: string;
  waxType?: string;
  yarnMaterial?: string;
  stemLength?: string;
  hamperContents?: string[];
  variants?: ProductVariant[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  customHamperDetails?: CustomHamperDetails;
}
