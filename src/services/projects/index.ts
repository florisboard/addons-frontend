import { UndefinedInitialDataInfiniteOptions, useInfiniteQuery } from '@tanstack/react-query';
import { ProjectsIndexParams } from '@/generated';
import api from '@/libs/api';

async function projects(params?: ProjectsIndexParams) {
  const resp = await api.projects.projectsIndex({ ...params });
  return resp.data;
}

export default function useProjects(
  params?: ProjectsIndexParams,
  options?: Pick<UndefinedInitialDataInfiniteOptions<any>, 'enabled'>,
) {
  return useInfiniteQuery({
    ...options,
    queryKey: ['projects', params],
    queryFn: () => projects(params),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.links.next,
  });
}
