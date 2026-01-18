import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

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
             <Badge status={product.status} />
          </div>

          {/* Like Button (찜) - MOVED TO BOTTOM RIGHT */}
          <button 
            onClick={handleLike}
            className={`absolute bottom-2 right-2 p-1.5 rounded-full backdrop-blur-md border transition-all z-20 active:scale-90 shadow-sm ${
              isLiked 
                ? 'bg-white border-cherry/20 text-cherry shadow-inner' 
                : 'bg-black/10 border-white/20 text-white hover:bg-black/20'
            }`}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "rgba(0,0,0,0.1)"} strokeWidth={isLiked ? 0 : 2} />
          </button>

          {/* Sold Overlay */}
          {product.status === 'SOLD' && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
              <div className="bg-silver-dark text-white font-mono font-bold text-sm px-3 py-1 -rotate-12 border-2 border-white shadow-xl">
                SOLD_OUT
              </div>
            </div>
          )}
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
          <div className="flex items-center gap-1 text-silver-metal">
            <Heart size={10} strokeWidth={2.5} className={isLiked ? 'text-cherry' : ''} />
            <span className={`text-[10px] ${isLiked ? 'text-cherry' : ''}`}>{product.likes + (isLiked ? 1 : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};