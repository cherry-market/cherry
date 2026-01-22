import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    nickname: string;
    email: string;
    profileImage?: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            token: null,
            login: (user, token) => set({ isLoggedIn: true, user, token }),
            logout: () => set({ isLoggedIn: false, user: null, token: null }),
        }),
        {
            name: 'cherry-auth-storage',
        }
    )
);
