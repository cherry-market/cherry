import React from 'react';
import { Product } from '../types';
import { ProductRow } from './ProductRow';
import { useNavigate } from 'react-router-dom';

interface WishListProps {
    products: Product[];
}

export const WishList: React.FC<WishListProps> = ({ products }) => {
    const navigate = useNavigate();
    // Simulate just some liked products
    const likedProducts = products.slice(0, 3);

    return (
        <div className="pb-24 pt-2 min-h-screen bg-white">
            <div className="px-4 mb-4 pt-2 border-b border-gray-100 pb-4">
                <h1 className="text-xl font-bold text-ink">관심 목록</h1>
            </div>

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
