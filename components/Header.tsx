import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bell, ShoppingBag, Heart, User, Menu } from 'lucide-react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-white'}`}>
      
      {/* 1. TOP UTILITY BAR (Desktop only) */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 border-b border-gray-100 bg-white text-xs font-medium text-coolGray max-w-7xl mx-auto w-full">
        <div className="flex gap-4">
            <span className="cursor-pointer hover:text-cherry">이벤트</span>
            <span className="cursor-pointer hover:text-cherry">공지사항</span>
        </div>
        <div className="flex gap-4 items-center">
            <span className="cursor-pointer hover:text-ink">로그인</span>
            <span className="cursor-pointer hover:text-ink">회원가입</span>
            <span className="cursor-pointer hover:text-ink">마이페이지</span>
            <span className="cursor-pointer hover:text-ink">장바구니</span>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="px-4 py-3 md:py-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-8">
            
            {/* Row 1 (Mobile): Logo + Icons */}
            <div className="flex items-center justify-between w-full md:w-auto">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.location.reload()}>
                    <span className="font-black text-2xl tracking-tighter text-cherry">CHERRY</span>
                </div>

                {/* Mobile Icons (Right) - Tightly grouped */}
                <div className="flex md:hidden items-center justify-end gap-2">
                    {/* Bell */}
                    <Button 
                        variant="icon" 
                        className="w-10 h-10 border-none bg-transparent hover:bg-gray-50 shadow-none text-ink p-2"
                    >
                         <Bell size={24} />
                    </Button>
                    {/* Cart */}
                    <Button 
                        variant="icon" 
                        className="w-10 h-10 border-none bg-transparent hover:bg-gray-50 shadow-none text-ink p-2"
                    >
                         <ShoppingBag size={24} />
                    </Button>
                </div>
            </div>

            {/* Row 2 (Mobile) / Center (Desktop): Search */}
            <div className="w-full md:flex-1 md:max-w-2xl relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={20} className="text-silver-dark group-focus-within:text-cherry transition-colors" />
              </div>
              <input 
                type="text" 
                value={query}
                onChange={handleChange}
                placeholder="상품을 검색해 보세요 (예: 아이브 포카)" 
                className="w-full h-12 pl-12 pr-4 rounded-[16px] bg-silver-light/50 border border-transparent focus:bg-white focus:border-cherry focus:ring-4 focus:ring-cherry/5 outline-none transition-all text-sm font-bold text-ink placeholder:text-silver-dark/80 shadow-inner"
              />
            </div>

            {/* Desktop Icons (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
                 <Button variant="ghost" className="p-2"><Heart size={22} /></Button>
                 <Button variant="ghost" className="p-2"><ShoppingBag size={22} /></Button>
                 <Button variant="ghost" className="p-2"><User size={22} /></Button>
            </div>
        </div>
      </div>

      {/* 3. GNB (Global Navigation Bar) */}
      <div className="border-t border-gray-100 md:border-none">
        <div className="max-w-7xl mx-auto w-full px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 md:gap-8 h-12 text-sm font-bold whitespace-nowrap">
                {/* Mobile Menu Icon */}
                <button className="md:hidden text-ink mr-2">
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
                
                {/* Filter Trigger (Desktop) positioned at end of nav */}
                <div className="ml-auto hidden md:block pl-8">
                     <button 
                        onClick={onFilterClick}
                        className="flex items-center gap-2 text-xs font-bold text-coolGray hover:text-cherry border border-gray-200 rounded-full px-3 py-1.5"
                     >
                        <SlidersHorizontal size={14} />
                        필터
                     </button>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};