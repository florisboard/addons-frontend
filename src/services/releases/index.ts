import { useInfiniteQuery } from '@tanstack/react-query';
import { ReleasesIndexParams } from '@/generated';
import api from '@/libs/api';
import { getNextPageParam } from '@/utils';

async function getReleases(params?: ReleasesIndexParams) {
  const resp = await api.releases.releasesIndex({ ...params });
  return resp.data;
}

export default function useReleases(params?: ReleasesIndexParams) {
  return useInfiniteQuery({
    queryKey: ['releases', params],
    queryFn: ({ pageParam }) => getReleases({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: getNextPageParam,
  });
}
