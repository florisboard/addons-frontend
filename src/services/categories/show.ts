import { useSuspenseQuery } from '@tanstack/react-query';
import api from '@/libs/api';

async function category(slug: string) {
  const resp = await api.categories.categoriesShow(slug);
  return resp.data;
}

export default function useCategory(slug: string) {
  return useSuspenseQuery({ queryKey: ['categories', slug], queryFn: () => category(slug) });
}
