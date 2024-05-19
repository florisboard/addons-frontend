import React from 'react';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import validations from '@/fixtures/forms/validations';
import { useDialogModal } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useDeleteAccount from '@/services/users/delete';
import Button from '@/shared/forms/Button';
import PasswordField from '@/shared/forms/PasswordField';
import DialogModal from '@/shared/modals/DialogModal';
import { isAxiosError } from '@/utils';

const validationSchema = yup.object({
  password: validations.password,
});

export default function DeleteAccount() {
  const router = useRouter();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const { modalRef, handleCloseModal, handleOpenModal } = useDialogModal();

  return (
    <>
      <DialogModal parentElement="div" closeOnClickOutside modalRef={modalRef} id="deleteAccount">
        <h3 className="text-2xl font-bold">
          Delete your <span className="text-primary">Account</span>
        </h3>
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors }) => {
            deleteAccount(values, {
              onSuccess: () => {
                router.replace('/');
              },
              onError: (e) => {
                if (isAxiosError<IUnprocessableEntity>(e, 422)) {
                  setErrors(e.response!.data.errors);
                }
              },
            });
          }}
          initialValues={{ password: '' }}
        >
          <Form className="space-y-4">
            <PasswordField isRequired label="Password" name="password" />
            <div className="flex gap-4">
              <Button onClick={handleCloseModal} className="btn">
                Cancel
              </Button>
              <Button
                isLoading={isPending}
                disabled={isPending}
                type="submit"
                className="btn btn-error"
              >
                Delete
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogModal>
      <div className="card bg-base-200">
        <div className="card-body">
          <h5 className="card-title">Delete your Account</h5>
          <p className="text-sm">
            Remember there&apos;s no coming back once you delete your account it&apos;s gone
            forever!
          </p>
          <div className="card-actions">
            <Button onClick={handleOpenModal} className="btn btn-error">
              Delete anyway
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
