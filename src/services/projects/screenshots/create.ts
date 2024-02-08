import { useMutation } from '@tanstack/react-query';
import { ProjectsScreenshotsStorePayload } from '@/generated';
import api from '@/libs/api';

type TProjectScreenshotsCreate = ProjectsScreenshotsStorePayload & {
  projectId: number;
};

export async function create({ projectId, ...data }: TProjectScreenshotsCreate) {
  const resp = await api.projects.projectsScreenshotsStore(projectId, data);
  return resp.data;
}

export default function useCreateProjectScreenshots() {
  return useMutation({ mutationFn: create });
}