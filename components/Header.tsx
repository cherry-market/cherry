import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bell, Menu } from 'lucide-react';
import { Button } from './Button';
import { CATEGORIES } from '../constants';

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
  isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onFilterClick, isScrolled }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('추천');

  // Only update local state, do not trigger search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Trigger search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
      (e.target as HTMLInputElement).blur();
    }
  };

  // Trigger search on icon click
  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-white'}`}>

      {/* MAIN HEADER */}
      <div className="px-4 py-3 w-full">
        <div className="flex flex-col gap-3">

          {/* Row 1: Logo + Notification */}
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.location.reload()}>
              <span className="font-black text-2xl tracking-tighter text-cherry">CHERRY-CI/CD TEST</span>
            </div>

            {/* Mobile Icons (Right) - Notification Only (No Cart) */}
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="icon"
                className="w-10 h-10 border-none bg-transparent hover:bg-gray-50 shadow-none text-ink p-2"
              >
                <Bell size={24} />
              </Button>
            </div>
          </div>

          {/* Row 2: Search + Filter Integrated */}
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
                className="w-full h-12 pl-12 pr-12 rounded-[16px] bg-silver-light/50 border border-transparent focus:bg-white focus:border-cherry focus:ring-4 focus:ring-cherry/5 outline-none transition-all text-sm font-bold text-ink placeholder:text-silver-dark/80 shadow-inner"
              />

              {/* Filter Trigger (Inside Search Bar) */}
              <button
                onClick={onFilterClick}
                className="absolute inset-y-0 right-1 pr-1 flex items-center"
              >
                <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-coolGray hover:text-cherry active:scale-90 transition-all">
                  <SlidersHorizontal size={18} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GNB (Global Navigation Bar) */}
      <div className="border-t border-gray-100">
        <div className="w-full px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 h-12 text-sm font-bold whitespace-nowrap">
            {/* Mobile Menu Icon */}
            <button className="text-ink mr-2">
              <Menu size={20} />
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`
                            relative h-full flex items-center transition-colors
                            ${activeTab === cat ? 'text-cherry' : 'text-coolGray hover:text-ink'}
                        `}
              >
                {cat}
                {activeTab === cat && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-cherry rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};