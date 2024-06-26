import { useInfiniteQuery } from '@tanstack/react-query';
import { ReviewsIndexParams } from '@/generated';
import api from '@/libs/api';
import { getNextPageParam } from '@/utils';

async function getReviews(params: ReviewsIndexParams) {
  const resp = await api.v1.reviewsIndex(params);
  return resp.data;
}

export default function useReviews(params: ReviewsIndexParams, enabled = true) {
  return useInfiniteQuery({
    queryKey: ['reviews', params],
    queryFn: ({ pageParam }) => getReviews({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: getNextPageParam,
    enabled,
  });
}
