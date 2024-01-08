import { useQuery } from '@tanstack/react-query';
import api from '@/libs/api';

async function project(slug: string) {
  const resp = await api.projects.projectsShow(slug);
  return resp.data;
}

export default function useProject(slug: string) {
  return useQuery({ queryKey: ['projects', slug], queryFn: () => project(slug) });
}
