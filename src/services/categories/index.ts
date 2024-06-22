import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CategoriesIndexParams } from '@/generated';
import api from '@/libs/api';
import { getNextPageParam } from '@/utils';

async function categories(params?: CategoriesIndexParams) {
  const resp = await api.v1.categoriesIndex({ ...params });
  return resp.data;
}

export default function useCategories(params?: CategoriesIndexParams) {
  return useInfiniteQuery({
    queryKey: ['categories', params],
    queryFn: ({ pageParam }) => categories({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: getNextPageParam,
  });
}
