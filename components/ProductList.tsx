import React from 'react';
import { Product } from '../types';
import { ProductRow } from './ProductRow';
import { Sparkles } from 'lucide-react';

interface ProductListProps {
    products: Product[];
    onItemClick: (product: Product) => void;
    emptyMessage?: string;
    className?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
    products,
    onItemClick,
    emptyMessage = "상품이 없어요.",
    className = ''
}) => {
    if (products.length === 0) {
        return (
            <div className={`flex flex-col items-center justify-center py-20 text-center ${className}`}>
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Sparkles size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{emptyMessage}</h3>
                <p className="text-sm text-gray-500 mt-1">다른 키워드나 필터로 다시 찾아보세요.</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col ${className}`}>
            {products.map(product => (
                <ProductRow
                    key={product.id}
                    product={product}
                    onClick={() => onItemClick(product)}
                />
            ))}
        </div>
    );
};
