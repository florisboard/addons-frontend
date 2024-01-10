import { useMutation } from '@tanstack/react-query';
import { ProjectsStorePayload } from '@/generated';
import api from '@/libs/api';

export async function create(data: ProjectsStorePayload) {
  const resp = await api.projects.projectsStore(data);
  return resp.data;
}

export default function useCreateProject() {
  return useMutation({ mutationFn: create });
}
