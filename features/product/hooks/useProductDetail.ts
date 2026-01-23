import { useState, useEffect } from 'react';
import type { Product } from '@/features/product/types';
import { productApi } from '@/shared/services/productApi';
import { ProductMapper } from '@/shared/mappers/productMapper';
import { useAuthStore } from '@/features/auth/model/authStore';

/**
 * useProductDetail - 상품 상세 데이터 로딩
 */
export const useProductDetail = (productId: number) => {
    const token = useAuthStore(state => state.token);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProductDetail = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const detail = await productApi.getProductDetail(productId, token);
                const mappedProduct = ProductMapper.toFrontendFromDetail(detail);
                setProduct(mappedProduct);
            } catch (err) {
                console.error('Failed to load product detail:', err);
                setError('상품 정보를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        loadProductDetail();
    }, [productId, token]);

    return {
        product,
        isLoading,
        error,
    };
};
