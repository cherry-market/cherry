import React, { useState } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { generateGoodsImage } from '@/shared/services/geminiService';
import { Button } from '@/shared/ui/Button';

interface ImageGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onImageGenerated: (url: string) => void;
}

export const ImageGeneratorSheet: React.FC<ImageGeneratorProps> = ({ isOpen, onClose, onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');

    try {
      const imageUrl = await generateGoodsImage(prompt);
      if (imageUrl) {
        onImageGenerated(imageUrl);
        onClose();
        setPrompt(''); 
      } else {
        setError("생성 실패. API 키를 확인해주세요.");
      }
    } catch (e) {
      setError("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sheet - Constrained width */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[60] bg-white/90 backdrop-blur-xl rounded-t-[32px] border-t border-white/50 shadow-2xl animate-[slideUp_0.3s_ease-out]">
        <div className="p-6 pb-safe">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-br from-cherry to-purple-500 rounded-lg text-white">
                        <Sparkles size={18} />
                    </div>
                    <h3 className="text-lg font-black text-text">AI 가상 굿즈 만들기</h3>
                </div>
                <button onClick={onClose} className="p-2 -mr-2 text-gray-500 active:scale-95 transition-transform">
                    <X size={24} />
                </button>
            </div>
          
            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">상상 속의 굿즈를 설명해주세요.</p>
                <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="예: 핑크색 네온 응원봉, 고양이 모양 키링, 힙한 밴드 티셔츠"
                    className="w-full h-32 p-4 rounded-[20px] bg-white border border-gray-200 focus:border-cherry focus:ring-2 focus:ring-cherry/20 outline-none resize-none text-sm transition-all"
                />
            </div>

            <Button 
                variant="primary" 
                fullWidth 
                onClick={handleGenerate} 
                disabled={loading || !prompt}
                className="h-14 text-base"
            >
                {loading ? (
                    <span className="flex items-center">
                        <Loader2 size={20} className="animate-spin mr-2" />
                        생성 중...
                    </span>
                ) : (
                    <span className="flex items-center">
                        <Sparkles size={20} className="mr-2" />
                        굿즈 생성하기
                    </span>
                )}
            </Button>
            
            {error && <p className="text-xs text-red-500 mt-3 text-center font-bold">{error}</p>}
        </div>
      </div>
      
       <style>{`
        @keyframes slideUp {
          from { transform: translate(-50%, 100%); }
          to { transform: translate(-50%, 0); }
        }
        .pb-safe {
            padding-bottom: max(24px, env(safe-area-inset-bottom));
        }
      `}</style>
    </>
  );
};
