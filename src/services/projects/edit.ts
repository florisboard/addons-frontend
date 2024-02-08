import { useMutation } from '@tanstack/react-query';
import { ProjectsUpdatePayload } from '@/generated';
import api from '@/libs/api';

type TProjectUpdate = ProjectsUpdatePayload & {
  projectId: number;
};

export async function update({ projectId, ...data }: TProjectUpdate) {
  const resp = await api.projects.projectsUpdate(projectId, data);
  return resp.data;
}

export default function useEditProject(projectId: number) {
  return useMutation({
    mutationFn: (data: ProjectsUpdatePayload) => update({ projectId, ...data }),
    meta: {
      success: { toast: { content: 'Project updated successfully.' } },
    },
  });
}
