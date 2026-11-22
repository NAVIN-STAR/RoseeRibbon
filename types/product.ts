export type CategoryId = 
  | 'all' 
  | 'candles' 
  | 'crochet-flowers' 
  | 'crochet-single' 
  | 'crochet-bouquets' 
  | 'bouquet-1' 
  | 'bouquet-3' 
  | 'hampers';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  image?: string;
  images?: string[];
}

export interface CustomHamperItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  tag?: string;
  color?: string;
  variantId?: string;
  variantName?: string;
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
  crochetSubcategory?: 'single' | 'bouquet';
  bouquetType?: '1-flower' | '3-flower';
  categoryLabel: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  image: string;
  secondaryImage?: string;
  images?: string[]; // Slideshow / gallery images
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
  allowStemCount?: boolean; // For single flowers: user can choose number of flowers
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  customHamperDetails?: CustomHamperDetails;
  stemCount?: number;
  customCardMessage?: string;
}

export interface DeliveryAddress {
  fullName: string;
  phoneNumber: string;
  flatBuilding: string;
  streetArea: string;
  pincode: string;
  cityState: string;
}
