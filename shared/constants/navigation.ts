export const MAIN_TABS = {
  HOME: 'HOME',
  CHAT: 'CHAT',
  LIKES: 'LIKES',
  MY: 'MY',
} as const;

export type MainTab = (typeof MAIN_TABS)[keyof typeof MAIN_TABS];

export const MAIN_TAB_LABELS: Record<MainTab, string> = {
  HOME: '홈',
  CHAT: '채팅',
  LIKES: '픽',
  MY: '마이',
};

