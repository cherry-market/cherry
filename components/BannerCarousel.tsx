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
    // Fallback: White tote/fashion item (No cats)
    fallbackImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80",
    prompt: "NewJeans style Bunny Beach Bag, white and pink, cute rabbit ears design, soft fluffy texture, fashion product photography, pastel studio background"
  },
  {
    id: 2,
    title: "IVE World Tour \nMD Collection",
    subtitle: "콘서트의 감동을 다시 한 번, 공식 응원봉 재입고",
    // Fallback: Concert/Neon vibes
    fallbackImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
    prompt: "K-pop concert lightstick glowing in the dark, neon pink and white lights, bokeh stadium background, high tech sleek design, cinematic lighting 16:9"
  },
  {
    id: 3,
    title: "Cherry's Pick: \nRare Photocards",
    subtitle: "이번 주 가장 핫한 레어 포카 모음전",
    // Fallback: Cards flatlay
    fallbackImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1600&q=80",
    prompt: "A collection of rare holographic K-pop photocards arranged on a clean white table, rainbow reflections, top down view, high quality detail"
  }
];

export const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<Record<number, string>>({});
  const [generating, setGenerating] = useState<Record<number, boolean>>({});

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate images on mount
  useEffect(() => {
    const fetchImages = async () => {
      // Check if we already have images or if API key is present
      const hasApiKey = !!process.env.API_KEY;
      if (!hasApiKey) return;

      BANNERS.forEach(async (banner) => {
        // Prevent re-generation if already exists
        if (images[banner.id] || generating[banner.id]) return;

        setGenerating(prev => ({ ...prev, [banner.id]: true }));
        try {
          // Generate 16:9 image for banner
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
  }, []); // Run once on mount

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-4 mb-8">
        <div className="relative w-full h-[280px] md:h-[380px] rounded-[24px] overflow-hidden glass-object shadow-object group bg-gray-100">
            
            {/* Slides */}
            {BANNERS.map((banner, index) => {
              const displayImage = images[banner.id] || banner.fallbackImage;
              const isAiImage = !!images[banner.id];

              return (
                <div 
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 bg-gray-200">
                        <img 
                            src={displayImage} 
                            alt={banner.title} 
                            className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                        
                        {/* AI Badge if generated */}
                        {isAiImage && (
                          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 border border-white/20">
                            <Sparkles size={10} className="text-cherry" />
                            <span>AI Generated</span>
                          </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white max-w-2xl">
                        <div className="inline-block px-3 py-1 mb-4 border border-white/30 rounded-full bg-white/10 backdrop-blur-md w-fit animate-[fadeIn_0.5s_ease-out]">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-cherry-neon shadow-sm">Featured Event</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 tracking-tight whitespace-pre-line drop-shadow-xl animate-[slideUp_0.5s_ease-out]">
                            {banner.title}
                        </h2>
                        <p className="text-base md:text-lg font-medium opacity-90 drop-shadow-md animate-[slideUp_0.7s_ease-out]">
                            {banner.subtitle}
                        </p>
                        
                        <div className="mt-8 animate-[fadeIn_0.9s_ease-out]">
                           <button className="px-8 py-3.5 bg-white text-ink font-bold rounded-full w-fit hover:bg-cherry hover:text-white transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(255,46,136,0.4)] active:scale-95 flex items-center gap-2 group/btn">
                              자세히 보기
                              <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                           </button>
                        </div>
                    </div>
                </div>
              );
            })}

            {/* Controls */}
            <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-ink hover:scale-110 active:scale-95"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-ink hover:scale-110 active:scale-95"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-8 md:left-16 z-20 flex gap-2">
                {BANNERS.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'w-8 bg-cherry' : 'w-2 bg-white/40 hover:bg-white'}`}
                    />
                ))}
            </div>
        </div>

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
    </div>
  );
};