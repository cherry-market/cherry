import type { Product } from '@/features/product/types';
import type { ProductDetail, ProductSummary } from '@/shared/services/productApi';
import { formatRelativeTimeKorean } from '@/shared/utils/time';

export class ProductMapper {
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
      uploadedTime: formatRelativeTimeKorean(backend.createdAt),
      category: backend.category?.displayName ?? '미분류',
      likes: backend.likeCount,
      isLiked: backend.isLiked,
      seller: {
        name: backend.seller?.nickname ?? '판매자',
        avatar: '/cherry_logo_profile.svg',
        temperature: 36.5,
      },
      tags: [],
      artist: undefined,
    };
  }

  static toFrontendFromDetail(backend: ProductDetail): Product {
    return {
      id: backend.id,
      title: backend.title,
      price: backend.price,
      image: backend.imageUrls[0] || '',
      status: backend.status,
      tradeType: backend.tradeType === 'BOTH' ? 'ALL' : backend.tradeType,
      images: backend.imageUrls,
      description: backend.description,
      uploadedTime: formatRelativeTimeKorean(backend.createdAt),
      seller: {
        name: backend.seller.nickname,
        avatar: '/cherry_logo_profile.svg',
        temperature: 36.5,
      },
      category: backend.category?.displayName ?? '미분류',
      likes: backend.likeCount,
      isLiked: backend.isLiked,
      tags: [],
      artist: undefined,
    };
  }

  static toFrontendList(backendList: ProductSummary[]): Product[] {
    return backendList.map(this.toFrontend);
  }
}
