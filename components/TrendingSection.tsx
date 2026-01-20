import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface TrendingSectionProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ products, onProductClick }) => {
    return (
        <div className="py-4 bg-gray-50/50">
            <div className="px-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-cherry rounded-full" />
                    <h2 className="text-xl font-black text-ink">지금 뜨는 체리픽</h2>
                </div>
                <span className="text-xs font-bold text-gray-400 cursor-pointer hover:text-cherry transition-colors">전체보기</span>
            </div>

            <div className="flex overflow-x-auto px-4 pb-4 gap-3 no-scrollbar snap-x snap-mandatory">
                {products.map(product => (
                    <div key={product.id} className="snap-center flex-shrink-0 w-[140px]">
                        <ProductCard
                            product={product}
                            onClick={onProductClick}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
