export const ROUTES = {
  ROOT: '/',
  CHAT_DETAIL_PATTERN: '/chat/:id',
  PRODUCT_DETAIL_PATTERN: '/product/:id',
  CHAT_DETAIL: (id: string) => `/chat/${id}`,
  PRODUCT_DETAIL: (id: string) => `/product/${id}`,
  PRODUCT_WRITE: '/write',
  PRODUCT_WRITE_AI: '/write/ai',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const;
