import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDialogModal } from '@/hooks';
import useMe from '@/services/users/me';
import Button from '@/shared/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import PasswordField from '@/shared/forms/PasswordField';
import DialogModal from '@/shared/modals/DialogModal';
import { cn } from '@/utils';

export default function ProfileUpdate() {
  const { data: me } = useMe();
  const { modalRef, handleCloseModal, handleOpenModal } = useDialogModal();

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
        <Formik initialValues={{ username: me?.username, email: me?.email }} onSubmit={() => {}}>
          <Form className="space-y-4">
            <FieldWrapper label="Username" isRequired name="username">
              {({ hasError, ...props }) => (
                <Field
                  {...props}
                  className={cn('input input-bordered w-full', { 'input-error': hasError })}
                />
              )}
            </FieldWrapper>
            <FieldWrapper label="Email" isRequired name="email">
              {({ hasError, ...props }) => (
                <Field
                  {...props}
                  type="email"
                  className={cn('input input-bordered w-full', { 'input-error': hasError })}
                />
              )}
            </FieldWrapper>
            <PasswordField isRequired={false} label="Password" name="password" />
            <PasswordField
              isRequired={false}
              label="Password Confirmation"
              name="password_confirmation"
            />
            <div className="flex gap-4">
              <Button onClick={handleCloseModal} className="btn">
                Cancel
              </Button>
              <Button className="btn btn-primary">Submit</Button>
            </div>
          </Form>
        </Formik>
      </DialogModal>
      <div className="card bg-base-200">
        <div className="card-body">
          <h5 className="card-title">Update your Information</h5>
          <p className="text-sm">
            You want to update your password, email, username etc ... We got your covered.
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
