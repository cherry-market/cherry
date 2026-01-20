export const MOCK_CHATS = [
  {
    id: '1',
    partner: {
      name: '싸게싸게',
      location: '신림동',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    },
    lastMessage: 'Sticker sent',
    time: '2y',
    unread: 0,
    productImg: 'https://images.unsplash.com/photo-1555445054-8488d05c9584?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '2',
    partner: {
      name: '바르샤맨',
      location: '신림동',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    },
    lastMessage: 'Sticker sent',
    time: '1y',
    unread: 0,
    productImg: 'https://images.unsplash.com/photo-1563245372-f21724e3a80d?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '3',
    partner: {
      name: 'realslow',
      location: '팽성읍',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    },
    lastMessage: '00:12',
    time: '1y',
    unread: 0,
    productImg: 'https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '4',
    partner: {
      name: '젊은이',
      location: '청담동',
      avatar:
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80',
    },
    lastMessage: '안녕하세요. 사진상으로는 클릭 사망이 16이라고...',
    time: '5mo',
    unread: 1,
    productImg: 'https://images.unsplash.com/photo-1526045612212-70fad8114247?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '5',
    partner: {
      name: '체리페이',
      location: '',
      avatar:
        'https://images.unsplash.com/vector-1757783035399-179f77597c15?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=100&q=80',
    },
    lastMessage: '개인정보 이용 · 제공내역 및 수집출처 통지 안내',
    time: '2mo',
    unread: 0,
    productImg: null,
    isOfficial: true,
  },
];

export const CHAT_DETAIL_HEADER = {
  partnerName: '싸게싸게',
  partnerTemperatureLabel: '46.6°C',
};

export const CHAT_DETAIL_PRODUCT_SUMMARY = {
  image:
    'https://images.unsplash.com/photo-1555445054-8488d05c9584?auto=format&fit=crop&w=100&q=80',
  title: 'LG 전자레인지 나눔',
  priceLabel: 'Given away',
};

export const CHAT_DETAIL_PARTNER_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80';

export const CHAT_DETAIL_DATE_LABEL = 'Oct 8, 2024';
export const CHAT_INPUT_PLACEHOLDER = '메시지 보내기';

export const MOCK_MESSAGES = [
  { id: 1, sender: 'PARTNER', text: '저용', time: '6:06 PM' },
  { id: 2, sender: 'PARTNER', text: '다른 이웃과 거래 예약 중이에요.', time: '6:06 PM' },
  {
    id: 3,
    sender: 'ME',
    text: '연락주셨는데 죄송해요 앞에 먼저 연락주신 분이 가져가기로 했습니다',
    time: '6:11 PM',
  },
  { id: 4, sender: 'PARTNER', text: '넵 감사합니다\n혹시라도 취소 되면 알려주세용!', time: '6:13 PM' },
  { id: 5, sender: 'ME', text: '네 알겠습니당~', time: '6:15 PM' },
];

