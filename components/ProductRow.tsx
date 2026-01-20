import React, { useState } from 'react';
import { MessageCircle, Cherry } from 'lucide-react';
import { Product } from '../types';
import { StatusBadge } from './StatusBadge';

interface ProductRowProps {
    product: Product;
    onClick: (product: Product) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, onClick }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <div
            onClick={() => onClick(product)}
            className="flex py-4 px-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors bg-white"
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

                    {/* Like Count - Visual Only as per RFP */}
                    <div className="flex items-center gap-1 min-w-[32px] justify-end">
                        <Cherry size={14} className={product.likes > 0 ? "text-gray-400" : "text-gray-300"} />
                        <span className="text-xs text-gray-400">{product.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
