import React from 'react';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import validations from '@/fixtures/forms/validations';
import { useDialogModal } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useEditMe from '@/services/users/edit';
import useMe from '@/services/users/me';
import Button from '@/shared/forms/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import DialogModal from '@/shared/modals/DialogModal';
import { cn, isAxiosError } from '@/utils';

const validationSchema = yup.object({
  username: validations.username,
});

export default function ProfileUpdate() {
  const { data: me } = useMe();
  const { modalRef, handleCloseModal, handleOpenModal } = useDialogModal();
  const { mutate: editMe, isPending } = useEditMe();
  const router = useRouter();

  return (
    <>
      <DialogModal
        dialogClassName="modal-bottom md:modal-middle"
        parentClassName="h-full max-h-screen md:h-auto"
        parentElement="div"
        id="profileUpdate"
        modalRef={modalRef}
      >
        <h3 className="text-2xl font-bold">
          Update your <span className="text-primary">Account</span>
        </h3>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={{ username: me!.username }}
          onSubmit={(values, { setErrors }) => {
            editMe(values, {
              onSuccess: (data) => {
                router.replace(`/users/${data.username}`);
                handleCloseModal();
              },
              onError: (e) => {
                if (isAxiosError<IUnprocessableEntity>(e, 422)) {
                  setErrors(e.response!.data.errors);
                }
              },
            });
          }}
        >
          <Form className="space-y-4">
            <FieldWrapper label="Username" isRequired name="username">
              {({ hasError, ...props }) => (
                <Field
                  {...props}
                  className={cn('input input-bordered w-full', { 'input-error': hasError })}
                />
              )}
            </FieldWrapper>
            <div className="flex gap-4">
              <Button onClick={handleCloseModal} className="btn">
                Cancel
              </Button>
              <Button isLoading={isPending} disabled type="submit" className="btn btn-primary">
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogModal>
      <div className="card bg-base-200">
        <div className="card-body">
          <h5 className="card-title">Update your Information</h5>
          <p className="text-sm text-base-content/80">
            You want to update your username, etc ... We got your covered.
          </p>
          <div className="card-actions">
            <Button onClick={handleOpenModal} className="btn btn-primary">
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
