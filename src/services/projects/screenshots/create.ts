import { useMutation } from '@tanstack/react-query';
import { ProjectsScreenshotsStorePayload } from '@/generated';
import api from '@/libs/api';

type TProjectScreenshotsCreate = ProjectsScreenshotsStorePayload & {
  projectId: number;
};

export async function createScreenshots({ projectId, ...data }: TProjectScreenshotsCreate) {
  const resp = await api.v1.projectsScreenshotsStore(projectId, data);
  return resp.data;
}

export default function useCreateProjectScreenshots() {
  return useMutation({ mutationFn: createScreenshots });
}
