import { useInfiniteQuery } from '@tanstack/react-query';
import { ICollection, IPaginate } from '@/interfaces';
import axios from '@/libs/axios';

interface ICollectionsParams {
  filter?: {
    name?: string;
    user_id?: number;
  };
}

async function collections(params?: ICollectionsParams) {
  const resp = await axios.get<IPaginate<ICollection>>('/api/collections', { params });
  return resp.data;
}

export default function useCollections(params?: ICollectionsParams) {
  return useInfiniteQuery({
    queryKey: ['collections', params],
    queryFn: () => collections(params),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.links.next,
  });
}
