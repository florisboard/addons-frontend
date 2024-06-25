import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectsReviewsStorePayload } from '@/generated';
import api from '@/libs/api';

type TReviewEdit = ProjectsReviewsStorePayload & {
  reviewId: number;
};

async function editReview({ reviewId, ...data }: TReviewEdit) {
  const resp = await api.v1.reviewsUpdate(reviewId, data);
  return resp.data;
}

export default function useEditReview(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
    meta: {
      success: {
        toast: { content: 'Your review has been updated successfully.' },
      },
    },
  });
}
