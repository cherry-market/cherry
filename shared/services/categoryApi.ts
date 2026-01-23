import { api } from './api';

export interface Category {
  id: number;
  code: string;
  displayName: string;
}

export const categoryApi = {
  getCategories: () => api.get<Category[]>('/categories'),
};

