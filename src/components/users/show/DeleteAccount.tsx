import React from 'react';
import { useRouter } from 'next/navigation';
import { Field, Form, Formik } from 'formik';
import useDeleteAccount from '@/services/users/delete';
import Button from '@/shared/forms/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal, openModal } from '@/utils';

const modalId = 'deleteAccount';

export default function DeleteAccount() {
  const router = useRouter();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  return (
    <>
      <DialogModal parentElement="div" id="deleteAccount" closeOnClickOutside>
        <h3 className="text-2xl font-bold">
          Delete your <span className="text-primary">Account</span>
        </h3>
        <Formik
          onSubmit={(values) => {
            deleteAccount(values, {
              onSuccess: () => {
                router.replace('/');
              },
            });
          }}
          initialValues={{ text: '' }}
        >
          {({ values }) => (
            <Form className="space-y-4">
              <FieldWrapper label="Confirmation Text" isRequired name="text">
                {({ hasError, ...props }) => (
                  <>
                    <Field {...props} className="input input-bordered w-full" />
                    <p className="text-sm text-base-content/80">
                      Type <span className="font-bold">DELETE</span> to delete your Account.
                    </p>
                  </>
                )}
              </FieldWrapper>
              <div className="flex gap-4">
                <Button onClick={() => closeModal(modalId)} className="btn">
                  Cancel
                </Button>
                <Button
                  isLoading={isPending}
                  disabled={isPending || values.text !== 'DELETE'}
                  type="submit"
                  className="btn btn-error"
                >
                  Delete
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogModal>
      <div className="card bg-base-200">
        <div className="card-body">
          <h5 className="card-title">Delete your Account</h5>
          <p className="text-sm text-base-content/80">
            Remember there&apos;s no coming back once you delete your account it&apos;s gone
            forever!
          </p>
          <div className="card-actions">
            <Button onClick={() => openModal(modalId)} className="btn btn-error">
              Delete anyway
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
