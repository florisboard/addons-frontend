import { useInfiniteQuery } from '@tanstack/react-query';
import { ProjectsIndexParams } from '@/generated';
import api from '@/libs/api';

async function getReleases(params?: ProjectsIndexParams) {
  const resp = await api.projects.projectsIndex({ ...params });
  return resp.data;
}

export default function useReleases(params?: ProjectsIndexParams) {
  return useInfiniteQuery({
    queryKey: ['projects', params],
    queryFn: () => getReleases(params),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.links.next,
  });
}
