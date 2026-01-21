import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Loader2, SlidersHorizontal } from 'lucide-react';
import type { FilterState, Product } from '@/features/product/types';
import { productApi, ProductSummary } from '@/shared/services/productApi';
import { useAuthStore } from '@/features/auth/model/authStore';
import { Header } from '../components/Header';
import { ProductList } from '@/features/product/components/ProductList';
import { TrendingSection } from '../components/TrendingSection';
import { ProductWriteButton } from '../components/ProductWriteButton';
import { ChatList } from '@/features/chat/components/ChatList';
import { WishList } from '@/features/wishlist/pages/WishList';
import { MyPage } from '@/features/mypage/pages/MyPage';
import { FilterSheet } from '@/features/product/components/FilterSheet';
import { BannerCarousel } from '../components/BannerCarousel';
import { BottomNavigation } from '@/shared/ui/BottomNavigation';
import { MAIN_TABS } from '@/shared/constants/navigation';
import { ROUTES } from '@/shared/constants/routes';
import {
    HOME_INFINITE_SCROLL_OFFSET_PX,
    HOME_LOAD_MORE_DELAY_MS,
    HOME_SCROLL_TOP_THRESHOLD_PX,
} from '../constants';

// Utility: Backend product to Frontend product mapper
const mapToFrontendProduct = (backendProduct: ProductSummary): Product => {
    return {
        id: backendProduct.id, // Backend: number, Frontend: number
        title: backendProduct.title,
        price: backendProduct.price,
        image: backendProduct.thumbnailUrl,
        category: '미분류', // 백엔드에서 제공 안함 (TODO: 추후 확장)
        status: backendProduct.status,
        likes: 0, // 백엔드에서 제공 안함 (TODO: 추후 확장)
        uploadedTime: new Date(backendProduct.createdAt).toLocaleString('ko-KR'), // createdAt을 문자열로 변환
        seller: {
            name: '판매자', // 백엔드에서 목록에 제공 안함
            avatar: 'https://via.placeholder.com/50',
            temperature: 36.5,
        },
        tags: [], // 백엔드에서 제공 안함
        description: '',
        images: [backendProduct.thumbnailUrl],
        artist: undefined,
        tradeType: backendProduct.tradeType === 'BOTH' ? 'ALL' : backendProduct.tradeType, // BOTH -> ALL 매핑
    };
};

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Navigation State
    const [activeTab, setActiveTab] = useState((location.state as any)?.activeTab || MAIN_TABS.HOME);

    // Data State - 백엔드 API 연동
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

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

    // Initial Load - 백엔드 API 호출
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            setApiError(null);
            try {
                const response = await productApi.getProducts(undefined, 20);
                const mappedProducts = response.items.map(mapToFrontendProduct);
                setAllProducts(mappedProducts);
                setCursor(response.nextCursor);
                setHasMore(response.nextCursor !== null);
            } catch (error) {
                console.error('Failed to load products:', error);
                setApiError('상품 목록을 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []); // 최초 로드만 실행

    // Scroll Detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > HOME_SCROLL_TOP_THRESHOLD_PX);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Infinite Scroll - 백엔드 cursor 기반
    const loadMoreProducts = useCallback(async () => {
        if (isLoadingMore || !hasMore || !cursor) return;
        setIsLoadingMore(true);

        try {
            const response = await productApi.getProducts(cursor, 20);
            const mappedProducts = response.items.map(mapToFrontendProduct);
            setAllProducts(prev => [...prev, ...mappedProducts]);
            setCursor(response.nextCursor);
            setHasMore(response.nextCursor !== null);
        } catch (error) {
            console.error('Failed to load more products:', error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [cursor, isLoadingMore, hasMore]);

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
        if (currentFilter.status !== 'ALL' && p.status !== currentFilter.status) return false;
        if (currentFilter.category !== 'ALL' && p.category !== currentFilter.category) return false;
        if (currentFilter.tradeType !== 'ALL' && p.tradeType !== currentFilter.tradeType) return false;
        if (currentFilter.minPrice > 0 && p.price < currentFilter.minPrice) return false;
        if (currentFilter.maxPrice > 0 && p.price > currentFilter.maxPrice) return false;
        return true;
    });

    const { isLoggedIn } = useAuthStore();

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === MAIN_TABS.HOME) {
            window.scrollTo(0, 0);
            setSearchParams({}); // Reset filters
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl flex items-center justify-center">
                <Loader2 size={48} className="animate-spin text-cherry" />
            </div>
        );
    }

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

    return (
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative pb-20 border-x border-gray-100">
            {activeTab === MAIN_TABS.HOME && (
                <>
                    <Header
                        onSearch={handleSearch}
                        onFilterClick={() => setIsFilterOpen(true)}
                        isScrolled={isScrolled}
                        showBackButton={!!searchQuery}
                        onBack={() => handleSearch('')}
                        activeCategory={currentFilter.category === 'ALL' ? '전체' : currentFilter.category}
                        onCategoryChange={(cat) => updateFilter({ ...currentFilter, category: cat === '전체' ? 'ALL' : cat })}
                    />

                    {!searchQuery && <BannerCarousel />}

                    {!searchQuery && (
                        <TrendingSection
                            products={allProducts.slice(0, 8)} // TODO: 백엔드 trending API 연동
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

                        <ProductList
                            products={filteredProducts}
                            onItemClick={(p) => navigate(ROUTES.PRODUCT_DETAIL(p.id))}
                            emptyMessage="검색 결과가 없어요"
                        />

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
            {activeTab === MAIN_TABS.LIKES && <WishList products={allProducts} />}
            {activeTab === MAIN_TABS.MY && <MyPage />}

            <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === MAIN_TABS.HOME && (
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
