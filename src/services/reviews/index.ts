import { useInfiniteQuery } from '@tanstack/react-query';
import { ProjectsReviewsIndexParams } from '@/generated';
import api from '@/libs/api';
import { getNextPageParam } from '@/utils';

async function getReviews(params: ProjectsReviewsIndexParams) {
  const resp = await api.projects.projectsReviewsIndex(params);
  return resp.data;
}

export default function useReviews(params: ProjectsReviewsIndexParams, enabled = true) {
  return useInfiniteQuery({
    queryKey: ['reviews', params],
    queryFn: ({ pageParam }) => getReviews({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: getNextPageParam,
    enabled,
  });
}
