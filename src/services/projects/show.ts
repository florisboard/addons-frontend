import { useQuery } from '@tanstack/react-query';
import { IProjectFull } from '@/interfaces';
import axios from '@/libs/axios';

async function project(slug: string) {
  const resp = await axios.get<IProjectFull>(`/api/projects/${slug}`);
  return resp.data;
}

export default function useProject(slug: string) {
  return useQuery({ queryKey: ['projects', slug], queryFn: () => project(slug) });
}
