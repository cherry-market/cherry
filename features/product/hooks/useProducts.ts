import { useState, useCallback } from 'react';
import type { Product } from '@/features/product/types';
import { productApi } from '@/shared/services/productApi';
import { ProductMapper } from '@/shared/mappers/productMapper';

/**
 * useProducts - 상품 목록 데이터 로딩 및 무한 스크롤 관리
 */
export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 초기 상품 목록 로드
     */
    const loadInitial = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await productApi.getProducts(undefined, 20);
            const mappedProducts = ProductMapper.toFrontendList(response.items);

            setProducts(mappedProducts);
            setCursor(response.nextCursor);
        } catch (err) {
            console.error('Failed to load products:', err);
            setError('상품 목록을 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * 다음 페이지 로드 (무한 스크롤용)
     */
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !cursor) return;

        setIsLoadingMore(true);

        try {
            const response = await productApi.getProducts(cursor, 20);
            const mappedProducts = ProductMapper.toFrontendList(response.items);

            setProducts(prev => [...prev, ...mappedProducts]);
            setCursor(response.nextCursor);
        } catch (err) {
            console.error('Failed to load more products:', err);
            // 추가 로딩 실패는 조용히 처리 (사용자 경험 고려)
        } finally {
            setIsLoadingMore(false);
        }
    }, [cursor, isLoadingMore]);

    /**
     * 수동 새로고침
     */
    const refresh = useCallback(async () => {
        await loadInitial();
    }, [loadInitial]);

    return {
        products,
        isLoading,
        isLoadingMore,
        error,
        hasMore: cursor !== null,
        loadInitial,
        loadMore,
        refresh,
    };
};
