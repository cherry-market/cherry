import { useState, useCallback, useEffect, useRef } from 'react';
import type { Product } from '@/features/product/types';
import { wishApi } from '@/shared/services/wishApi';
import { ProductMapper } from '@/shared/mappers/productMapper';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useWishStore } from '@/features/wish/model/wishStore';

export const useMyLikes = () => {
    const token = useAuthStore(state => state.token);
    const initializeLikes = useWishStore(state => state.initializeLikes);
    const [products, setProducts] = useState<Product[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasInitializedLikes = useRef(false);
    const lastTokenRef = useRef<string | null>(token ?? null);

    const loadInitial = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await wishApi.getMyLikes(null, 20);
            const mappedProducts = ProductMapper.toFrontendList(response.items);

            if (lastTokenRef.current !== token) {
                hasInitializedLikes.current = false;
                lastTokenRef.current = token ?? null;
            }

            if (!hasInitializedLikes.current) {
                const likedIds = mappedProducts.map(product => product.id);
                initializeLikes(likedIds);
                hasInitializedLikes.current = true;
            }

            setProducts(mappedProducts);
            setCursor(response.nextCursor);
        } catch (err) {
            console.error('Failed to load likes:', err);
            setError('찜 목록을 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [token, initializeLikes]);

    const loadMore = useCallback(async () => {
        if (isLoadingMore || !cursor) return;
        setIsLoadingMore(true);
        try {
            const response = await wishApi.getMyLikes(cursor, 20);
            const mappedProducts = ProductMapper.toFrontendList(response.items);
            setProducts(prev => [...prev, ...mappedProducts]);
            setCursor(response.nextCursor);
        } catch (err) {
            console.error('Failed to load more likes:', err);
        } finally {
            setIsLoadingMore(false);
        }
    }, [cursor, isLoadingMore, token]);

    const refresh = useCallback(async () => {
        await loadInitial();
    }, [loadInitial]);

    useEffect(() => {
        void loadInitial();
    }, [loadInitial]);

    return {
        products,
        isLoading,
        isLoadingMore,
        error,
        hasMore: cursor !== null,
        loadMore,
        refresh,
    };
};
