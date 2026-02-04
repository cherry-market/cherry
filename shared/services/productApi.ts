import { api } from './api';

// Backend response types (matching backend DTOs)
export interface ProductSummary {
    id: number; // Backend: Long
    title: string;
    price: number;
    status: 'SELLING' | 'RESERVED' | 'SOLD';
    tradeType: 'DIRECT' | 'DELIVERY' | 'BOTH';
    thumbnailUrl: string;
    category: {
        id: number;
        code: string;
        displayName: string;
    } | null;
    seller?: {
        id: number;
        nickname: string;
    };
    createdAt: string; // ISO-8601 string
    tags: string[];
    isLiked: boolean;
    likeCount: number;
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
    category: {
        id: number;
        code: string;
        displayName: string;
    } | null;
    tags: string[];
    description: string;
    seller: {
        id: number;
        nickname: string;
    };
    createdAt: string;
    isLiked: boolean;
    likeCount: number;
}

export interface UploadFileMeta {
    fileName: string;
    contentType: string;
    size: number;
}

export interface UploadImagesResponse {
    items: {
        imageKey: string;
        uploadUrl: string;
        requiredHeaders: Record<string, string>;
    }[];
}

export interface ProductCreateRequest {
    title: string;
    price: number;
    description?: string;
    categoryId: number;
    tradeType: 'DIRECT' | 'DELIVERY' | 'BOTH';
    imageKeys: string[];
    tags: string[];
}

export interface ProductCreateResponse {
    productId: number;
}

export interface AiGenerateRequest {
    keywords: string;
    category: string;
}

export interface AiGenerateResponse {
    generatedDescription: string;
}

export const productApi = {
    /**
     * 상품 목록 조회 (cursor 기반 페이지네이션)
     * @param cursor - 다음 페이지 커서 (선택)
     * @param limit - 페이지당 항목 수 (기본값: 20, 최대: 50)
     */
    getProducts: (
        cursor?: string,
        limit = 20,
        token?: string | null,
        filters?: {
            status?: 'SELLING' | 'RESERVED' | 'SOLD';
            categoryCode?: string;
            minPrice?: number;
            maxPrice?: number;
            tradeType?: 'DIRECT' | 'DELIVERY' | 'BOTH';
            sortBy?: 'LATEST' | 'LOW_PRICE' | 'HIGH_PRICE';
        }
    ) => {
        const params = new URLSearchParams();
        if (cursor) {
            params.append('cursor', cursor);
        }
        if (filters?.status) params.append('status', filters.status);
        if (filters?.categoryCode) params.append('categoryCode', filters.categoryCode);
        if (filters?.minPrice != null) params.append('minPrice', String(filters.minPrice));
        if (filters?.maxPrice != null) params.append('maxPrice', String(filters.maxPrice));
        if (filters?.tradeType) params.append('tradeType', filters.tradeType);
        if (filters?.sortBy) params.append('sortBy', filters.sortBy);
        params.append('limit', String(limit));
        const endpoint = `/products?${params}`;
        if (token) {
            return api.authenticatedGet<ProductListResponse>(endpoint, token);
        }
        return api.get<ProductListResponse>(endpoint);
    },

    /**
     * 상품 상세 조회
     * 부수 효과: 조회수 자동 증가 (Redis trending 업데이트)
     */
    getProductDetail: (id: number, token?: string | null) => {
        const endpoint = `/products/${id}`;
        if (token) {
            return api.authenticatedGet<ProductDetail>(endpoint, token);
        }
        return api.get<ProductDetail>(endpoint);
    },

    /**
     * 트렌딩 상품 조회 (조회수 기반 Top N)
     */
    getTrending: (token?: string | null, signal?: AbortSignal) => {
        const endpoint = `/products/trending`;
        if (token) {
            return api.authenticatedGet<ProductListResponse>(endpoint, token);
        }
        return api.get<ProductListResponse>(endpoint, signal);
    },

    /**
     * 조회수 증가 (명시적 호출용)
     * 현재: GET /products/{id}에서 자동 증가하므로 중복 호출 주의
     */
    increaseViewCount: (id: number) => api.post<void>(`/products/${id}/views`),

    prepareUpload: (token: string, files: UploadFileMeta[]) =>
        api.authenticatedPost<UploadImagesResponse>('/api/upload/images', token, { files }),

    createProduct: (token: string, body: ProductCreateRequest) =>
        api.authenticatedPost<ProductCreateResponse>('/products', token, body),

    generateDescription: (token: string, body: AiGenerateRequest) =>
        api.authenticatedPost<AiGenerateResponse>('/api/ai/generate-description', token, body),
};
