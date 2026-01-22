import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Camera, ChevronLeft } from 'lucide-react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Avatar } from '@/shared/ui/Avatar';
import { useAuthStore } from '../model/authStore';
import { ROUTES } from '@/shared/constants/routes';
import * as authApi from '@/shared/services/authApi';
import { isValidEmail, isValidPassword, isValidNickname } from '@/shared/utils/validation';

export const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuthStore();
    const fromTab = location.state?.fromTab;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: ''
    });

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = () => {
        // Mock upload
        setProfileImage('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80');
    };

    const emailValid = isValidEmail(formData.email);
    const passwordValid = isValidPassword(formData.password);
    const isPasswordMatch = formData.password === formData.passwordConfirm && formData.password.length > 0;
    const nicknameValid = isValidNickname(formData.nickname);

    const isValid =
        emailValid &&
        passwordValid &&
        isPasswordMatch &&
        nicknameValid;

    const handleSubmit = async () => {
        if (!isValid) return;

        setLoading(true);
        setError('');

        try {
            // 1. 회원가입 API 호출
            const userResponse = await authApi.signup({
                email: formData.email,
                password: formData.password,
                nickname: formData.nickname
            });

            // 2. 회원가입 후 자동 로그인
            const tokenResponse = await authApi.login({
                email: formData.email,
                password: formData.password
            });

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
                navigate(ROUTES.ROOT);
            }
        } catch (err) {
            console.error('Signup failed:', err);
            setError(err instanceof Error ? err.message : '회원가입에 실패했습니다');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative pb-20 border-x border-gray-100">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 h-14 flex items-center px-4 z-10">
                <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-ink">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-bold ml-2">회원가입</h1>
            </header>

            <div className="p-6 flex flex-col gap-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                    <div className="relative group cursor-pointer" onClick={handleImageUpload}>
                        <Avatar
                            src={profileImage || "https://dummyimage.com/150x150/f3f4f6/9ca3af&text=User"}
                            alt="Profile"
                            size="lg"
                            className="w-24 h-24 border-2 border-gray-100"
                        />
                        <div className="absolute bottom-0 right-0 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm text-cherry">
                            <Camera size={16} />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">프로필 사진 등록</p>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    
                    <Input
                        label="이메일"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@cherry.com"
                        error={formData.email.length > 0 && !emailValid ? "올바른 이메일 형식이 아니에요" : undefined}
                    />

                    <Input
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="8자 이상 입력해주세요"
                        error={formData.password.length > 0 && !passwordValid ? "8자 이상 입력해주세요" : undefined}
                    />

                    <Input
                        label="비밀번호 확인"
                        name="passwordConfirm"
                        type="password"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        placeholder="비밀번호를 한번 더 입력해주세요"
                        error={formData.passwordConfirm.length > 0 && !isPasswordMatch ? "비밀번호가 일치하지 않아요" : undefined}
                    />

                    <Input
                        label="닉네임"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="활동할 닉네임을 입력해주세요"
                        error={formData.nickname.length > 30 ? "닉네임은 30자 이하여야 해요" : undefined}
                    />
                </div>

                {/* Submit */}
                <div className="mt-4">
                    <Button
                        variant="primary"
                        fullWidth
                        size="lg"
                        disabled={!isValid || loading}
                        onClick={handleSubmit}
                    >
                        {loading ? '가입 중...' : '가입 완료'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
