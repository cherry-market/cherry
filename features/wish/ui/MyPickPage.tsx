import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles } from 'lucide-react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { LoginPrompt } from '@/shared/ui/LoginPrompt';
import { CherryIcon } from '@/shared/ui/CherryIcon';
import { Button } from '@/shared/ui/Button';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useMyLikes } from '@/features/wish/hooks/useMyLikes';
import { ProductCard } from '@/features/product/components/ProductCard';
import type { Product } from '@/features/product/types';
import { ROUTES } from '@/shared/constants/routes';

export const MyPickPage: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    const {
        products,
        isLoading,
        isLoadingMore,
        error,
        hasMore,
        loadMore,
        reload,
    } = useMyLikes({ enabled: isLoggedIn });

    const handleProductClick = useCallback(
        (product: Product) => {
            navigate(ROUTES.PRODUCT_DETAIL(product.id));
        },
        [navigate]
    );
    const loadMoreNode = hasMore ? (
        <div className="mt-6 flex justify-center">
            <Button
                variant="primary"
                onClick={loadMore}
                disabled={isLoadingMore}
            >
                {isLoadingMore ? '불러오는 중...' : '더 보기'}
            </Button>
        </div>
    ) : null;

    if (!isLoggedIn) {
        return (
            <div className="bg-white min-h-screen">
                <PageHeader title="체리픽" />
                <LoginPrompt
                    title="관심있는 상품을 픽해보세요"
                    description="로그인하고 나만의 체리픽을 채워보세요."
                    icon={<CherryIcon size={48} className="text-gray-300" />}
                />
            </div>
        );
    }

    const productCards = products.map((product) => (
        <ProductCard
            key={product.id}
            product={product}
            onClick={handleProductClick}
        />
    ));

    let content = (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Sparkles size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">찜한 상품이 없어요</h3>
            <p className="text-sm text-gray-500 mt-1">마음에 드는 상품을 픽해보세요.</p>
        </div>
    );

    if (isLoading) {
        content = (
            <div className="flex items-center justify-center py-24">
                <Loader2 size={28} className="animate-spin text-cherry" />
            </div>
        );
    } else if (error) {
        content = (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                <Button variant="primary" onClick={reload}>
                    다시 시도
                </Button>
            </div>
        );
    } else if (products.length > 0) {
        content = (
            <div className="px-4 pb-6">
                <div className="grid grid-cols-2 gap-4">
                    {productCards}
                </div>
                {loadMoreNode}
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-24">
            <PageHeader title="체리픽" />
            {content}
        </div>
    );
};
