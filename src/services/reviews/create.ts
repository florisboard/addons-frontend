import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectFullResource, ProjectsReviewsStorePayload } from '@/generated';
import api from '@/libs/api';

type TReviewCreate = ProjectsReviewsStorePayload & {
  projectId: number;
};

async function createReview({ projectId, ...data }: TReviewCreate) {
  const resp = await api.projects.projectsReviewsStore(projectId, data);
  return resp.data;
}

export default function useCreateReview(projectId: number) {
  const queryClient = useQueryClient();
  const queryKey = ['projects', projectId];

  return useMutation({
    mutationFn: (data: ProjectsReviewsStorePayload) => createReview({ projectId, ...data }),
    onSuccess: (createdReview) => {
      const data = queryClient.getQueryData<ProjectFullResource>(queryKey);
      queryClient.setQueryData<ProjectFullResource>(queryKey, {
        ...data!,
        user_review: createdReview,
      });
    },
    meta: {
      success: {
        toast: { content: 'Your review has been created successfully.' },
      },
    },
  });
}
