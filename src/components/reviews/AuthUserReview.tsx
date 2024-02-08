import React from 'react';
import { ReviewResource } from '@/generated';
import { useDialogModal } from '@/hooks';
import useCreateReview from '@/services/reviews/create';
import useEditReview from '@/services/reviews/edit';
import useMe from '@/services/users/me';
import Button from '@/shared/Button';
import ReviewCard from '@/shared/cards/review/ReviewCard';
import DialogModal from '@/shared/modals/DialogModal';
import Form from './Form';

type CommentAReviewProps = {
  projectId: string;
  authUserReview: ReviewResource | undefined;
};

export default function CommentAReview({ projectId, authUserReview }: CommentAReviewProps) {
  const { modalRef, handleCloseModal, handleOpenModal } = useDialogModal();
  const { mutate: createReview, isPending: isCreating } = useCreateReview(+projectId);
  const { mutate: editReview, isPending: isUpdating } = useEditReview(+projectId);
  const isPending = isCreating || isUpdating;

  const { data: me } = useMe();

  return (
    <div className="card bg-base-300">
      <DialogModal id="authUserReview" modalRef={modalRef} parentElement="div">
        <h3 className="font-display text-2xl font-bold">
          {authUserReview ? 'Edit your Review' : 'Create a Review'}
        </h3>
        <div className="divider" />
        <Form
          initialValues={authUserReview ?? { score: 5, title: '', description: '' }}
          isPending={isPending}
          onSubmit={(values) => {
            if (authUserReview) {
              editReview(
                { ...values, reviewId: authUserReview.id },
                { onSuccess: handleCloseModal },
              );
            } else {
              createReview(values, {
                onSuccess: handleCloseModal,
              });
            }
          }}
          onCancel={handleCloseModal}
        />
      </DialogModal>
      {authUserReview && <ReviewCard onEdit={handleOpenModal} {...authUserReview} />}
      {me && !authUserReview && (
        <div className="card-body flex-row flex-wrap justify-between gap-4">
          <h3 className="card-title min-w-max">Let others know what&apos;s your feedback</h3>
          <Button onClick={handleOpenModal} className="btn btn-accent">
            Comment a Review
          </Button>
        </div>
      )}
    </div>
  );
}
