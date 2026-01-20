import type { FilterState, ProductStatus, TradeType } from './types';

export const PRODUCT_IMAGE_UPLOAD_LIMIT = 10;

export const PRODUCT_WRITE_MOCK_IMAGE_URL =
  'https://images.unsplash.com/photo-1555445054-8488d05c9584?auto=format&fit=crop&w=200&q=80';
export const AI_WRITE_MOCK_IMAGE_URL =
  'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80';

export const PRODUCT_WRITE_SUCCESS_MESSAGE = '상품이 등록되었습니다! 🍒';
export const PRODUCT_WRITE_MAX_IMAGES_MESSAGE = '사진은 최대 10장까지 올릴 수 있어요.';
export const AI_WRITE_GENERATION_DELAY_MS = 2000;
export const AI_WRITE_SUCCESS_MESSAGE = '상품이 등록되었습니다! 🍒';
export const AI_WRITE_MOCK_RESULT =
  '안녕하세요! 🍒\n\n아끼던 아이브 장원영 포카 양도합니다! ✨\n\n상태는 아주 깨끗하구요 (미개봉급! 👍)\n쿨거하시면 덤도 챙겨드릴게요 🎁\n\n직거래는 대림역에서 가능해요! 🚇\n편하게 연락주세요~ 💌';

export const PRODUCT_FILTER_DEFAULT: FilterState = {
  status: 'ALL',
  category: 'ALL',
  minPrice: 0,
  maxPrice: 0,
  sortBy: 'LATEST',
  tradeType: 'ALL',
};

export const PRODUCT_STATUS_OPTIONS = ['ALL', 'SELLING', 'RESERVED', 'SOLD'] as const;

export const PRODUCT_STATUS_LABELS: Record<ProductStatus | 'ALL', string> = {
  ALL: '전체',
  SELLING: '판매중',
  RESERVED: '예약중',
  SOLD: '판매완료',
};

export const PRODUCT_TRADE_TYPE_OPTIONS = ['ALL', 'DIRECT', 'DELIVERY'] as const;

export const PRODUCT_SORT_OPTIONS = [
  { id: 'LATEST', label: '최신순' },
  { id: 'POPULAR', label: '인기순' },
  { id: 'LOW_PRICE', label: '낮은 가격순' },
  { id: 'HIGH_PRICE', label: '높은 가격순' },
] as const;

export const PRODUCT_TRADE_TYPE_LABELS: Record<TradeType, string> = {
  ALL: '전체',
  DIRECT: '직거래',
  DELIVERY: '택배',
};

