import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import type { FilterState, Product } from '@/features/product/types';
import { productApi } from '@/shared/services/productApi';
import { ProductMapper } from '@/shared/mappers/productMapper';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useWishStore } from '@/features/wish/model/wishStore';

/**
 * useProducts - 상품 목록 데이터 로딩 및 무한 스크롤 관리
 */
export const useProducts = (filter: FilterState) => {
    const token = useAuthStore(state => state.token);
    const initializeLikes = useWishStore(state => state.initializeLikes);
    const [products, setProducts] = useState<Product[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasInitializedLikes = useRef(false);
    const lastTokenRef = useRef<string | null>(token ?? null);

    const backendFilters = useMemo(() => ({
        status: filter.status === 'ALL' ? undefined : filter.status,
        categoryCode: filter.categoryCode === 'ALL' ? undefined : filter.categoryCode,
        minPrice: filter.minPrice > 0 ? filter.minPrice : undefined,
        maxPrice: filter.maxPrice > 0 ? filter.maxPrice : undefined,
        tradeType: filter.tradeType === 'ALL' ? undefined : (filter.tradeType as 'DIRECT' | 'DELIVERY'),
        sortBy: filter.sortBy === 'LATEST' ? undefined : filter.sortBy,
    }), [
        filter.status,
        filter.categoryCode,
        filter.minPrice,
        filter.maxPrice,
        filter.tradeType,
        filter.sortBy,
    ]);

    const filterKey = useMemo(() => JSON.stringify(backendFilters), [backendFilters]);

    /**
     * 초기 상품 목록 로드
     */
    const loadInitial = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await productApi.getProducts(undefined, 20, token, backendFilters);
            const mappedProducts = ProductMapper.toFrontendList(response.items);

            if (lastTokenRef.current !== token) {
                hasInitializedLikes.current = false;
                lastTokenRef.current = token ?? null;
            }

            if (!hasInitializedLikes.current) {
                const likedIds = mappedProducts
                    .filter(product => product.isLiked)
                    .map(product => product.id);
                initializeLikes(likedIds);
                hasInitializedLikes.current = true;
            }

            setProducts(mappedProducts);
            setCursor(response.nextCursor);
        } catch (err) {
            console.error('Failed to load products:', err);
            setError('상품 목록을 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [token, initializeLikes, backendFilters]);

    /**
     * 다음 페이지 로드 (무한 스크롤용)
     */
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !cursor) return;

        setIsLoadingMore(true);

        try {
            const response = await productApi.getProducts(cursor, 20, token, backendFilters);
            const mappedProducts = ProductMapper.toFrontendList(response.items);

            setProducts(prev => [...prev, ...mappedProducts]);
            setCursor(response.nextCursor);
        } catch (err) {
            console.error('Failed to load more products:', err);
            // 추가 로딩 실패는 조용히 처리 (사용자 경험 고려)
        } finally {
            setIsLoadingMore(false);
        }
    }, [cursor, isLoadingMore, token, backendFilters]);

    /**
     * 수동 새로고침
     */
    const refresh = useCallback(async () => {
        await loadInitial();
    }, [loadInitial]);

    useEffect(() => {
        setProducts([]);
        setCursor(null);
        void loadInitial();
    }, [loadInitial, filterKey]);

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
