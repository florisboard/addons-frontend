import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CategoriesIndexParams } from '@/generated';
import api from '@/libs/api';

async function categories(params?: CategoriesIndexParams) {
  const resp = await api.categories.categoriesIndex({ ...params });
  return resp.data;
}

export default function useCategories(params?: CategoriesIndexParams) {
  return useInfiniteQuery({
    queryKey: ['categories', params],
    queryFn: () => categories(params),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.links.next,
  });
}
