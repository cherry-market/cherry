import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, ShoppingBag, MapPin, Grid, Cherry, LogOut } from 'lucide-react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Avatar } from '@/shared/ui/Avatar';
import { useAuthStore } from '@/features/auth/model/authStore';
import { ROUTES } from '@/shared/constants/routes';
import { LoginPrompt } from '@/shared/ui/LoginPrompt';

export const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout, isLoggedIn } = useAuthStore();

    if (!isLoggedIn || !user) {
        return (
            <div className="bg-white min-h-screen">
                <PageHeader title="마이페이지" />
                <LoginPrompt
                    title="로그인이 필요한 서비스입니다"
                    description="가입하고 체리마켓의 이웃이 되어보세요."
                    icon={<User size={48} className="text-gray-300" />}
                />
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate(ROUTES.ROOT);
    };

    return (
        <div className="pb-24 bg-white min-h-screen">
            <PageHeader title="마이페이지" />

            <div className="px-5 mb-8 pt-4">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Avatar
                        src={user.profileImage || "https://dummyimage.com/150x150/f3f4f6/9ca3af&text=User"}
                        alt="profile"
                        size="lg"
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-black text-ink">{user.nickname}</h2>
                        <span className="text-sm text-gray-400 font-medium">#{user.id}</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                        프로필 보기
                    </button>
                </div>

                {/* Manner Score */}
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-ink">매너온도</span>
                        <span className="text-xl font-bold text-cherry">36.5℃</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-cherry w-[36%]" />
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
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-5 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-red-500"
                >
                    <LogOut size={22} />
                    <span className="text-[16px] font-medium">로그아웃</span>
                </button>
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
