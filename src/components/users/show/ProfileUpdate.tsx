import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import errorMessages from '@/fixtures/errorMessages';
import validations from '@/fixtures/validations';
import { useDialogModal } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useEditMe from '@/services/users/edit';
import useMe from '@/services/users/me';
import Button from '@/shared/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import PasswordField from '@/shared/forms/PasswordField';
import DialogModal from '@/shared/modals/DialogModal';
import { cn, isAxiosError } from '@/utils';

export default function ProfileUpdate() {
  const { data: me } = useMe();
  const { modalRef, handleCloseModal, handleOpenModal } = useDialogModal();
  const { mutate: editMe, isPending } = useEditMe();
  const router = useRouter();

  const validationSchema = useMemo(() => {
    return yup.object({
      username: validations.username,
      email: validations.email,
      current_password: validations.password.notRequired().when(['email', 'new_password'], {
        is: (email: string, new_password: string) => email !== me?.email || !!new_password,
        then: (schema) => schema.required(),
      }),
      new_password: validations.password.notRequired(),
      new_password_confirmation: validations.password
        .notRequired()
        .when('new_password', {
          is: true,
          then: (schema) => schema.required(),
        })
        .oneOf([yup.ref('password')], errorMessages.passwordsMatch),
    });
  }, [me?.email]);

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
          initialValues={{
            username: me!.username,
            email: me!.email,
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
          }}
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
          {({ values }) => {
            const hasPassword = !!values.new_password;
            const showCurrentPassword = values.email !== me?.email || !!values.new_password;

            return (
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
                {showCurrentPassword && (
                  <PasswordField isRequired label="Current Password" name="current_password" />
                )}
                <PasswordField isRequired={hasPassword} label="New Password" name="new_password" />
                {hasPassword && (
                  <PasswordField
                    isRequired
                    label="New Password Confirmation"
                    name="new_password_confirmation"
                  />
                )}
                <div className="flex gap-4">
                  <Button onClick={handleCloseModal} className="btn">
                    Cancel
                  </Button>
                  <Button
                    isLoading={isPending}
                    disabled={isPending}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            );
          }}
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
