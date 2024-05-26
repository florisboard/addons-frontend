'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import validations from '@/fixtures/forms/validations';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useDomains from '@/services/domains';
import useCreateDomain from '@/services/domains/create';
import Button from '@/shared/forms/Button';
import Input from '@/shared/forms/Input';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal, isAxiosError, openModal } from '@/utils';

export const modalId = 'domains/create';

const validationSchema = yup.object({
  name: validations.domain,
});

export default function Create() {
  const { mutate, isPending } = useCreateDomain();
  const { data } = useDomains();
  const hasUnverifiedEmail = data.data.some((domain) => !domain.verified_at);

  return (
    <>
      <DialogModal parentElement="div" id={modalId}>
        <h3 className="text-2xl font-bold">Create Domain</h3>
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors, resetForm }) => {
            mutate(values, {
              onSuccess: () => {
                resetForm();
                closeModal(modalId);
              },
              onError: (e) => {
                if (isAxiosError<IUnprocessableEntity>(e, 422)) {
                  setErrors(e.response!.data.errors);
                }
              },
            });
          }}
          initialValues={{ name: '' }}
        >
          <Form className="space-y-4">
            <Input label="Domain Name" isRequired name="name" />
            <div className="flex gap-4">
              <Button onClick={() => closeModal(modalId)} className="btn">
                Cancel
              </Button>
              <Button
                disabled={isPending}
                isLoading={isPending}
                type="submit"
                className="btn btn-primary"
              >
                Create
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogModal>
      <Button
        disabled={hasUnverifiedEmail}
        onClick={() => openModal(modalId)}
        className="btn btn-primary"
      >
        Create
      </Button>
    </>
  );
}
