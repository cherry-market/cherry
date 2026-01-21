import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useProductDetail } from '../hooks/useProductDetail';
import { ProductDetail } from '../components/ProductDetail';
import { ROUTES } from '@/shared/constants/routes';

/**
 * ProductDetailWrapper - 상품 상세 페이지 Wrapper
 */
export const ProductDetailWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // ID가 없거나 유효하지 않은 경우
    if (!id || isNaN(Number(id))) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-500 mb-4">잘못된 상품 ID입니다.</p>
                <button
                    onClick={() => navigate(ROUTES.ROOT)}
                    className="px-4 py-2 bg-cherry text-white rounded-xl"
                >
                    홈으로 가기
                </button>
            </div>
        );
    }

    const productId = Number(id);
    const { product, isLoading, error } = useProductDetail(productId);

    // 로딩 중
    if (isLoading) {
        return (
            <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl flex items-center justify-center">
                <Loader2 size={48} className="animate-spin text-cherry" />
            </div>
        );
    }

    // 에러 발생
    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <p className="text-coolGray text-center mb-4">{error || '상품을 찾을 수 없습니다.'}</p>
                <button
                    onClick={() => navigate(ROUTES.ROOT)}
                    className="px-4 py-2 bg-cherry text-white rounded-xl hover:bg-cherryDeep transition-colors"
                >
                    홈으로 가기
                </button>
            </div>
        );
    }

    // 정상 렌더링
    return (
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
            <ProductDetail product={product} onBack={() => navigate(-1)} />
        </div>
    );
};
