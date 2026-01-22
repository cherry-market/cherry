import { useState, useCallback, useRef } from 'react';
import type { Product } from '@/features/product/types';
import { productApi } from '@/shared/services/productApi';
import { ProductMapper } from '@/shared/mappers/productMapper';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useWishStore } from '@/features/wish/model/wishStore';

/**
 * useTrending - 트렌딩 상품 데이터 로딩 (useProducts와 동일한 패턴)
 */
export const useTrending = (limit: number = 10) => {
    const token = useAuthStore(state => state.token);
    const initializeLikes = useWishStore(state => state.initializeLikes);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasInitializedLikes = useRef(false);
    const lastTokenRef = useRef<string | null>(token ?? null);

    const loadTrending = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await productApi.getTrending(token);
            const mapped = ProductMapper.toFrontendList(response.items);

            if (lastTokenRef.current !== token) {
                hasInitializedLikes.current = false;
                lastTokenRef.current = token ?? null;
            }

            if (!hasInitializedLikes.current) {
                const likedIds = mapped
                    .filter(product => product.isLiked)
                    .map(product => product.id);
                initializeLikes(likedIds);
                hasInitializedLikes.current = true;
            }

            setProducts(mapped.slice(0, limit));
        } catch (err) {
            console.error('Failed to load trending:', err);
            setError('인기 상품을 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [limit, token, initializeLikes]);

    return {
        products,
        isLoading,
        error,
        loadTrending,
    };
};
