import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group relative glass-object rounded-[24px] cursor-pointer tactile flex flex-col h-full bg-white/40"
    >
      {/* 1. THE IMAGE VAULT */}
      <div className="relative p-2 pb-0">
        <div className="relative aspect-square rounded-[18px] overflow-hidden bg-silver-light border border-white shadow-inner">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Industrial Status Tag */}
          <div className="absolute top-0 left-0 p-2 z-10">
             <Badge status={product.status} />
          </div>

          {/* Sold Overlay - Industrial Tape Style */}
          {product.status === 'SOLD' && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
              <div className="bg-silver-dark text-white font-mono font-bold text-lg px-4 py-1 -rotate-12 border-2 border-white shadow-xl">
                SOLD_OUT
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. THE METAL PLATE (Info Area) */}
      <div className="relative p-3 flex flex-col flex-1 justify-between">
        
        {/* Title Area */}
        <div className="mb-3">
          <h3 className="text-[14px] font-bold text-ink leading-[1.3] line-clamp-2 tracking-tight group-hover:text-cherry transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 opacity-60">
             <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-silver-dark">
               {product.category}
             </span>
             <span className="w-0.5 h-2 bg-silver-metal rounded-full"></span>
             <span className="text-[10px] font-medium text-silver-dark">
               {product.uploadedTime}
             </span>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-end justify-between border-t border-white/50 pt-2 mt-auto">
          {/* PRICE: The Focus */}
          <div className="flex flex-col">
             <span className="text-[10px] font-bold text-cherry-deep uppercase tracking-widest opacity-80 mb-[-2px]">Price</span>
             <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-black text-cherry tracking-tighter">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-cherry opacity-70">KRW</span>
             </div>
          </div>

          {/* Interaction Trigger */}
          <button className="w-8 h-8 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-cherry/50 hover:bg-cherry hover:text-white hover:border-cherry transition-all shadow-sm active:scale-90">
             <Heart size={16} fill="currentColor" className="transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
};