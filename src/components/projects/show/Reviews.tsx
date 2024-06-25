import React, { useState } from 'react';
import AuthUserReview from '@/components/reviews/AuthUserReview';
import ReviewsModal, { modalId } from '@/components/reviews/ReviewsModal';
import { ReviewResource } from '@/generated';
import EmptyList from '@/shared/EmptyList';
import ReviewCard from '@/shared/cards/review/ReviewCard';
import Button from '@/shared/forms/Button';
import { openModal } from '@/utils';

type ReviewsProps = {
  reviews: ReviewResource[];
  authUserReview: ReviewResource | undefined;
  projectId: number;
};

export default function Reviews({ reviews, projectId, authUserReview }: ReviewsProps) {
  const [hasModalOpened, setHasModalOpened] = useState(false);

  const handleOpenModal = () => {
    openModal(modalId);
    setHasModalOpened(true);
  };

  return (
    <section className="card bg-base-200 md:col-span-4">
      <ReviewsModal projectId={projectId} hasModalOpened={hasModalOpened} />
      <div className="card-body gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="card-title font-display text-2xl">Reviews</h2>
          <Button onClick={handleOpenModal} className="btn btn-link btn-md no-underline">
            All Reviews
          </Button>
        </div>
        <div className="divider" />
        <AuthUserReview authUserReview={authUserReview} projectId={projectId} />
        {reviews.length <= 0 && <EmptyList />}
        {reviews
          .filter((review) => review.id !== authUserReview?.id)
          .map((review) => {
            return <ReviewCard key={review.id} {...review} />;
          })}
      </div>
    </section>
  );
}
