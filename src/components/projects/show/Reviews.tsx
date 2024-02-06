import React, { useState } from 'react';
import AuthUserReview from '@/components/reviews/AuthUserReview';
import ReviewsModal from '@/components/reviews/ReviewsModal';
import { ReviewResource } from '@/generated';
import { useDialogModal } from '@/hooks';
import Button from '@/shared/Button';
import EmptyList from '@/shared/EmptyList';
import ReviewCard from '@/shared/cards/review/ReviewCard';

type ReviewsProps = {
  reviews: ReviewResource[];
  authUserReview: ReviewResource | undefined;
  projectId: string;
};

export default function Reviews({ reviews, projectId, authUserReview }: ReviewsProps) {
  const { modalRef, handleOpenModal: handleOpenDialogModal } = useDialogModal();
  const [hasModalOpened, setHasModalOpened] = useState(false);

  const handleOpenModal = () => {
    handleOpenDialogModal();
    setHasModalOpened(true);
  };

  return (
    <section className="card bg-base-200 md:col-span-4">
      <ReviewsModal projectId={projectId} modalRef={modalRef} hasModalOpened={hasModalOpened} />
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
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </section>
  );
}
