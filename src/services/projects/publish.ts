import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectFullResource, ProjectsUpdatePayload, StatusEnum } from '@/generated';
import api from '@/libs/api';

type TProjectPublish = {
  projectId: number;
};

export async function publishProject({ projectId }: TProjectPublish) {
  const resp = await api.v1.projectsPublish(projectId, {});
  return resp.data;
}

export default function usePublishProject(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => publishProject({ projectId }),
    onSuccess: () => {
      const project = queryClient.getQueryData<ProjectFullResource>(['projects', projectId]);
      if (project) {
        queryClient.setQueryData<ProjectFullResource>(['projects', projectId], {
          ...project,
          status: StatusEnum.UNDER_REVIEW,
        });
      }
    },
    meta: {
      success: { toast: { content: 'Project got published successfully.' } },
    },
  });
}
