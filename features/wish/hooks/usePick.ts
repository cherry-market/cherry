import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { wishApi } from '@/shared/services/wishApi';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useWishStore } from '@/features/wish/model/wishStore';

interface UsePickParams {
    productId: number;
    initialIsLiked?: boolean;
}

export const usePick = ({ productId, initialIsLiked = false }: UsePickParams) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    const isLiked = useWishStore(state => state.isLiked(productId));
    const addLikeToStore = useWishStore(state => state.addLike);
    const removeLikeFromStore = useWishStore(state => state.removeLike);
    const [isLoading, setIsLoading] = useState(false);
    const [loginAlertOpen, setLoginAlertOpen] = useState(false);

    useEffect(() => {
        if (initialIsLiked && !isLiked) {
            addLikeToStore(productId);
        }
    }, [initialIsLiked, productId, isLiked, addLikeToStore]);

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
        if (nextLiked) {
            addLikeToStore(productId);
        } else {
            removeLikeFromStore(productId);
        }
        setIsLoading(true);

        try {
            if (nextLiked) {
                await wishApi.addLike(productId);
            } else {
                await wishApi.removeLike(productId);
            }
        } catch (error) {
            if (nextLiked) {
                removeLikeFromStore(productId);
            } else {
                addLikeToStore(productId);
            }
        } finally {
            setIsLoading(false);
        }
    }, [
        isLoading,
        isLoggedIn,
        isLiked,
        productId,
        addLikeToStore,
        removeLikeFromStore,
    ]);

    return {
        isLiked,
        isLoading,
        togglePick,
        loginAlertOpen,
        closeLoginAlert,
        confirmLogin,
    };
};
