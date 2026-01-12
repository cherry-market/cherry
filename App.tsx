import React, { useState, useEffect, useCallback } from 'react';
import { FilterState, Product } from './types';
import { MOCK_PRODUCTS } from './constants';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { FilterSheet } from './components/FilterSheet';
import { ProductDetail } from './components/ProductDetail';
import { ImageGeneratorSheet } from './components/ImageGenerator';
import { BannerCarousel } from './components/BannerCarousel';
import { BottomNavigation } from './components/BottomNavigation';
import { Sparkles, Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<'LIST' | 'DETAIL'>('LIST');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('HOME');

  // Data State
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // UI State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<FilterState>({
    status: 'ALL',
    category: 'ALL',
    minPrice: 0,
    maxPrice: 1000000,
    sortBy: 'LATEST'
  });

  // Initial Load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    const initialBatch = allProducts.slice(0, ITEMS_PER_PAGE);
    setVisibleProducts(initialBatch);
    setHasMore(allProducts.length > ITEMS_PER_PAGE);
  };

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let result = [...allProducts];

    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (currentFilter.status !== 'ALL') {
      result = result.filter(p => p.status === currentFilter.status);
    }
    if (currentFilter.category !== 'ALL') {
      result = result.filter(p => p.category === currentFilter.category);
    }

    if (currentFilter.sortBy === 'LOW_PRICE') {
      result.sort((a, b) => a.price - b.price);
    } else if (currentFilter.sortBy === 'POPULAR') {
      result.sort((a, b) => b.likes - a.likes);
    }

    const firstBatch = result.slice(0, ITEMS_PER_PAGE);
    setVisibleProducts(firstBatch);
    setHasMore(result.length > ITEMS_PER_PAGE);
  }, [allProducts, searchQuery, currentFilter]);

  // Infinite Scroll Handler
  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleProducts(prev => {
        const currentLength = prev.length;
        let result = [...allProducts];
        
        if (searchQuery) {
            result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
        }
        if (currentFilter.status !== 'ALL') result = result.filter(p => p.status === currentFilter.status);
        if (currentFilter.category !== 'ALL') result = result.filter(p => p.category === currentFilter.category);
        if (currentFilter.sortBy === 'LOW_PRICE') result.sort((a, b) => a.price - b.price);
        else if (currentFilter.sortBy === 'POPULAR') result.sort((a, b) => b.likes - a.likes);

        const nextBatch = result.slice(currentLength, currentLength + ITEMS_PER_PAGE);
        
        if (currentLength + nextBatch.length >= result.length) {
            setHasMore(false);
        }
        
        return [...prev, ...nextBatch];
      });
      setIsLoadingMore(false);
    }, 800);
  }, [isLoadingMore, hasMore, allProducts, searchQuery, currentFilter]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        if (!isLoadingMore && hasMore && view === 'LIST') {
          loadMoreProducts();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts, isLoadingMore, hasMore, view]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('LIST');
    setSelectedProduct(null);
  };

  const handleNewAIImage = (url: string) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: 'AI 가상 굿즈 컨셉',
      price: 0,
      image: url,
      category: '인형/굿즈',
      status: 'SELLING',
      likes: 0,
      uploadedTime: '방금 전',
      seller: { name: '체리 AI', avatar: '', temperature: 100 },
      tags: ['AI', 'Generated'],
      description: '체리 AI가 생성한 가상 굿즈 디자인입니다.',
      images: [url]
    };
    setAllProducts(prev => [newProduct, ...prev]);
    setVisibleProducts(prev => [newProduct, ...prev]);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'HOME') {
        window.scrollTo(0,0);
        setCurrentFilter(prev => ({ ...prev, status: 'ALL', category: 'ALL' }));
    }
  };

  if (view === 'DETAIL' && selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen pb-24 md:pb-10 relative">
      <Header 
        onSearch={setSearchQuery} 
        onFilterClick={() => setIsFilterOpen(true)}
        isScrolled={isScrolled}
      />

      {/* Promotional Banner Area (Only on List view) */}
      {!searchQuery && <BannerCarousel />}

      <main className="px-4 py-2 max-w-7xl mx-auto">
        {/* Welcome Text (Only if no search) */}
        {!searchQuery && (
          <div className="mb-6 mt-2">
             <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-6 bg-cherry rounded-full"></span>
                <h2 className="text-xl font-black text-ink tracking-tight">지금 뜨는 체리픽</h2>
             </div>
          </div>
        )}

        {/* Product Grid */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visibleProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={handleProductClick} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mb-4">
                <Sparkles size={32} className="text-cherry/50" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">검색 결과가 없어요</h3>
            <p className="text-sm text-gray-500 mt-1">다른 키워드나 필터로 다시 찾아보세요.</p>
          </div>
        )}

        {isLoadingMore && (
          <div className="py-8 flex justify-center w-full">
            <Loader2 size={24} className="animate-spin text-cherry" />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Floating Action Button - Positioned above Bottom Nav on Mobile */}
      <button 
        onClick={() => setIsAiSheetOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 bg-cherry text-white rounded-full shadow-[0_8px_30px_rgba(255,46,136,0.4)] flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-transform"
      >
        <Sparkles size={24} />
      </button>

      <FilterSheet 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        currentFilter={currentFilter}
        onApply={setCurrentFilter}
      />

      <ImageGeneratorSheet 
        isOpen={isAiSheetOpen}
        onClose={() => setIsAiSheetOpen(false)}
        onImageGenerated={handleNewAIImage}
      />
    </div>
  );
};

export default App;