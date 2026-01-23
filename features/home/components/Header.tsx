import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bell, Menu, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import type { Category } from '@/shared/services/categoryApi';

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
  isScrolled: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  activeCategory: string | 'ALL';
  categories: Category[];
  onCategoryChange: (categoryCode: string | 'ALL') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onFilterClick,
  isScrolled,
  showBackButton,
  onBack,
  activeCategory,
  categories,
  onCategoryChange
}) => {
  const [query, setQuery] = useState('');

  // Only update local state, do not trigger search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Trigger search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return; // Prevent double trigger on IME
      onSearch(query);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleBack = () => {
    setQuery('');
    onBack?.();
  };

  // Trigger search on icon click
  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="bg-white">

      {/* MAIN HEADER (Scrolls away) */}
      <div className="px-4 py-3 w-full">
        <div className="flex flex-col gap-3">

          {/* Row 1: Logo + Actions */}
          <div className="flex items-center justify-between w-full">
            {/* Logo or Back Button */}
            {showBackButton ? (
              <Button variant="icon" onClick={handleBack} className="-ml-2">
                <ArrowLeft size={24} className="text-ink" />
              </Button>
            ) : (
              <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.location.reload()}>
                <span className="font-black text-2xl tracking-tighter text-cherry">CHERRY</span>
              </div>
            )}

            {/* Actions (Filter + Notification) */}
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="icon"
                className="w-10 h-10 border-none bg-transparent hover:bg-gray-50 shadow-none text-ink p-2"
              >
                <Bell size={24} />
              </Button>
            </div>
          </div>

          {/* Row 2: Search Input */}
          <div className="w-full relative group flex items-center gap-2">
            <div className="relative flex-1">
              <button
                onClick={handleSearchClick}
                className="absolute inset-y-0 left-0 pl-4 flex items-center text-silver-dark active:scale-95 transition-transform"
              >
                <Search size={20} className="group-focus-within:text-cherry transition-colors" />
              </button>

              <input
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="검색 (예: 아이브 포카)"
                className="w-full h-12 pl-12 pr-4 rounded-[16px] bg-silver-light/50 border border-transparent focus:bg-white focus:border-cherry focus:ring-4 focus:ring-cherry/5 outline-none transition-all text-sm font-bold text-ink placeholder:text-silver-dark/80 shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>

      {/* GNB (Global Navigation Bar) - Hide when searching. STICKY. */}
      {!showBackButton && (
        <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
          <div className="w-full px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 h-12 text-sm font-bold whitespace-nowrap">
              {[{ code: 'ALL', displayName: '전체' } as const, ...categories].map((cat) => (
                <button
                  key={cat.code}
                  onClick={() => onCategoryChange(cat.code)}
                  className={`
                              relative h-full flex items-center transition-colors
                              ${activeCategory === cat.code ? 'text-cherry' : 'text-coolGray hover:text-ink'}
                          `}
                >
                  {cat.displayName}
                  {activeCategory === cat.code && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-cherry rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
