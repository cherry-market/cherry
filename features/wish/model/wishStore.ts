import { create } from 'zustand';

interface WishState {
    likedProductIds: Set<number>;
    addLike: (productId: number) => void;
    removeLike: (productId: number) => void;
    isLiked: (productId: number) => boolean;
    initializeLikes: (productIds: number[]) => void;
}

export const useWishStore = create<WishState>((set, get) => ({
    likedProductIds: new Set<number>(),

    addLike: (productId) => set((state) => {
        const newSet = new Set(state.likedProductIds);
        newSet.add(productId);
        return { likedProductIds: newSet };
    }),

    removeLike: (productId) => set((state) => {
        const newSet = new Set(state.likedProductIds);
        newSet.delete(productId);
        return { likedProductIds: newSet };
    }),

    isLiked: (productId) => get().likedProductIds.has(productId),

    initializeLikes: (productIds) => set({
        likedProductIds: new Set(productIds),
    }),
}));
