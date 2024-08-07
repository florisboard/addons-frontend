import { useInfiniteQuery } from '@tanstack/react-query';
import { ProjectsIndexParams } from '@/generated';
import api from '@/libs/api';
import { getNextPageParam } from '@/utils';

export async function getProjects(params?: ProjectsIndexParams) {
  const resp = await api.v1.projectsIndex({ ...params });
  return resp.data;
}

export default function useProjects(params?: ProjectsIndexParams, options?: { enabled?: boolean }) {
  return useInfiniteQuery({
    ...options,
    queryKey: ['projects', params],
    queryFn: ({ pageParam }) => getProjects({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: getNextPageParam,
  });
}
