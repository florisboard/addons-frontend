import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectFullResource, ProjectsReviewsStorePayload } from '@/generated';
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
  const queryKey = ['projects', projectId];

  return useMutation({
    mutationFn: editReview,
    onSuccess: (createdReview) => {
      const data = queryClient.getQueryData<ProjectFullResource>(queryKey);
      queryClient.setQueryData<ProjectFullResource>(queryKey, {
        ...data!,
        user_review: createdReview,
      });
    },
    meta: {
      success: {
        toast: { content: 'Your review has been updated successfully.' },
      },
    },
  });
}
