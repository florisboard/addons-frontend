import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectsReleasesStorePayload } from '@/generated';
import api from '@/libs/api';

type TReleaseCreate = ProjectsReleasesStorePayload & {
  projectId: number;
};

export async function createRelease({ projectId, ...data }: TReleaseCreate) {
  const resp = await api.projects.projectsReleasesStore(projectId, data);
  return resp.data;
}

export default function useCreateRelease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRelease,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['releases'] });
    },
    meta: {
      success: { toast: { content: 'Release created successfully.' } },
    },
  });
}
