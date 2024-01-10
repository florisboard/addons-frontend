import { useQuery } from '@tanstack/react-query';
import api from '@/libs/api';

export async function getProject(id: string) {
  const resp = await api.projects.projectsShow(parseInt(id, 10));
  return resp.data;
}

export default function useProject(id: string) {
  return useQuery({ queryKey: ['projects', id], queryFn: () => getProject(id) });
}
