import { useInfiniteQuery } from '@tanstack/react-query';
import { CollectionsIndexParams } from '@/generated';
import api from '@/libs/api';

async function collections(params?: CollectionsIndexParams) {
  const resp = await api.collections.collectionsIndex({ ...params });
  return resp.data;
}

export default function useCollections(params?: CollectionsIndexParams) {
  return useInfiniteQuery({
    queryKey: ['collections', params],
    queryFn: () => collections(params),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.links.next,
  });
}
