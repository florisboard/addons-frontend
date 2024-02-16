import { useMutation } from '@tanstack/react-query';
import api from '@/libs/api';

type TProjectScreenshotsDelete = {
  projectId: number;
  mediaId: number;
};

export async function deleteScreenshot({ projectId, mediaId }: TProjectScreenshotsDelete) {
  const resp = await api.projects.projectsScreenshotsDestroy(projectId, mediaId, {});
  return resp.data;
}

export default function useDeleteProjectScreenshots() {
  return useMutation({ mutationFn: deleteScreenshot });
}
