import { useSuspenseQuery } from '@tanstack/react-query';
import api from '@/libs/api';
import { serverSideCache } from '..';

export async function getProject(id: number) {
  const resp = await api.projects.projectsShow(id);
  return resp.data;
}

export const getProjectServerCache = serverSideCache(getProject, ['projects'], {
  revalidate: 300,
});

export default function useProject(id: number) {
  return useSuspenseQuery({ queryKey: ['projects', id], queryFn: () => getProject(id) });
}
