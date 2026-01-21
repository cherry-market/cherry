import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { ProductDetail } from '../components/ProductDetail';
import { ROUTES } from '@/shared/constants/routes';

interface ProductDetailWrapperProps {
    products: Product[];
}

export const ProductDetailWrapper: React.FC<ProductDetailWrapperProps> = ({ products }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Parse id as number to match Product.id type
    const productId = id ? Number(id) : undefined;
    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-500 mb-4">상품을 찾을 수 없습니다.</p>
                <button onClick={() => navigate(ROUTES.ROOT)} className="px-4 py-2 bg-cherry text-white rounded-xl">홈으로 가기</button>
            </div>
        );
    }

    return (
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
            <ProductDetail product={product} onBack={() => navigate(-1)} />
        </div>
    );
};
