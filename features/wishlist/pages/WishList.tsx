import React from 'react';
import type { Product } from '@/features/product/types';
import { ProductList } from '@/features/product/components/ProductList';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/shared/ui/PageHeader';
import { ROUTES } from '@/shared/constants/routes';

import { useAuthStore } from '@/features/auth/model/authStore';
import { LoginPrompt } from '@/shared/ui/LoginPrompt';
import { CherryIcon } from '@/shared/ui/CherryIcon';

interface WishListProps {
    products: Product[];
}

export const WishList: React.FC<WishListProps> = ({ products }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();

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

    // Simulate just some liked products
    const likedProducts = products.slice(0, 3);

    return (
        <div className="pb-24 bg-white min-h-screen">
            <PageHeader title="체리픽" />

            <ProductList
                products={likedProducts}
                onItemClick={(p) => navigate(ROUTES.PRODUCT_DETAIL(p.id))}
                emptyMessage="찜한 상품이 없어요"
            />
        </div>
    );
};
