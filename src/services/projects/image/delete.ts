import { useMutation } from '@tanstack/react-query';
import api from '@/libs/api';

export async function deleteImage(projectId: number) {
  const resp = await api.v1.projectsImageDestroy(projectId, {});
  return resp.data;
}

export default function useDeleteProjectImage() {
  return useMutation({ mutationFn: deleteImage });
}
