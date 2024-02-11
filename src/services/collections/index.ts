import { useInfiniteQuery } from '@tanstack/react-query';
import { CollectionsIndexParams } from '@/generated';
import api from '@/libs/api';
import { getNextPageParam } from '@/utils';

async function getCollections(params?: CollectionsIndexParams) {
  const resp = await api.collections.collectionsIndex({ ...params });
  return resp.data;
}

export default function useCollections(params?: CollectionsIndexParams) {
  return useInfiniteQuery({
    queryKey: ['collections', params],
    queryFn: ({ pageParam }) => getCollections({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: getNextPageParam,
  });
}
