import React from 'react';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import validations from '@/fixtures/validations';
import { useAuthRoutes } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useForgotPassword from '@/services/auth/forgotPassword';
import Button from '@/shared/Button';
import InputFields from '@/shared/forms/InputFields';
import { isAxiosError } from '@/utils';
import EmailSent from './EmailSent';

const validationSchema = yup.object({
  email: validations.email,
});

export default function ForgotPassword() {
  const { login } = useAuthRoutes();
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  if (isSuccess) return <EmailSent actionText="reset your password" />;

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: '' }}
      onSubmit={(values, { setErrors }) => {
        forgotPassword(values, {
          onError: (e) => {
            if (isAxiosError<IUnprocessableEntity>(e, 422)) {
              setErrors(e.response!.data.errors);
            }
          },
        });
      }}
    >
      <Form className="space-y-4">
        <InputFields
          fields={[{ isRequired: true, name: 'email', label: 'Email', type: 'email' }]}
        />
        <Link href={login()} className="btn-link-auth">
          Remember your Password?
        </Link>
        <Button
          isLoading={isPending}
          disabled={isPending}
          type="submit"
          className="btn-submit-auth"
        >
          Forgot Password
        </Button>
      </Form>
    </Formik>
  );
}
