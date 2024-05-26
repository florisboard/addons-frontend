import React from 'react';
import { useRouter } from 'next/navigation';
import { ReviewResource } from '@/generated';
import useCreateReview from '@/services/reviews/create';
import useEditReview from '@/services/reviews/edit';
import useMe from '@/services/users/me';
import ReviewCard from '@/shared/cards/review/ReviewCard';
import Button from '@/shared/forms/Button';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal, openModal } from '@/utils';
import Form from './Form';

type CommentAReviewProps = {
  projectId: number;
  authUserReview: ReviewResource | undefined;
};

const modalId = 'authReview';

export default function CommentAReview({ projectId, authUserReview }: CommentAReviewProps) {
  const router = useRouter();
  const { mutate: createReview, isPending: isCreating } = useCreateReview(+projectId);
  const { mutate: editReview, isPending: isUpdating } = useEditReview(+projectId);
  const { data: me } = useMe();
  const isPending = isCreating || isUpdating;

  const handleCloseModal = () => closeModal(modalId);
  const handleOpenModal = () => openModal(modalId);

  return (
    <div className="card bg-base-300">
      <DialogModal id={modalId} parentElement="div">
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
      {!authUserReview && (
        <div className="card-body flex-row flex-wrap justify-between gap-4">
          <h3 className="card-title lg:min-w-max">
            {me
              ? "Let others know what's your feedback"
              : 'Login to your Account to comment a Review'}
          </h3>
          <Button
            onClick={() => {
              if (me) handleOpenModal();
              else router.push('/login');
            }}
            className="btn btn-accent"
          >
            {me ? 'Comment a Review' : 'Login'}
          </Button>
        </div>
      )}
    </div>
  );
}
