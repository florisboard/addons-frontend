import { useSuspenseQuery } from '@tanstack/react-query';
import api from '@/libs/api';
import { serverSideCache } from '..';

export async function getProject(id: number) {
  const resp = await api.v1.projectsShow(id);
  return resp.data;
}

export const getProjectServerCache = serverSideCache(getProject, ['projects'], {
  revalidate: 300,
  throwNotFound: false,
});

export default function useProject(id: number) {
  return useSuspenseQuery({ queryKey: ['projects', id], queryFn: () => getProject(id) });
}
