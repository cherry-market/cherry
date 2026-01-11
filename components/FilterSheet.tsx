import React, { useState } from 'react';
import { X, RefreshCw, Check } from 'lucide-react';
import { FilterState, ProductStatus } from '../types';
import { CATEGORIES } from '../constants';
import { Button } from './Button';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilter: FilterState;
  onApply: (filter: FilterState) => void;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({ isOpen, onClose, currentFilter, onApply }) => {
  const [localFilter, setLocalFilter] = useState<FilterState>(currentFilter);

  const handleStatusToggle = (status: ProductStatus | 'ALL') => {
    setLocalFilter(prev => ({ ...prev, status }));
  };

  const handleCategoryToggle = (category: string) => {
    setLocalFilter(prev => ({ ...prev, category }));
  };

  const handleReset = () => {
    setLocalFilter({
      status: 'ALL',
      category: 'ALL',
      minPrice: 0,
      maxPrice: 1000000,
      sortBy: 'LATEST'
    });
  };

  const handleApply = () => {
    onApply(localFilter);
    onClose();
  };

  const statusLabels: Record<string, string> = {
    'ALL': '전체',
    'SELLING': '판매중',
    'RESERVED': '예약중',
    'SOLD': '판매완료'
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl rounded-t-[32px] border-t border-white/50 shadow-2xl max-h-[85vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]">
        <div className="sticky top-0 bg-white/50 backdrop-blur-md z-10 px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-black tracking-tight">필터</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-500 active:scale-95 transition-transform">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Status Section */}
          <section>
            <h3 className="text-sm font-bold text-coolGray mb-3 uppercase tracking-wider">거래 상태</h3>
            <div className="flex flex-wrap gap-2">
              {(['ALL', 'SELLING', 'RESERVED', 'SOLD'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  className={`
                    px-4 py-2 rounded-[16px] text-sm font-bold transition-all active:scale-95 border
                    ${localFilter.status === status 
                      ? 'bg-cherry text-white border-cherry shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>
          </section>

          {/* Category Section */}
          <section>
            <h3 className="text-sm font-bold text-coolGray mb-3 uppercase tracking-wider">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryToggle('ALL')}
                 className={`
                    px-4 py-2 rounded-[16px] text-sm font-bold transition-all active:scale-95 border
                    ${localFilter.category === 'ALL'
                      ? 'bg-cherry text-white border-cherry shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                  `}
              >
                전체
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`
                    px-4 py-2 rounded-[16px] text-sm font-bold transition-all active:scale-95 border
                    ${localFilter.category === cat
                      ? 'bg-cherry text-white border-cherry shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Sort Section */}
          <section>
             <h3 className="text-sm font-bold text-coolGray mb-3 uppercase tracking-wider">정렬</h3>
             <div className="space-y-2">
                {[
                  { id: 'LATEST', label: '최신순' },
                  { id: 'POPULAR', label: '인기순' },
                  { id: 'LOW_PRICE', label: '낮은 가격순' }
                ].map(opt => (
                  <div 
                    key={opt.id}
                    onClick={() => setLocalFilter(prev => ({...prev, sortBy: opt.id as any}))}
                    className="flex items-center justify-between p-3 rounded-[18px] bg-white border border-gray-100 active:scale-98 transition-transform cursor-pointer"
                  >
                    <span className={`font-semibold ${localFilter.sortBy === opt.id ? 'text-cherry' : 'text-gray-700'}`}>
                      {opt.label}
                    </span>
                    {localFilter.sortBy === opt.id && <Check size={18} className="text-cherry" />}
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={handleReset}>
            <RefreshCw size={16} className="mr-2" />
            초기화
          </Button>
          <Button variant="primary" className="flex-[2]" onClick={handleApply}>
            결과 보기
          </Button>
        </div>
      </div>
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};