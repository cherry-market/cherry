import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import type { FilterState } from '@/features/product/types';
import { useProducts } from '@/features/product/hooks/useProducts';
import { useCategories } from '@/features/category/hooks/useCategories';
import { Header } from '../components/Header';
import { ProductList } from '@/features/product/components/ProductList';
import { TrendingSection } from '../components/TrendingSection';
import { ProductWriteButton } from '../components/ProductWriteButton';
import { ChatList } from '@/features/chat/components/ChatList';
import { MyPickPage } from '@/features/wish/ui/MyPickPage';
import { MyPage } from '@/features/mypage/pages/MyPage';
import { FilterSheet } from '@/features/product/components/FilterSheet';
import { BannerCarousel } from '../components/BannerCarousel';
import { BottomNavigation } from '@/shared/ui/BottomNavigation';
import { MAIN_TABS } from '@/shared/constants/navigation';
import { ROUTES } from '@/shared/constants/routes';
import {
    HOME_INFINITE_SCROLL_OFFSET_PX,
    HOME_SCROLL_TOP_THRESHOLD_PX,
} from '../constants';



export const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Navigation State
    const [activeTab, setActiveTab] = useState((location.state as any)?.activeTab || MAIN_TABS.HOME);

    // Data State - Custom Hook으로 추출
    const { categories } = useCategories();

    // UI State
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Filter State (Sync with URL)
    const searchQuery = searchParams.get('q') || '';
    const currentFilter: FilterState = {
        status: (searchParams.get('status') as any) || 'ALL',
        categoryCode: (searchParams.get('categoryCode') as any) || 'ALL',
        tradeType: (searchParams.get('tradeType') as any) || 'ALL',
        minPrice: Number(searchParams.get('minPrice')) || 0,
        maxPrice: Number(searchParams.get('maxPrice')) || 0,
        sortBy: (searchParams.get('sortBy') as any) || 'LATEST',
    };

    const {
        products: allProducts,
        isLoading,
        isLoadingMore,
        error: apiError,
        hasMore,
        loadMore,
    } = useProducts(currentFilter);

    const updateFilter = (newFilter: FilterState) => {
        const params: Record<string, string> = {};
        if (searchQuery) params.q = searchQuery;
        if (newFilter.status !== 'ALL') params.status = newFilter.status;
        if (newFilter.categoryCode !== 'ALL') params.categoryCode = newFilter.categoryCode;
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

    // Scroll Detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > HOME_SCROLL_TOP_THRESHOLD_PX);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Infinite Scroll - Custom Hook 사용
    const loadMoreProducts = useCallback(() => {
        loadMore();
    }, [loadMore]);

    // Scroll ending listener
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - HOME_INFINITE_SCROLL_OFFSET_PX
            ) {
                if (!isLoadingMore && hasMore) {
                    loadMoreProducts();
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreProducts, isLoadingMore, hasMore]);

    // 클라이언트 사이드 필터링 (백엔드 필터링 미지원 시 임시)
    const filteredProducts = allProducts.filter(p => {
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const matchesSearch = p.title.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q)) ||
                (p.artist && p.artist.toLowerCase().includes(q));
            if (!matchesSearch) return false;
        }
        return true;
    });

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === MAIN_TABS.HOME) {
            window.scrollTo(0, 0);
            setSearchParams({}); // Reset filters
        }
    };

    if (apiError) {
        return (
            <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl flex flex-col items-center justify-center px-4">
                <p className="text-coolGray text-center mb-4">{apiError}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-cherry text-white rounded-lg"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    const isInitialLoading = isLoading && allProducts.length === 0;

    return (
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative pb-20 border-x border-gray-100">
            {isInitialLoading && (
                <div className="absolute inset-0 bg-white z-50 flex items-center justify-center">
                    <Loader2 size={48} className="animate-spin text-cherry" />
                </div>
            )}
            {activeTab === MAIN_TABS.HOME && (
                <>
                    <Header
                        onSearch={handleSearch}
                        onFilterClick={() => setIsFilterOpen(true)}
                        isScrolled={isScrolled}
                        showBackButton={!!searchQuery}
                        onBack={() => handleSearch('')}
                        activeCategory={currentFilter.categoryCode}
                        categories={categories}
                        onCategoryChange={(code) => updateFilter({ ...currentFilter, categoryCode: code })}
                    />

                    {!searchQuery && <BannerCarousel />}

                    {!searchQuery && (
                        <TrendingSection
                            onProductClick={(p) => navigate(ROUTES.PRODUCT_DETAIL(p.id))}
                        />
                    )}

                    <div className="px-4 py-2">
                        <div className="mb-3 mt-2 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-ink">체리픽</h3>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="p-2 -mr-2 text-coolGray hover:text-cherry active:scale-95 transition-all"
                            >
                                <SlidersHorizontal size={20} />
                            </button>
                        </div>

                        {!isInitialLoading && (
                            <ProductList
                                products={filteredProducts}
                                onItemClick={(p) => navigate(ROUTES.PRODUCT_DETAIL(p.id))}
                                emptyMessage="검색 결과가 없어요"
                            />
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

            {activeTab === MAIN_TABS.CHAT && <ChatList />}
            {activeTab === MAIN_TABS.LIKES && <MyPickPage />}
            {activeTab === MAIN_TABS.MY && <MyPage />}

            <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === MAIN_TABS.HOME && (
                <FilterSheet
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    currentFilter={currentFilter}
                    onApply={updateFilter}
                    categories={categories}
                />
            )}
        </div>
    );
};
