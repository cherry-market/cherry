import { create } from 'zustand';

interface WishState {
    likedProductIds: Set<number>;
    knownProductIds: Set<number>;
    likeCounts: Record<number, number>;
    addLike: (productId: number) => void;
    removeLike: (productId: number) => void;
    isLiked: (productId: number) => boolean;
    initializeLikes: (productIds: number[]) => void;
    hydrateLikeState: (productId: number, isLiked: boolean, likeCount?: number) => void;
    incrementLikeCount: (productId: number, delta: number) => void;
}

export const useWishStore = create<WishState>((set, get) => ({
    likedProductIds: new Set<number>(),
    knownProductIds: new Set<number>(),
    likeCounts: {},

    addLike: (productId) => set((state) => {
        const newSet = new Set(state.likedProductIds);
        newSet.add(productId);
        const knownSet = new Set(state.knownProductIds);
        knownSet.add(productId);
        return { likedProductIds: newSet, knownProductIds: knownSet };
    }),

    removeLike: (productId) => set((state) => {
        const newSet = new Set(state.likedProductIds);
        newSet.delete(productId);
        const knownSet = new Set(state.knownProductIds);
        knownSet.add(productId);
        return { likedProductIds: newSet, knownProductIds: knownSet };
    }),

    isLiked: (productId) => get().likedProductIds.has(productId),

    initializeLikes: (productIds) => set((state) => {
        const knownSet = new Set(state.knownProductIds);
        productIds.forEach((id) => knownSet.add(id));
        return {
            likedProductIds: new Set(productIds),
            knownProductIds: knownSet,
        };
    }),

    hydrateLikeState: (productId, isLiked, likeCount) => set((state) => {
        const updates: Partial<WishState> = {};
        const hasKnown = state.knownProductIds.has(productId);
        if (!hasKnown) {
            const newSet = new Set(state.likedProductIds);
            if (isLiked) {
                newSet.add(productId);
            } else {
                newSet.delete(productId);
            }
            const knownSet = new Set(state.knownProductIds);
            knownSet.add(productId);
            updates.likedProductIds = newSet;
            updates.knownProductIds = knownSet;
        }

        if (typeof likeCount === 'number' && state.likeCounts[productId] === undefined) {
            updates.likeCounts = {
                ...state.likeCounts,
                [productId]: Math.max(0, likeCount),
            };
        }

        if (Object.keys(updates).length === 0) {
            return state;
        }

        return updates;
    }),

    incrementLikeCount: (productId, delta) => set((state) => {
        const current = state.likeCounts[productId] ?? 0;
        const nextCount = Math.max(0, current + delta);
        return {
            likeCounts: {
                ...state.likeCounts,
                [productId]: nextCount,
            },
        };
    }),
}));
