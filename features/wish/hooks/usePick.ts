import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { wishApi } from '@/shared/services/wishApi';
import { useAuthStore } from '@/features/auth/model/authStore';

interface UsePickParams {
    productId: number;
    initialIsLiked?: boolean;
}

export const usePick = ({ productId, initialIsLiked = false }: UsePickParams) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isLoading, setIsLoading] = useState(false);
    const [loginAlertOpen, setLoginAlertOpen] = useState(false);

    useEffect(() => {
        setIsLiked(initialIsLiked);
    }, [initialIsLiked, productId]);

    const closeLoginAlert = useCallback(() => {
        setLoginAlertOpen(false);
    }, []);

    const confirmLogin = useCallback(() => {
        setLoginAlertOpen(false);
        navigate(ROUTES.LOGIN);
    }, [navigate]);

    const togglePick = useCallback(async () => {
        if (isLoading) {
            return;
        }
        if (!isLoggedIn) {
            setLoginAlertOpen(true);
            return;
        }

        const nextLiked = !isLiked;
        setIsLiked(nextLiked);
        setIsLoading(true);

        try {
            if (nextLiked) {
                await wishApi.addLike(productId);
            } else {
                await wishApi.removeLike(productId);
            }
        } catch (error) {
            setIsLiked(!nextLiked);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, isLoggedIn, isLiked, productId]);

    return {
        isLiked,
        isLoading,
        togglePick,
        loginAlertOpen,
        closeLoginAlert,
        confirmLogin,
    };
};
