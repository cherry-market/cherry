import { useState, useCallback } from 'react';
import type { Product } from '@/features/product/types';
import { productApi } from '@/shared/services/productApi';
import { ProductMapper } from '@/shared/mappers/productMapper';

/**
 * useTrending - 트렌딩 상품 데이터 로딩 (useProducts와 동일한 패턴)
 */
export const useTrending = (limit: number = 10) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadTrending = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await productApi.getTrending();
            const mapped = ProductMapper.toFrontendList(response.items);
            setProducts(mapped.slice(0, limit));
        } catch (err) {
            console.error('Failed to load trending:', err);
            setError('인기 상품을 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, []); // limit은 closure로 접근, dependency 없음

    return {
        products,
        isLoading,
        error,
        loadTrending,
    };
};
