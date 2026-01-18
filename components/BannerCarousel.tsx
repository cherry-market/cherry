import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { generateGoodsImage } from '../services/geminiService';

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  fallbackImage: string;
  prompt: string;
}

const BANNERS: BannerItem[] = [
  {
    id: 1,
    title: "NewJeans 'Get Up' \nPop-up Store Goods",
    subtitle: "체리 단독 입고! 한정판 버니 비치백",
    fallbackImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    prompt: "NewJeans style Bunny Beach Bag, white and pink, cute rabbit ears design, soft fluffy texture, fashion product photography, pastel studio background"
  },
  {
    id: 2,
    title: "IVE World Tour \nMD Collection",
    subtitle: "콘서트의 감동을 다시 한 번, 공식 응원봉 재입고",
    fallbackImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    prompt: "K-pop concert lightstick glowing in the dark, neon pink and white lights, bokeh stadium background, high tech sleek design, cinematic lighting 16:9"
  },
  {
    id: 3,
    title: "Cherry's Pick: \nRare Photocards",
    subtitle: "이번 주 가장 핫한 레어 포카 모음전",
    fallbackImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    prompt: "A collection of rare holographic K-pop photocards arranged on a clean white table, rainbow reflections, top down view, high quality detail"
  }
];

export const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<Record<number, string>>({});
  const [generating, setGenerating] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const hasApiKey = !!process.env.API_KEY;
      if (!hasApiKey) return;

      BANNERS.forEach(async (banner) => {
        if (images[banner.id] || generating[banner.id]) return;

        setGenerating(prev => ({ ...prev, [banner.id]: true }));
        try {
          const generatedUrl = await generateGoodsImage(banner.prompt, "16:9");
          if (generatedUrl) {
            setImages(prev => ({ ...prev, [banner.id]: generatedUrl }));
          }
        } catch (e) {
          console.error("Failed to generate banner image", e);
        } finally {
          setGenerating(prev => ({ ...prev, [banner.id]: false }));
        }
      });
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full px-4 mt-4 mb-6">
        {/* Fixed Mobile Height: 240px */}
        <div className="relative w-full h-[240px] rounded-[24px] overflow-hidden glass-object shadow-object group bg-gray-100">
            
            {/* Slides */}
            {BANNERS.map((banner, index) => {
              const displayImage = images[banner.id] || banner.fallbackImage;
              const isAiImage = !!images[banner.id];

              return (
                <div 
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <div className="absolute inset-0 bg-gray-200">
                        <img 
                            src={displayImage} 
                            alt={banner.title} 
                            className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                        
                        {isAiImage && (
                          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 border border-white/20">
                            <Sparkles size={10} className="text-cherry" />
                            <span>AI Generated</span>
                          </div>
                        )}
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
                        <div className="inline-block px-2 py-0.5 mb-3 border border-white/30 rounded-full bg-white/10 backdrop-blur-md w-fit">
                            <span className="text-[9px] font-bold tracking-widest uppercase text-cherry-neon shadow-sm">Featured</span>
                        </div>
                        <h2 className="text-2xl font-black leading-tight mb-2 tracking-tight whitespace-pre-line drop-shadow-xl">
                            {banner.title}
                        </h2>
                        <p className="text-sm font-medium opacity-90 drop-shadow-md line-clamp-1">
                            {banner.subtitle}
                        </p>
                    </div>
                </div>
              );
            })}

            {/* Indicators */}
            <div className="absolute bottom-4 left-6 z-20 flex gap-1.5">
                {BANNERS.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'w-6 bg-cherry' : 'w-1.5 bg-white/40 hover:bg-white'}`}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};