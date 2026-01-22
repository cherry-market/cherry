import { api } from './api';
import type { ProductListResponse } from './productApi';
import { useAuthStore } from '@/features/auth/model/authStore';

const requireToken = () => {
    const token = useAuthStore.getState().token;
    if (!token) {
        throw new Error('Authentication required.');
    }
    return token;
};

export const wishApi = {
    addLike: (productId: number): Promise<void> => {
        const token = requireToken();
        return api.authenticatedPost<void>(`/products/${productId}/like`, token);
    },

    removeLike: (productId: number): Promise<void> => {
        const token = requireToken();
        return api.authenticatedDelete<void>(`/products/${productId}/like`, token);
    },

    getMyLikes: (cursor?: string | null, limit = 20): Promise<ProductListResponse> => {
        const token = requireToken();
        const params = new URLSearchParams();
        if (cursor) {
            params.append('cursor', cursor);
        }
        params.append('limit', String(limit));
        const query = params.toString();
        const endpoint = query ? `/me/likes?${query}` : '/me/likes';
        return api.authenticatedGet<ProductListResponse>(endpoint, token);
    },

    getLikeStatus: (productId: number): Promise<boolean> => {
        const token = requireToken();
        return api.authenticatedGet<boolean>(`/products/${productId}/like-status`, token);
    },
};
