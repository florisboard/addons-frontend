import { useSuspenseQuery } from '@tanstack/react-query';
import api from '@/libs/api';

async function category(id: number) {
  const resp = await api.categories.categoriesShow(id);
  return resp.data;
}

export default function useCategory(id: number) {
  return useSuspenseQuery({ queryKey: ['categories', id], queryFn: () => category(id) });
}
