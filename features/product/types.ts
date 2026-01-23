export type ProductStatus = 'SELLING' | 'RESERVED' | 'SOLD';
export type TradeType = 'DELIVERY' | 'DIRECT' | 'ALL';

export interface Product {
  id: number; // Changed: string -> number to match backend Long type
  title: string;
  price: number;
  image: string;
  category: string;
  status: ProductStatus;
  likes: number;
  isLiked?: boolean;
  uploadedTime: string; // e.g., "2 hours ago"
  seller: {
    name: string;
    avatar: string;
    temperature: number;
  };
  tags: string[];
  description: string;
  images: string[]; // For detail view slider

  // Added for RFP-01
  artist?: string;
  tradeType: TradeType;
}

export interface FilterState {
  status: ProductStatus | 'ALL';
  categoryCode: string | 'ALL';
  minPrice: number;
  maxPrice: number;
  sortBy: 'LATEST' | 'LOW_PRICE' | 'HIGH_PRICE';
  tradeType: TradeType;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
