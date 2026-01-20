import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from './Button';
import { Cherry } from 'lucide-react';

interface LoginPromptProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({
    title = "로그인이 필요한 서비스입니다",
    description = "로그인하고 체리의 모든 기능을 이용해보세요.",
    icon
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-6 text-center animate-[fadeIn_0.3s_ease-out]">
            <div className="mb-6 p-6 bg-gray-50 rounded-full">
                {icon || <Cherry size={48} className="text-gray-300" />}
            </div>

            <h3 className="text-xl font-bold text-ink mb-2">
                {title}
            </h3>

            <p className="text-gray-500 text-sm mb-8 leading-relaxed whitespace-pre-line">
                {description}
            </p>

            <Button
                onClick={() => navigate(ROUTES.LOGIN)}
                variant="primary"
                fullWidth
                size="lg"
            >
                로그인
            </Button>
        </div>
    );
};
