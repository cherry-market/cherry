import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Camera, ChevronLeft } from 'lucide-react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Avatar } from '@/shared/ui/Avatar';
import { useAuthStore } from '../model/authStore';
import { ROUTES } from '@/shared/constants/routes';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = () => {
        // Mock upload
        setProfileImage('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80');
    };

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = EMAIL_REGEX.test(formData.email);
    const isPasswordMatch = formData.password === formData.passwordConfirm && formData.password.length > 0;

    const isValid =
        isEmailValid &&
        formData.password.length >= 6 &&
        isPasswordMatch &&
        formData.nickname.length > 0;

    const handleSubmit = () => {
        if (!isValid) return;

        // Simulate API Call
        setTimeout(() => {
            // Auto login after signup
            login({
                id: formData.email.split('@')[0], // Use email prefix as ID for now
                email: formData.email,
                nickname: formData.nickname,
                profileImage: profileImage || undefined
            });
            alert('회원가입을 환영합니다! 🍒');

            if (fromTab) {
                navigate(ROUTES.ROOT, { state: { activeTab: fromTab } });
            } else {
                navigate(ROUTES.ROOT);
            }
        }, 500);
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
                    <Input
                        label="이메일"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@cherry.com"
                        error={formData.email.length > 0 && !isEmailValid ? "올바른 이메일 형식이 아니에요" : undefined}
                    />

                    <Input
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="6자 이상 입력해주세요"
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
                    />
                </div>

                {/* Submit */}
                <div className="mt-4">
                    <Button
                        variant="primary"
                        fullWidth
                        size="lg"
                        disabled={!isValid}
                        onClick={handleSubmit}
                    >
                        가입 완료
                    </Button>
                </div>
            </div>
        </div>
    );
};
