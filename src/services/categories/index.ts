import { useInfiniteQuery } from '@tanstack/react-query';
import { ICategory, IPaginate } from '@/interfaces';
import axios from '@/libs/axios';

interface ICategoriesParams {
  filter?: {
    name?: string;
  };
}

async function categories(params?: ICategoriesParams) {
  const resp = await axios.get<IPaginate<ICategory>>('/api/categories', { params });
  return resp.data;
}

export default function useCategories(params?: ICategoriesParams) {
  return useInfiniteQuery({
    queryKey: ['categories', params],
    queryFn: () => categories(params),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.links.next,
  });
}
