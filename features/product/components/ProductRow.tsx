import React from 'react';
import type { Product } from '../types';
import { StatusBadge } from './StatusBadge';
import { PickButton } from '@/features/wish/ui/PickButton';

interface ProductRowProps {
    product: Product;
    onClick: (product: Product) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, onClick }) => {
    const initialIsLiked = product.isLiked ?? false;
    const pickCount = product.likes;
    const pickButtonClassName = 'min-w-[32px] justify-end p-2 -mr-2 rounded-full hover:bg-gray-100 transition-all';

    return (
        <div
            onClick={() => onClick(product)}
            className="flex py-4 px-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors bg-white relative"
        >
            {/* Image */}
            <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                {product.status !== 'SELLING' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <StatusBadge status={product.status} variant="overlay" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="ml-4 flex-1 flex flex-col justify-between py-0.5">
                <div>
                    <h3 className="text-[15px] font-normal text-ink leading-snug line-clamp-2">
                        {product.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-[12px] text-gray-500">
                        <span>{product.seller.name || '동네이웃'}</span>
                        <span>·</span>
                        <span>{product.uploadedTime}</span>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <div className="flex items-center gap-2">
                        {product.status !== 'SELLING' && (
                            <span className={`text-[12px] font-bold ${product.status === 'RESERVED' ? 'text-green-600' : 'text-gray-500'}`}>
                                {product.status === 'RESERVED' ? '예약중' : '거래완료'}
                            </span>
                        )}
                        <span className="text-[16px] font-bold text-ink">
                            {product.price.toLocaleString()}원
                        </span>
                    </div>

                    {/* Like Count - Visual Only as per RFP -> Now Interactive */}
                    <PickButton
                        productId={product.id}
                        initialIsLiked={initialIsLiked}
                        variant="counter"
                        size={16}
                        count={pickCount}
                        className={pickButtonClassName}
                    />
                </div>
            </div>
        </div>
    );
};
