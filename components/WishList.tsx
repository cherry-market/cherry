import React from 'react';
import { Product } from '../types';
import { ProductRow } from './ProductRow';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from './PageHeader';

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

            <div className="flex flex-col">
                {likedProducts.map(product => (
                    <ProductRow
                        key={product.id}
                        product={product}
                        onClick={() => navigate(`/product/${product.id}`)}
                    />
                ))}
            </div>
        </div>
    );
};
