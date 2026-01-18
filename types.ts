export type ProductStatus = 'SELLING' | 'RESERVED' | 'SOLD';
export type TradeType = 'DELIVERY' | 'DIRECT' | 'ALL';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  status: ProductStatus;
  likes: number;
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
  category: string | 'ALL';
  minPrice: number;
  maxPrice: number;
  sortBy: 'LATEST' | 'POPULAR' | 'LOW_PRICE' | 'HIGH_PRICE'; // Added HIGH_PRICE
  tradeType: TradeType; // Added tradeType
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
