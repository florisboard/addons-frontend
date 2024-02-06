import React, { Fragment, Ref, useState } from 'react';
import { ReviewsIndexParams } from '@/generated';
import { IOption } from '@/interfaces';
import useReviews from '@/services/reviews';
import ReviewCard from '@/shared/cards/review/ReviewCard';
import ReviewCardSkeleton from '@/shared/cards/review/ReviewCardSkeleton';
import ResourcesModal from '../projects/show/ResourcesModal';

type ReleasesModal = {
  modalRef: Ref<HTMLDialogElement>;
  hasModalOpened: boolean;
  projectId: string;
};

type TSort = ReviewsIndexParams['sort'];

const sorts: IOption<TSort>[] = [
  { label: 'Latest', value: '-id' },
  { label: 'Oldest', value: 'id' },
];

const scoreFilters: IOption<number>[] = [
  { label: 'All', value: 0 },
  { label: '5 ⭐', value: 5 },
  { label: '4 ⭐', value: 4 },
  { label: '3 ⭐', value: 3 },
  { label: '2 ⭐', value: 2 },
  { label: '1 ⭐', value: 1 },
];

export default function ReviewsModal({ modalRef, hasModalOpened, projectId }: ReleasesModal) {
  const [orderBy, setOrderBy] = useState<TSort>(sorts.at(0)?.value);
  const [scoreFilter, setScoreFilter] = useState<number>(scoreFilters.at(0)!.value);
  const queryResult = useReviews(
    {
      filter: { project_id: +projectId, score: scoreFilter === 0 ? undefined : scoreFilter },
      sort: orderBy,
    },
    hasModalOpened,
  );
  const { data } = queryResult;

  return (
    <ResourcesModal<TSort>
      queryResult={queryResult}
      title="Project Reviews"
      modalRef={modalRef}
      Skeleton={ReviewCardSkeleton}
      sorts={{ options: sorts, activeValue: orderBy, setActiveValue: setOrderBy }}
      filters={{ options: scoreFilters, activeValue: scoreFilter, setActiveValue: setScoreFilter }}
      id="reviews"
    >
      {data?.pages.map((page) => (
        <Fragment key={page.meta.current_page}>
          {page.data.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Fragment>
      ))}
    </ResourcesModal>
  );
}
