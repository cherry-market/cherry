import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { LoginPrompt } from '@/shared/ui/LoginPrompt';
import { CherryIcon } from '@/shared/ui/CherryIcon';
import { Button } from '@/shared/ui/Button';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useMyLikes } from '@/features/wish/hooks/useMyLikes';
import { ProductList } from '@/features/product/components/ProductList';
import { ROUTES } from '@/shared/constants/routes';
import { HOME_INFINITE_SCROLL_OFFSET_PX } from '@/features/home/constants';

export const MyPickPage: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    const {
        products: likedProducts,
        isLoading,
        isLoadingMore,
        error,
        hasMore,
        loadMore,
        refresh,
    } = useMyLikes();

    useEffect(() => {
        if (!isLoggedIn) return;

        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - HOME_INFINITE_SCROLL_OFFSET_PX
            ) {
                if (!isLoadingMore && hasMore) {
                    loadMore();
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore, isLoadingMore, hasMore, isLoggedIn]);

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 size={48} className="animate-spin text-cherry" />
            </div>
        );
    }

    return (
        <div className="pb-24 bg-white min-h-screen">
            <PageHeader title="체리픽" />
            {error ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-sm text-gray-500 mb-4">{error}</p>
                    <Button variant="primary" onClick={refresh}>
                        다시 시도
                    </Button>
                </div>
            ) : (
                <>
                    <ProductList
                        products={likedProducts}
                        onItemClick={(product) => navigate(ROUTES.PRODUCT_DETAIL(product.id))}
                        emptyMessage="찜한 상품이 없어요"
                    />
                    {isLoadingMore && (
                        <div className="py-8 flex justify-center">
                            <Loader2 size={24} className="animate-spin text-cherry" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
