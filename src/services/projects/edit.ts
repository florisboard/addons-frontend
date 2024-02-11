import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectsUpdatePayload } from '@/generated';
import api from '@/libs/api';

type TProjectUpdate = ProjectsUpdatePayload & {
  projectId: number;
};

export async function editProject({ projectId, ...data }: TProjectUpdate) {
  const resp = await api.projects.projectsUpdate(projectId, data);
  return resp.data;
}

export default function useEditProject(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectsUpdatePayload) => editProject({ projectId, ...data }),
    onSuccess: (data) => {
      queryClient.setQueryData(['projects', projectId], data);
    },
    meta: {
      success: { toast: { content: 'Project updated successfully.' } },
    },
  });
}
