import { useSuspenseQuery } from '@tanstack/react-query';
import api from '@/libs/api';
import { serverSideCache } from '..';

async function getCategory(id: number) {
  const resp = await api.categories.categoriesShow(id);
  return resp.data;
}

export const getCategoryServerCache = serverSideCache(getCategory, ['categories'], {
  revalidate: 300,
});

export default function useCategory(id: number) {
  return useSuspenseQuery({ queryKey: ['categories', id], queryFn: () => getCategory(id) });
}
