import { api } from './api';

// Backend response types (matching backend DTOs)
export interface ProductSummary {
    id: number; // Backend: Long
    title: string;
    price: number;
    status: 'SELLING' | 'RESERVED' | 'SOLD';
    tradeType: 'DIRECT' | 'DELIVERY' | 'BOTH';
    thumbnailUrl: string;
    createdAt: string; // ISO-8601 string
}

export interface ProductListResponse {
    items: ProductSummary[];
    nextCursor: string | null;
}

export interface ProductDetail {
    id: number;
    title: string;
    price: number;
    status: 'SELLING' | 'RESERVED' | 'SOLD';
    tradeType: 'DIRECT' | 'DELIVERY' | 'BOTH';
    imageUrls: string[];
    description: string;
    seller: {
        id: number;
        nickname: string;
    };
    createdAt: string;
}

export const productApi = {
    /**
     * 상품 목록 조회 (cursor 기반 페이지네이션)
     * @param cursor - 다음 페이지 커서 (선택)
     * @param limit - 페이지당 항목 수 (기본값: 20, 최대: 50)
     */
    getProducts: (cursor?: string, limit = 20) => {
        const params = new URLSearchParams();
        if (cursor) {
            params.append('cursor', cursor);
        }
        params.append('limit', String(limit));
        return api.get<ProductListResponse>(`/products?${params}`);
    },

    /**
     * 상품 상세 조회
     * 부수 효과: 조회수 자동 증가 (Redis trending 업데이트)
     */
    getProductDetail: (id: number) => api.get<ProductDetail>(`/products/${id}`),

    /**
     * 트렌딩 상품 조회 (조회수 기반 Top N)
     */
    getTrending: () => api.get<ProductListResponse>(`/products/trending`),

    /**
     * 조회수 증가 (명시적 호출용)
     * 현재: GET /products/{id}에서 자동 증가하므로 중복 호출 주의
     */
    increaseViewCount: (id: number) => api.post<void>(`/products/${id}/views`),
};
