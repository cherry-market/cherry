import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../model/authStore';
import { ROUTES } from '@/shared/constants/routes';
import * as authApi from '@/shared/services/authApi';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuthStore();
    const fromTab = location.state?.fromTab;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) return;

        setLoading(true);
        setError('');

        try {
            // 1. 백엔드 로그인 API 호출
            const tokenResponse = await authApi.login({ email, password });

            // 2. 토큰으로 사용자 정보 조회
            const userResponse = await authApi.getMe(tokenResponse.accessToken);

            // 3. 로그인 상태 업데이트
            login({
                id: userResponse.id,
                email: userResponse.email,
                nickname: userResponse.nickname,
                profileImage: userResponse.profileImageUrl || undefined
            }, tokenResponse.accessToken);

            // 4. 페이지 이동
            if (fromTab) {
                navigate(ROUTES.ROOT, { state: { activeTab: fromTab } });
            } else {
                navigate(-1);
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError(err instanceof Error ? err.message : '로그인에 실패했습니다');
        } finally {
            setLoading(false);
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
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    
                    <Input
                        placeholder="이메일"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        className="h-12"
                    />
                    <Input
                        placeholder="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        className="h-12"
                    />

                    <Button
                        fullWidth
                        onClick={handleLogin}
                        disabled={!email || !password || loading}
                    >
                        {loading ? '로그인 중...' : '로그인'}
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

                {/* Social Login - UI만 구현, 백엔드 연동은 추후 */}
                <div className="w-full mt-10 space-y-3">
                    <Button
                        variant="social"
                        fullWidth
                        onClick={() => alert('Google 로그인은 백엔드 구현 후 연동 예정입니다')}
                        className="flex gap-2"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Google로 로그인
                    </Button>
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
