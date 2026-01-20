import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Loader2, SlidersHorizontal } from 'lucide-react';
import { Product, FilterState } from '../types';
import { Header } from './Header';
import { ProductCard } from './ProductCard';
import { ProductRow } from './ProductRow';
import { TrendingSection } from './TrendingSection';
import { ProductWriteButton } from './ProductWriteButton';
import { ChatList } from './ChatList';
import { WishList } from './WishList';
import { MyPage } from './MyPage';
import { FilterSheet } from './FilterSheet';
import { BannerCarousel } from './BannerCarousel';
import { BottomNavigation } from './BottomNavigation';

const ITEMS_PER_PAGE = 10;

interface HomeProps {
    allProducts: Product[];
    onNewProduct: () => void;
}

export const Home: React.FC<HomeProps> = ({ allProducts, onNewProduct }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Navigation State
    const [activeTab, setActiveTab] = useState((location.state as any)?.activeTab || 'HOME');

    // Data State
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // UI State
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Filter State (Sync with URL)
    const searchQuery = searchParams.get('q') || '';
    const currentFilter: FilterState = {
        status: (searchParams.get('status') as any) || 'ALL',
        category: (searchParams.get('category') as any) || 'ALL',
        tradeType: (searchParams.get('tradeType') as any) || 'ALL',
        minPrice: Number(searchParams.get('minPrice')) || 0,
        maxPrice: Number(searchParams.get('maxPrice')) || 0,
        sortBy: (searchParams.get('sortBy') as any) || 'LATEST',
    };

    const updateFilter = (newFilter: FilterState) => {
        const params: Record<string, string> = {};
        if (searchQuery) params.q = searchQuery;
        if (newFilter.status !== 'ALL') params.status = newFilter.status;
        if (newFilter.category !== 'ALL') params.category = newFilter.category;
        if (newFilter.tradeType !== 'ALL') params.tradeType = newFilter.tradeType;
        if (newFilter.minPrice > 0) params.minPrice = newFilter.minPrice.toString();
        if (newFilter.maxPrice > 0) params.maxPrice = newFilter.maxPrice.toString();
        if (newFilter.sortBy !== 'LATEST') params.sortBy = newFilter.sortBy;

        setSearchParams(params);
    };

    const handleSearch = (q: string) => {
        const params = new URLSearchParams(searchParams);
        if (q) params.set('q', q);
        else params.delete('q');
        setSearchParams(params);
    };

    // Initial Load & Filter Logic
    useEffect(() => {
        // Reset visible products when filter changes
        window.scrollTo(0, 0);

        let result = [...allProducts];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q)) ||
                (p.artist && p.artist.toLowerCase().includes(q))
            );
        }

        // Filter
        if (currentFilter.status !== 'ALL') result = result.filter(p => p.status === currentFilter.status);
        if (currentFilter.category !== 'ALL') result = result.filter(p => p.category === currentFilter.category);
        if (currentFilter.tradeType !== 'ALL') result = result.filter(p => p.tradeType === currentFilter.tradeType);
        if (currentFilter.minPrice > 0) result = result.filter(p => p.price >= currentFilter.minPrice);
        if (currentFilter.maxPrice > 0) result = result.filter(p => p.price <= currentFilter.maxPrice);

        // Sort
        if (currentFilter.sortBy === 'LOW_PRICE') result.sort((a, b) => a.price - b.price);
        else if (currentFilter.sortBy === 'HIGH_PRICE') result.sort((a, b) => b.price - a.price);
        else if (currentFilter.sortBy === 'POPULAR') {
            result.sort((a, b) => b.likes - a.likes);
        }

        const firstBatch = result.slice(0, ITEMS_PER_PAGE);
        setVisibleProducts(firstBatch);
        setHasMore(result.length > ITEMS_PER_PAGE);
    }, [allProducts, searchQuery, JSON.stringify(currentFilter)]);

    // Scroll Detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Infinite Scroll
    const loadMoreProducts = useCallback(() => {
        if (isLoadingMore || !hasMore) return;
        setIsLoadingMore(true);

        setTimeout(() => {
            setVisibleProducts(prev => {
                const currentLength = prev.length;
                // Re-run filter logic to find next batch (Inefficient but robust for Mock)
                let result = [...allProducts];

                if (searchQuery) {
                    const q = searchQuery.toLowerCase();
                    result = result.filter(p =>
                        p.title.toLowerCase().includes(q) ||
                        p.tags.some(t => t.toLowerCase().includes(q)) ||
                        (p.artist && p.artist.toLowerCase().includes(q))
                    );
                }
                if (currentFilter.status !== 'ALL') result = result.filter(p => p.status === currentFilter.status);
                if (currentFilter.category !== 'ALL') result = result.filter(p => p.category === currentFilter.category);
                if (currentFilter.tradeType !== 'ALL') result = result.filter(p => p.tradeType === currentFilter.tradeType);
                if (currentFilter.minPrice > 0) result = result.filter(p => p.price >= currentFilter.minPrice);
                if (currentFilter.maxPrice > 0) result = result.filter(p => p.price <= currentFilter.maxPrice);

                if (currentFilter.sortBy === 'LOW_PRICE') result.sort((a, b) => a.price - b.price);
                else if (currentFilter.sortBy === 'HIGH_PRICE') result.sort((a, b) => b.price - a.price);
                else if (currentFilter.sortBy === 'POPULAR') result.sort((a, b) => b.likes - a.likes);

                const nextBatch = result.slice(currentLength, currentLength + ITEMS_PER_PAGE);
                if (currentLength + nextBatch.length >= result.length) setHasMore(false);
                return [...prev, ...nextBatch];
            });
            setIsLoadingMore(false);
        }, 800);
    }, [isLoadingMore, hasMore, allProducts, searchQuery, JSON.stringify(currentFilter)]);

    // Scroll ending listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300) {
                if (!isLoadingMore && hasMore) {
                    loadMoreProducts();
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreProducts, isLoadingMore, hasMore]);


    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === 'HOME') {
            window.scrollTo(0, 0);
            setSearchParams({}); // Reset filters
        }
    };

    return (
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative pb-20 border-x border-gray-100">
            {activeTab === 'HOME' && (
                <>
                    <Header
                        onSearch={handleSearch}
                        onFilterClick={() => setIsFilterOpen(true)}
                        isScrolled={isScrolled}
                        showBackButton={!!searchQuery}
                        onBack={() => handleSearch('')}
                    />

                    {!searchQuery && <BannerCarousel />}

                    {!searchQuery && (
                        <TrendingSection
                            products={allProducts.slice(0, 8)} // Mock trending data
                            onProductClick={(p) => navigate(`/product/${p.id}`)}
                        />
                    )}

                    <div className="px-4 py-2">
                        {/* Normal List Section Title */}
                        <div className="mb-3 mt-2 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-ink">체리픽</h3>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="p-2 -mr-2 text-coolGray hover:text-cherry active:scale-95 transition-all"
                            >
                                <SlidersHorizontal size={20} />
                            </button>
                        </div>

                        {visibleProducts.length > 0 ? (
                            <div className="flex flex-col">
                                {visibleProducts.map(product => (
                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        onClick={(p) => navigate(`/product/${p.id}`)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Sparkles size={32} className="text-gray-300" />
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
                    </div>

                    <ProductWriteButton />
                </>
            )}

            {activeTab === 'CHAT' && <ChatList />}
            {activeTab === 'LIKES' && <WishList products={allProducts} />}
            {activeTab === 'MY' && <MyPage />}

            <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === 'HOME' && (
                <FilterSheet
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    currentFilter={currentFilter}
                    onApply={updateFilter}
                />
            )}
        </div>
    );
};
