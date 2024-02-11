import { useMutation } from '@tanstack/react-query';
import { ProjectsImageStorePayload, ProjectsStorePayload } from '@/generated';
import api from '@/libs/api';

type TProjectImageCreate = ProjectsImageStorePayload & {
  projectId: number;
};

export async function createImage({ projectId, ...data }: TProjectImageCreate) {
  const resp = await api.projects.projectsImageStore(projectId, data);
  return resp.data;
}

export default function useCreateProjectImage() {
  return useMutation({ mutationFn: createImage });
}
