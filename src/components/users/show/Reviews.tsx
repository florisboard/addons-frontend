import React, { Fragment } from 'react';
import Link from 'next/link';
import useReviews from '@/services/reviews';
import EmptyList from '@/shared/EmptyList';
import ReviewCard from '@/shared/cards/review/ReviewCard';
import ReviewCardSkeleton from '@/shared/cards/review/ReviewCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';

type ReviewsProps = {
  userId: number;
};

export default function Reviews({ userId }: ReviewsProps) {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useReviews({
    filter: { user_id: userId },
    sort: '-id',
  });

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {isLoading && Array.from({ length: 5 }).map((_, i) => <ReviewCardSkeleton key={i} />)}
      {data?.pages.map((page) => (
        <Fragment key={page.meta.current_page}>
          {page.data.map((review) => (
            <Link className="block" href={`/projects/${review.project_id}/slug`} key={review.id}>
              <ReviewCard cardClassName="h-full" hasOptions={false} {...review} />
            </Link>
          ))}
        </Fragment>
      ))}
      {data?.pages.at(0)?.meta.total === 0 && <EmptyList />}
      {hasNextPage && <LoadMore onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </section>
  );
}
