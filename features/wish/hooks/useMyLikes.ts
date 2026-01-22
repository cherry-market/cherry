import { useCallback, useEffect, useState } from 'react';
import type { Product } from '@/features/product/types';
import { ProductMapper } from '@/shared/mappers/productMapper';
import { wishApi } from '@/shared/services/wishApi';

interface UseMyLikesParams {
    limit?: number;
    enabled?: boolean;
}

export const useMyLikes = ({ limit = 20, enabled = true }: UseMyLikesParams = {}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cursor, setCursor] = useState<string | null>(null);

    const loadInitial = useCallback(async () => {
        if (!enabled) {
            setProducts([]);
            setIsLoading(false);
            setIsLoadingMore(false);
            setError(null);
            setCursor(null);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await wishApi.getMyLikes(null, limit);
            const mapped = ProductMapper.toFrontendList(response.items);
            setProducts(mapped);
            setCursor(response.nextCursor);
        } catch (err) {
            setError(err instanceof Error ? err.message : '찜 목록을 불러오지 못했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [enabled, limit]);

    const loadMore = useCallback(async () => {
        if (!enabled || isLoadingMore || !cursor) {
            return;
        }
        setIsLoadingMore(true);
        try {
            const response = await wishApi.getMyLikes(cursor, limit);
            const mapped = ProductMapper.toFrontendList(response.items);
            setProducts(prev => [...prev, ...mapped]);
            setCursor(response.nextCursor);
        } catch (err) {
            // Ignore load-more errors to preserve existing list state
        } finally {
            setIsLoadingMore(false);
        }
    }, [cursor, enabled, isLoadingMore, limit]);

    useEffect(() => {
        loadInitial();
    }, [loadInitial]);

    return {
        products,
        isLoading,
        isLoadingMore,
        error,
        hasMore: enabled && cursor !== null,
        loadMore,
        reload: loadInitial,
    };
};
