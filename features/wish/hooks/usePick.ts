import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { wishApi } from '@/shared/services/wishApi';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useWishStore } from '@/features/wish/model/wishStore';

interface UsePickParams {
    productId: number;
    initialIsLiked?: boolean;
    initialLikeCount?: number;
}

export const usePick = ({
    productId,
    initialIsLiked = false,
    initialLikeCount,
}: UsePickParams) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    const isLiked = useWishStore(state => state.isLiked(productId));
    const addLikeToStore = useWishStore(state => state.addLike);
    const removeLikeFromStore = useWishStore(state => state.removeLike);
    const hydrateLikeState = useWishStore(state => state.hydrateLikeState);
    const incrementLikeCount = useWishStore(state => state.incrementLikeCount);
    const likeCount = useWishStore(state => state.likeCounts[productId]);
    const [isLoading, setIsLoading] = useState(false);
    const [loginAlertOpen, setLoginAlertOpen] = useState(false);

    useEffect(() => {
        hydrateLikeState(productId, initialIsLiked, initialLikeCount);
    }, [productId, initialIsLiked, initialLikeCount, hydrateLikeState]);

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
            incrementLikeCount(productId, 1);
        } else {
            removeLikeFromStore(productId);
            incrementLikeCount(productId, -1);
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
                incrementLikeCount(productId, -1);
            } else {
                addLikeToStore(productId);
                incrementLikeCount(productId, 1);
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
        incrementLikeCount,
    ]);

    return {
        isLiked,
        isLoading,
        togglePick,
        loginAlertOpen,
        closeLoginAlert,
        confirmLogin,
        likeCount,
    };
};
