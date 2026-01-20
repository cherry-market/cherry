import React from 'react';
import { Settings, User, FileText, ShoppingBag, MapPin, Grid, Cherry } from 'lucide-react';

export const MyPage: React.FC = () => {
    return (
        <div className="pb-24 pt-4 bg-white min-h-screen">
            <header className="px-5 flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-cherry">마이페이지</h1>
                <Settings size={24} className="text-ink" />
            </header>

            <div className="px-5 mb-8">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
                        <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80" alt="profile" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/5"></div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-black text-ink">체리체리대장</h2>
                        <span className="text-sm text-gray-400 font-medium">#1234567</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                        프로필 보기
                    </button>
                </div>

                {/* Manner Score */}
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-ink">매너온도</span>
                        <span className="text-xl font-bold text-cherry">99.9°C</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-cherry w-full" />
                    </div>
                </div>

                {/* Grid Menu */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <MenuIcon icon={ShoppingBag} label="판매내역" />
                    <MenuIcon icon={FileText} label="구매내역" />
                    <MenuIcon icon={Cherry} label="픽 목록" />
                </div>
            </div>

            <div className="h-2 bg-gray-50 border-y border-gray-100"></div>

            {/* List Menu */}
            <div className="py-2">
                <MenuItem label="동네생활" icon={Grid} />
                <MenuItem label="동네인증하기" icon={MapPin} />
                <MenuItem label="키워드 알림" icon={BellIcon} />
                <div className="h-px bg-gray-50 my-2 mx-5"></div>
                <MenuItem label="친구초대" icon={User} />
                <MenuItem label="자주 묻는 질문" icon={FileText} />
            </div>
        </div>
    );
};

const MenuIcon = ({ icon: Icon, label }: any) => (
    <button className="flex flex-col items-center gap-2 p-2 rounded-xl active:bg-gray-50">
        <div className="w-12 h-12 rounded-full bg-cherry/5 text-cherry flex items-center justify-center">
            <Icon size={24} />
        </div>
        <span className="text-sm font-medium text-ink">{label}</span>
    </button>
);

const MenuItem = ({ label, icon: Icon }: any) => (
    <button className="flex items-center gap-3 w-full px-5 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors">
        <Icon size={22} className="text-gray-400" />
        <span className="text-[16px] font-medium text-ink">{label}</span>
    </button>
);

const BellIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
);
