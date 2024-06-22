import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectFullResource } from '@/generated';
import api from '@/libs/api';

async function deleteReview(reviewId: number) {
  const resp = await api.v1.reviewsDestroy(reviewId, {});
  return resp.data;
}

export default function useDeleteReview(projectId: number) {
  const queryClient = useQueryClient();
  const queryKey = ['projects', projectId];

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      const data = queryClient.getQueryData<ProjectFullResource>(queryKey);
      queryClient.setQueryData<ProjectFullResource>(queryKey, { ...data!, user_review: undefined });
    },
    meta: {
      success: {
        toast: { content: 'Your review has been deleted successfully.' },
      },
    },
  });
}
