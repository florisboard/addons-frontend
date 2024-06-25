import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectsReviewsStorePayload } from '@/generated';
import api from '@/libs/api';

type TReviewCreate = ProjectsReviewsStorePayload & {
  projectId: number;
};

async function createReview({ projectId, ...data }: TReviewCreate) {
  const resp = await api.v1.projectsReviewsStore(projectId, data);
  return resp.data;
}

export default function useCreateReview(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectsReviewsStorePayload) => createReview({ projectId, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
    meta: {
      success: {
        toast: { content: 'Your review has been created successfully.' },
      },
    },
  });
}
