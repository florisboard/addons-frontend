import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectFullResource } from '@/generated';
import api from '@/libs/api';

type TProjectPublish = {
  projectId: number;
};

export async function deleteProject({ projectId }: TProjectPublish) {
  const resp = await api.v1.projectsDestroy(projectId, {});
  return resp.data;
}

export default function useDeleteProject(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProject({ projectId }),
    onSuccess: () => {
      queryClient.setQueryData<ProjectFullResource>(['projects', projectId], undefined);
    },
    meta: {
      success: { toast: { content: 'Project got deleted successfully.' } },
    },
  });
}
