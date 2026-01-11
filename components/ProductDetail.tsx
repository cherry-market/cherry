import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, MoreVertical, MessageCircle, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { generateGoodsImage } from '../services/geminiService';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State to handle AI Generated Image override
  const [displayImage, setDisplayImage] = useState<string>(product.images[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  // If user swipes, update the display image to the slider image (unless we have a generated one?)
  // For simplicity, let's keep the AI image separate or replace the current index.
  
  const handleRegenerateImage = async () => {
    setIsGenerating(true);
    try {
        const prompt = `${product.title} ${product.category}. K-pop merchandise product photography.`;
        const newUrl = await generateGoodsImage(prompt);
        if (newUrl) {
            setDisplayImage(newUrl);
        }
    } catch (error) {
        console.error("Failed to generate image", error);
        alert("이미지 생성에 실패했습니다.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col pb-24 animate-[fadeIn_0.3s_ease-out] max-w-2xl mx-auto shadow-2xl relative">
      {/* Header (Absolute) */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
        <Button variant="icon" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex gap-2">
          <Button variant="icon">
            <Share2 size={20} />
          </Button>
          <Button variant="icon">
            <MoreVertical size={20} />
          </Button>
        </div>
      </header>

      {/* Image Slider */}
      <div className="relative w-full aspect-square bg-gray-200 overflow-hidden rounded-b-[32px] shadow-lg group">
        <img 
          src={displayImage}
          alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-300" 
        />
        
        {/* Loading Overlay */}
        {isGenerating && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10">
                <Loader2 size={48} className="animate-spin mb-2" />
                <span className="font-bold text-sm">AI가 굿즈 이미지를 생성중입니다...</span>
            </div>
        )}

        {/* AI Generator Trigger Button */}
        <div className="absolute bottom-4 right-4 z-10">
            <button 
                onClick={handleRegenerateImage}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-black/30 backdrop-blur-md hover:bg-cherry border border-white/30 text-white px-3 py-2 rounded-full text-xs font-bold transition-all active:scale-95 shadow-lg"
            >
                {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {displayImage === product.images[0] ? "AI로 실제 이미지 생성" : "이미지 다시 만들기"}
            </button>
        </div>

        {/* Slider Indicators (Hide if AI image replaces it) */}
        {product.images.length > 1 && displayImage === product.images[0] && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 bg-black/20 backdrop-blur-md rounded-full pointer-events-none">
            {product.images.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="px-5 py-6 flex-1">
        {/* Seller Info */}
        <div className="glass-panel rounded-[20px] p-3 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={product.seller.avatar} alt={product.seller.name} className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
            <div>
              <p className="text-sm font-bold text-text">{product.seller.name}</p>
              <p className="text-xs text-coolGray">서울 성동구</p>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs font-bold text-cherry flex items-center justify-end gap-1">
                {product.seller.temperature}°C
                <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-cherry w-[80%]"></div>
                </div>
             </div>
             <span className="text-[10px] text-coolGray">매너온도</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-2 flex items-start justify-between">
           <div>
              <Badge status={product.status} className="mb-2" />
              <h1 className="text-2xl font-black text-text leading-tight mb-1 break-keep">{product.title}</h1>
              <p className="text-xs text-coolGray font-medium">{product.category} • {product.uploadedTime}</p>
           </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line break-all">
            {product.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {product.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-[12px] bg-white border border-gray-100 text-xs font-bold text-coolGray shadow-sm">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 pb-safe flex items-center justify-between z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
            <button className="p-3 rounded-full bg-gray-100 text-gray-400 hover:text-cherry hover:bg-cherry/10 transition-colors active:scale-95">
                <Heart size={24} />
            </button>
            <div className="pl-2 border-l border-gray-200">
                <p className="text-xl font-black text-text">{product.price.toLocaleString()} <span className="text-sm">원</span></p>
                <p className="text-[10px] font-bold text-cherry cursor-pointer">가격 제안하기</p>
            </div>
        </div>
        
        <Button className="pl-6 pr-8">
            <MessageCircle size={18} className="mr-2" />
            채팅하기
        </Button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .pb-safe {
            padding-bottom: max(16px, env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
};
