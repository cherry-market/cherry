import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Share2, MoreVertical, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Added
import type { Product } from '../types';
import { StatusBadge } from './StatusBadge';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { PickButton } from '@/features/wish/ui/PickButton';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'; // Added
import { useAuthStore } from '@/features/auth/model/authStore'; // Added
import { ROUTES } from '@/shared/constants/routes'; // Added

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const navigate = useNavigate(); // Added
  const { isLoggedIn } = useAuthStore(); // Added
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const initialIsLiked = product.isLiked ?? false;
  const pickButtonClassName = 'p-3 rounded-full bg-gray-100 text-gray-400 hover:bg-[#FF2E88]/10 transition-colors';

  // Chat Logic
  const [chatAlertOpen, setChatAlertOpen] = useState(false);

  const handleChat = () => {
    if (!isLoggedIn) {
      setChatAlertOpen(true);
      return;
    }
    // Navigate to Chat (Mock)
    navigate(ROUTES.CHAT_DETAIL(product.id)); // Using product ID as chat ID for mock
  };

  const handleLinkCopied = () => {
    // Mock share
    alert("링크가 복사되었습니다!");
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col pb-32 animate-fadeIn relative">
      {/* Header (Absolute) */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
        <Button variant="icon" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex gap-2">
          <Button variant="icon" onClick={handleLinkCopied}>
            <Share2 size={20} />
          </Button>
          <Button variant="icon">
            <MoreVertical size={20} />
          </Button>
        </div>
      </header>

      {/* Image Slider */}
      <div className="relative w-full aspect-square bg-gray-200 overflow-hidden rounded-b-[32px] shadow-lg group">
        <div
          className="flex w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.title} - ${idx + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white backdrop-blur-md transition-all active:scale-95 hover:bg-black/30"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white backdrop-blur-md transition-all active:scale-95 hover:bg-black/30"
            >
              <ArrowRight size={20} />
            </button>
          </>
        )}

        {/* Slider Indicators */}
        {product.images.length > 1 && (
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
            <Avatar src={product.seller.avatar} alt={product.seller.name} size="sm" />
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
            <div className="flex gap-2 mb-2">
              <StatusBadge status={product.status} />
              {product.tradeType === 'DIRECT' && (
                <span className="px-2 py-0.5 rounded-[6px] bg-green-100 text-green-700 text-[10px] font-bold flex items-center">
                  직거래
                </span>
              )}
              {product.tradeType === 'DELIVERY' && (
                <span className="px-2 py-0.5 rounded-[6px] bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center">
                  택배
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-text leading-tight mb-1 break-keep">{product.title}</h1>
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-xs text-coolGray font-medium">
                {product.category} • {product.uploadedTime}
              </p>
              {product.artist && (
                <p className="text-xs font-bold text-cherry">
                  Artist: {product.artist}
                </p>
              )}
            </div>
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

      {/* Sticky Bottom Bar - Centered */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 pb-safe flex items-center justify-between z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <PickButton
            productId={product.id}
            initialIsLiked={initialIsLiked}
            variant="stacked"
            size={24}
            count={product.likes}
            className={pickButtonClassName}
          />
          <div className="pl-2 border-l border-gray-200">
            <p className="text-xl font-black text-text">{product.price.toLocaleString()} <span className="text-sm">원</span></p>
            <p className="text-[10px] font-bold text-cherry cursor-pointer">가격 제안하기</p>
          </div>
        </div>

        <div
          onClick={handleChat}
          className="relative z-50 cursor-pointer flex items-center"
        >
          <Button
            variant="primary"
            size="md"
            className="flex items-center gap-2"
          >
            <MessageCircle size={18} />
            채팅하기
          </Button>
        </div>
      </div>

      {/* Login Confirm Dialogs */}
      {/* For Chat */}
      <ConfirmDialog
        key="chat-confirm"
        isOpen={chatAlertOpen}
        title="채팅하려면 로그인이 필요해요"
        description="판매자와 대화하려면 로그인이 필요합니다."
        confirmLabel="로그인하기"
        onConfirm={() => {
          setChatAlertOpen(false);
          navigate(ROUTES.LOGIN);
        }}
        onCancel={() => setChatAlertOpen(false)}
      />

    </div>
  );
};
