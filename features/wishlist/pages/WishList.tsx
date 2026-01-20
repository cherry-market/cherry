import React from 'react';
import type { Product } from '@/features/product/types';
import { ProductList } from '@/features/product/components/ProductList';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/shared/ui/PageHeader';
import { ROUTES } from '@/shared/constants/routes';

interface WishListProps {
    products: Product[];
}

export const WishList: React.FC<WishListProps> = ({ products }) => {
    const navigate = useNavigate();
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
