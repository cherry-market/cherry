import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useAuthStore } from '@/features/auth/model/authStore';
import { ROUTES } from '@/shared/constants/routes';

export const useProductLike = (product: Product) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    const [isLiked, setIsLiked] = useState(false);
    const [loginAlertOpen, setLoginAlertOpen] = useState(false);

    const toggleLike = (e: React.MouseEvent) => {
        // Stop bubbling
        e.stopPropagation();
        e.preventDefault();

        // Auth Check
        if (!isLoggedIn) {
            setLoginAlertOpen(true);
            return;
        }

        setIsLiked((prev) => !prev);
    };

    const closeLoginAlert = () => {
        setLoginAlertOpen(false);
    };

    const confirmLogin = () => {
        setLoginAlertOpen(false); // Close dialog first (optional but clean)
        navigate(ROUTES.LOGIN);
    };

    return {
        isLiked,
        toggleLike,
        likesCount: product.likes + (isLiked ? 1 : 0),
        loginAlertOpen,
        closeLoginAlert,
        confirmLogin
    };
};
