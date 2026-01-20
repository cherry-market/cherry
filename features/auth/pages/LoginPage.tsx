import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../model/authStore';
import { ROUTES } from '@/shared/constants/routes';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuthStore();
    const fromTab = location.state?.fromTab;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSuccess = () => {
        // Mock login logic
        login({
            id: 'mock-user-1',
            email: email || 'user@cherry.com',
            nickname: '체리러버',
            profileImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80'
        });

        if (fromTab) {
            navigate(ROUTES.ROOT, { state: { activeTab: fromTab } });
        } else {
            navigate(-1);
        }
    };

    const handleGoogleLogin = () => {
        // Mock Google login
        login({
            id: 'google-user-1',
            email: 'google@cherry.com',
            nickname: '구글체리',
            profileImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80'
        });

        if (fromTab) {
            navigate(ROUTES.ROOT, { state: { activeTab: fromTab } });
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative border-x border-gray-100 flex flex-col">
            {/* Header */}
            <div className="h-14 flex items-center px-4">
                <button
                    onClick={() => navigate(ROUTES.ROOT)}
                    className="p-2 -ml-2 text-ink hover:bg-gray-50 rounded-full"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center px-6 pt-4 pb-10">
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-10 mt-6">
                    <span className="text-4xl font-black tracking-tighter text-cherry mb-2">CHERRY</span>
                    <p className="text-gray-400 text-sm font-medium">체리, 덕질의 가치를 나누다</p>
                </div>

                {/* Login Form */}
                <div className="w-full space-y-3">
                    <Input
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12"
                    />
                    <Input
                        placeholder="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12"
                    />

                    <Button
                        fullWidth
                        onClick={handleLoginSuccess}
                        disabled={!email || !password}
                    >
                        로그인
                    </Button>

                    <div className="flex justify-between items-center text-xs text-gray-500 mt-3 px-1">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                            <span>자동 로그인</span>
                        </label>
                        <div className="flex gap-3">
                            <span className="cursor-pointer hover:text-black">아이디 찾기</span>
                            <span className="w-px h-3 bg-gray-300"></span>
                            <span className="cursor-pointer hover:text-black">비밀번호 찾기</span>
                        </div>
                    </div>
                </div>

                {/* Social Login */}
                <div className="w-full mt-10 space-y-3">
                    <Button
                        variant="social"
                        fullWidth
                        onClick={handleGoogleLogin}
                        className="flex gap-2"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Google로 로그인
                    </Button>
                    {/* Placeholder for Kakao/Apple if needed in future to match visual density of Musinsa
                    <button className="w-full h-12 bg-[#FEE500] rounded-[6px] flex items-center justify-center gap-2 text-[#000000] font-medium text-sm">
                        <MessageCircle size={18} fill="currentColor" /> 카카오로 시작하기
                    </button> 
                    */}
                </div>

                {/* Bottom Signup Area */}
                <div className="mt-auto w-full pt-10 flex flex-col items-center">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => navigate(ROUTES.SIGNUP, { state: { fromTab } })}
                    >
                        이메일 회원가입
                    </Button>
                </div>
            </div>
        </div>
    );
};
