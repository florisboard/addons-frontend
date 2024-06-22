import { useMutation } from '@tanstack/react-query';
import { ProjectsStorePayload } from '@/generated';
import api from '@/libs/api';

export async function createProject(data: ProjectsStorePayload) {
  const resp = await api.v1.projectsStore(data);
  return resp.data;
}

export default function useCreateProject() {
  return useMutation({
    mutationFn: createProject,
    meta: {
      success: { toast: { content: 'Project created successfully.' } },
    },
  });
}
