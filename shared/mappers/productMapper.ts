import type { Product } from '@/features/product/types';
import type { ProductSummary, ProductDetail } from '@/shared/services/productApi';

/**
 * ProductMapper - 백엔드 DTO와 프론트엔드 타입 간 변환 담당
 */
export class ProductMapper {
    /**
     * 백엔드 ProductSummary → 프론트엔드 Product 변환
     * (상품 목록용)
     */
    static toFrontend(backend: ProductSummary): Product {
        return {
            id: backend.id,
            title: backend.title,
            price: backend.price,
            image: backend.thumbnailUrl,
            status: backend.status,
            tradeType: backend.tradeType === 'BOTH' ? 'ALL' : backend.tradeType,
            images: [backend.thumbnailUrl],
            description: '',
            uploadedTime: new Date(backend.createdAt).toLocaleString('ko-KR'),

            // 백엔드에서 미제공 필드 → 기본값
            category: '미분류',
            likes: backend.likeCount,
            isLiked: backend.isLiked,
            seller: {
                name: '판매자',
                avatar: 'https://via.placeholder.com/50',
                temperature: 36.5,
            },
            tags: [],
            artist: undefined,
        };
    }

    /**
     * 백엔드 ProductDetail → 프론트엔드 Product 변환
     * (상품 상세용 - Branch 2에서 사용)
     */
    static toFrontendFromDetail(backend: ProductDetail): Product {
        return {
            id: backend.id,
            title: backend.title,
            price: backend.price,
            image: backend.imageUrls[0] || 'https://via.placeholder.com/400',
            status: backend.status,
            tradeType: backend.tradeType === 'BOTH' ? 'ALL' : backend.tradeType,
            images: backend.imageUrls,
            description: backend.description,
            uploadedTime: new Date(backend.createdAt).toLocaleString('ko-KR'),

            // Seller 정보 (부분적으로만 제공)
            seller: {
                name: backend.seller.nickname,
                avatar: 'https://via.placeholder.com/50',
                temperature: 36.5,
            },

            // 미제공 필드 → 기본값
            category: '미분류',
            likes: backend.likeCount,
            isLiked: backend.isLiked,
            tags: [],
            artist: undefined,
        };
    }

    /**
     * 여러 ProductSummary를 한 번에 변환
     */
    static toFrontendList(backendList: ProductSummary[]): Product[] {
        return backendList.map(this.toFrontend);
    }
}
