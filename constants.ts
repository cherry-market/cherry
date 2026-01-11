import { Product } from './types';

// Categories for the app
export const CATEGORIES = [
  '추천',
  '포토카드',
  '앨범',
  '응원봉',
  '인형/굿즈',
  '패션/잡화'
];

// Curated Unsplash Image Collections to ensure "Marketplace Product" feel
const CATEGORY_IMAGES: Record<string, string[]> = {
  '포토카드': [
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80', // Cards flatlay
    'https://images.unsplash.com/photo-1526045612212-70fad8114247?auto=format&fit=crop&w=400&q=80', // Holding photo
    'https://images.unsplash.com/photo-1592518974558-756553835694?auto=format&fit=crop&w=400&q=80', // Polaroid in hand
    'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?auto=format&fit=crop&w=400&q=80', // Cards on table
  ],
  '앨범': [
    'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=400&q=80', // Vinyl/Album
    'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=400&q=80', // Red Book
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80', // Open photobook
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80', // Pink books
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80', // Books stack
  ],
  '응원봉': [
    'https://images.unsplash.com/photo-1563245372-f21724e3a80d?auto=format&fit=crop&w=400&q=80', // Neon tubes
    'https://images.unsplash.com/photo-1550948537-130a1ce83314?auto=format&fit=crop&w=400&q=80', // Purple Neon
    'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=400&q=80', // Concert light
    'https://images.unsplash.com/photo-1517260739337-6799d239ce83?auto=format&fit=crop&w=400&q=80', // Flashlight
  ],
  '인형/굿즈': [
    'https://images.unsplash.com/photo-1555445054-8488d05c9584?auto=format&fit=crop&w=400&q=80', // White Bear
    'https://images.unsplash.com/photo-1572456596277-2e458c973a87?auto=format&fit=crop&w=400&q=80', // Teddy Bear
    'https://images.unsplash.com/photo-1551029506-0807df4e2031?auto=format&fit=crop&w=400&q=80', // Pink Doll
    'https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&w=400&q=80', // Box/Package
    'https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&w=400&q=80', // Toys
  ],
  '패션/잡화': [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80', // White Tote Bag
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', // T-shirt
    'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=400&q=80', // Cap
    'https://images.unsplash.com/photo-1605218427368-35b861280387?auto=format&fit=crop&w=400&q=80', // Pink Bag
  ]
};

// Fallback for random selection
const getRandomImage = (category: string) => {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['인형/굿즈'];
  return images[Math.floor(Math.random() * images.length)];
};

// Seed Data with specific images
const SEED_PRODUCTS: Product[] = [
  {
    id: '1',
    title: '뉴진스 "Get Up" 버니 비치백 (화이트)',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80', // White Tote
    category: '패션/잡화',
    status: 'SELLING',
    likes: 124,
    uploadedTime: '10분 전',
    seller: {
      name: '하니팜_라버',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
      temperature: 37.5
    },
    tags: ['뉴진스', '버니', '풀박스'],
    description: '포카 확인만 하고 보관했습니다. 구성품 다 있어요. 박스 상태 최상입니다. 홍대입구역 직거래 가능해요.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80', 
      'https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: '2',
    title: '아이브 원영 애프터라이크 공방 포카 (희귀)',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1526045612212-70fad8114247?auto=format&fit=crop&w=400&q=80', // Holding Photo
    category: '포토카드',
    status: 'SELLING',
    likes: 850,
    uploadedTime: '1시간 전',
    seller: {
      name: '다이브인유',
      avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80',
      temperature: 42.0
    },
    tags: ['아이브', '장원영', '공방포카', '레어'],
    description: '극희귀 공방 포카입니다. 하자 전혀 없고요, 탑로더+뽁뽁이 안전포장해서 보내드립니다.',
    images: ['https://images.unsplash.com/photo-1526045612212-70fad8114247?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: '3',
    title: 'NCT 127 공식 응원봉 Ver. 2',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3a80d?auto=format&fit=crop&w=400&q=80', // Neon
    category: '응원봉',
    status: 'RESERVED',
    likes: 42,
    uploadedTime: '3시간 전',
    seller: {
      name: '네오시티시민',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
      temperature: 36.5
    },
    tags: ['NCT', '엔시티127', '믐뭔봄'],
    description: '콘서트 때 한 번 사용했습니다. 건전지는 빼서 드려요. 박스에 약간 찍힘 있습니다.',
    images: [
        'https://images.unsplash.com/photo-1563245372-f21724e3a80d?auto=format&fit=crop&w=400&q=80', 
        'https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: '4',
    title: '블랙핑크 지수 꽃 솔로 포토북',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=400&q=80', // Red Book
    category: '앨범',
    status: 'SOLD',
    likes: 210,
    uploadedTime: '1일 전',
    seller: {
      name: '수야___',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      temperature: 39.0
    },
    tags: ['블랙핑크', '지수', '한정판'],
    description: '한정판 포토북입니다. 특전 포함 풀셋입니다.',
    images: ['https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=400&q=80']
  },
  {
    id: '5',
    title: '세븐틴 민규 10cm 인형',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1555445054-8488d05c9584?auto=format&fit=crop&w=400&q=80', // White Bear
    category: '인형/굿즈',
    status: 'SELLING',
    likes: 56,
    uploadedTime: '5분 전',
    seller: {
      name: '캐럿랜드',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      temperature: 38.2
    },
    tags: ['세븐틴', '민규', '솜뭉치'],
    description: '너무 귀여운 10cm 인형입니다. 사진에 보이는 옷 포함해서 드려요.',
    images: ['https://images.unsplash.com/photo-1555445054-8488d05c9584?auto=format&fit=crop&w=400&q=80']
  },
   {
    id: '6',
    title: '에스파 카리나 Girls 디럭스 박스',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&w=400&q=80', // Box
    category: '앨범',
    status: 'SELLING',
    likes: 312,
    uploadedTime: '30분 전',
    seller: {
      name: '마이월드',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80',
      temperature: 36.8
    },
    tags: ['에스파', '카리나', '디럭스'],
    description: '미개봉 디럭스 박스입니다. 소장용으로 추천드려요.',
    images: ['https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&w=400&q=80']
  }
];

// Function to generate 100 mock items with strict category images
const generateMockData = (count: number): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    const seed = SEED_PRODUCTS[i % SEED_PRODUCTS.length];
    const randomPriceVariation = Math.floor(Math.random() * 5000) - 2500;
    const randomLikeVariation = Math.floor(Math.random() * 50);
    
    // Pick a random image from the correct category
    // This ensures that an "Album" always gets an album-like image, and "Fashion" gets a bag/shirt
    const randomImgUrl = getRandomImage(seed.category);
    
    products.push({
      ...seed,
      id: `${i + 1}`,
      title: `${seed.title} #${i + 1}`,
      price: Math.max(1000, seed.price + randomPriceVariation),
      likes: seed.likes + randomLikeVariation,
      image: randomImgUrl,
      images: [randomImgUrl, getRandomImage(seed.category)]
    });
  }
  return products;
};

export const MOCK_PRODUCTS = generateMockData(100);