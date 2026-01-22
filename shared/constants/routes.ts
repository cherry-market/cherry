export const ROUTES = {
  ROOT: '/',
  CHAT_DETAIL_PATTERN: '/chat/:id',
  PRODUCT_DETAIL_PATTERN: '/product/:id',
  CHAT_DETAIL: (id: number | string) => `/chat/${id}`,
  PRODUCT_DETAIL: (id: number | string) => `/product/${id}`,
  PRODUCT_WRITE: '/write',
  PRODUCT_WRITE_AI: '/write/ai',
  MY_PICKS: '/picks',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const;
