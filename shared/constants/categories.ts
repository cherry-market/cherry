export const CATEGORIES = [
  '전체',
  '포토카드',
  '앨범',
  '응원봉',
  '인형/굿즈',
  '패션/잡화',
] as const;

export type Category = (typeof CATEGORIES)[number];

