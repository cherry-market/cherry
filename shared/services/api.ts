/**
 * API Base URL Configuration
 * - Production: Reads from VITE_API_BASE_URL environment variable (https://api.cheryi.com)
 * - Local Development: Falls back to http://localhost:8080
 * - IMPORTANT: VITE_API_BASE_URL must be set for production builds
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

if (!import.meta.env.VITE_API_BASE_URL && import.meta.env.PROD) {
    console.warn('[API] VITE_API_BASE_URL is not set. Using fallback URL.');
}

export const api = {
    get: async <T>(endpoint: string, signal?: AbortSignal): Promise<T> => {
        const response = await fetch(`${API_BASE}${endpoint}`, { signal });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    },

    post: async <T>(endpoint: string, body?: unknown): Promise<T> => {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }));
            throw new Error(error.message || `${response.status} ${response.statusText}`);
        }
        // 204 No Content 처리
        if (response.status === 204) {
            return undefined as T;
        }
        return response.json();
    },

    /**
     * 인증이 필요한 GET 요청
     */
    authenticatedGet: async <T>(endpoint: string, token: string): Promise<T> => {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    },

    authenticatedPost: async <T>(endpoint: string, token: string, body?: unknown): Promise<T> => {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }));
            throw new Error(error.message || `${response.status} ${response.statusText}`);
        }
        if (response.status === 204) {
            return undefined as T;
        }
        const text = await response.text();
        if (!text) {
            return undefined as T;
        }
        return JSON.parse(text) as T;
    },

    authenticatedDelete: async <T>(endpoint: string, token: string): Promise<T> => {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }));
            throw new Error(error.message || `${response.status} ${response.statusText}`);
        }
        if (response.status === 204) {
            return undefined as T;
        }
        const text = await response.text();
        if (!text) {
            return undefined as T;
        }
        return JSON.parse(text) as T;
    },
};
