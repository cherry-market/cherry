import React from 'react';
import { Home, LayoutGrid, Heart, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-xl border-t border-gray-100 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] pointer-events-auto border-x border-gray-100">
            <div className="flex justify-between items-center px-6 h-16">
                <NavButton 
                icon={LayoutGrid} 
                label="카테고리" 
                isActive={activeTab === 'CATEGORY'} 
                onClick={() => onTabChange('CATEGORY')} 
                />
                <NavButton 
                icon={Home} 
                label="홈" 
                isActive={activeTab === 'HOME'} 
                onClick={() => onTabChange('HOME')} 
                />
                <NavButton 
                icon={Heart} 
                label="찜" 
                isActive={activeTab === 'LIKES'} 
                onClick={() => onTabChange('LIKES')} 
                />
                <NavButton 
                icon={User} 
                label="마이" 
                isActive={activeTab === 'MY'} 
                onClick={() => onTabChange('MY')} 
                />
            </div>
        </div>
    </div>
  );
};

const NavButton = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-14 h-full active:scale-90 transition-all duration-200 ${isActive ? 'text-cherry' : 'text-silver-metal hover:text-ink'}`}
  >
    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-sm' : ''} />
    <span className="text-[10px] font-bold tracking-tight">{label}</span>
  </button>
);