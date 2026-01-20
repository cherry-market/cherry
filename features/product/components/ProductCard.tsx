import React from 'react';
import { CherryIcon } from '@/shared/ui/CherryIcon';
import type { Product } from '../types';
import { StatusBadge } from './StatusBadge';
import { useProductLike } from '../hooks/useProductLike';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { isLiked, toggleLike, likesCount, loginAlertOpen, closeLoginAlert, confirmLogin } = useProductLike(product);

  return (
    <div
      onClick={() => onClick(product)}
      className="group relative glass-object rounded-[20px] cursor-pointer tactile flex flex-col h-full bg-white/40 overflow-hidden"
    >
      {/* 1. THE IMAGE VAULT */}
      <div className="relative p-2 pb-0">
        <div className="relative aspect-square rounded-[16px] overflow-hidden bg-silver-light border border-white shadow-inner">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Industrial Status Tag */}
          <div className="absolute top-0 left-0 p-1.5 z-10">
            <StatusBadge status={product.status} />
          </div>


        </div>
      </div>

      {/* 2. THE METAL PLATE (Info Area) */}
      <div className="relative p-3 flex flex-col flex-1 justify-between">

        {/* Title Area */}
        <div className="mb-2">
          {/* CHANGED: Added font-semibold */}
          <h3 className="text-[13px] font-semibold text-ink leading-[1.3] line-clamp-2 tracking-tight">
            {product.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5 opacity-60">
            <span className="text-[10px] text-silver-dark">
              {product.category}
            </span>
            <span className="w-0.5 h-2 bg-silver-metal rounded-full"></span>
            <span className="text-[10px] text-silver-dark">
              {product.uploadedTime}
            </span>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-end justify-between border-t border-white/50 pt-2 mt-auto">
          {/* PRICE: Changed font-bold to font-semibold */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-[15px] font-semibold text-ink tracking-tight">
                {product.price.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* Like Count */}
          <button
            onClick={toggleLike}
            className="flex items-center gap-1 text-silver-metal hover:text-cherry transition-colors p-1 -mr-1 rounded-full active:scale-95"
          >
            <CherryIcon isLiked={isLiked} size={14} strokeWidth={2.5} />
            <span className={`text-[10px] font-bold ${isLiked ? 'text-cherry' : ''}`}>{likesCount}</span>
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={loginAlertOpen}
        title="로그인이 필요해요"
        description="관심 상품으로 등록하려면 로그인이 필요합니다."
        confirmLabel="로그인하기"
        onConfirm={confirmLogin}
        onCancel={closeLoginAlert}
      />
    </div>
  );
};
