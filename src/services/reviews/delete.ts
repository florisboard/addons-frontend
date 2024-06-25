import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/libs/api';

async function deleteReview(reviewId: number) {
  const resp = await api.v1.reviewsDestroy(reviewId, {});
  return resp.data;
}

export default function useDeleteReview(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
    meta: {
      success: {
        toast: { content: 'Your review has been deleted successfully.' },
      },
    },
  });
}
