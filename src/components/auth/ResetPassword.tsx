import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import errorMessages from '@/fixtures/errorMessages';
import validations from '@/fixtures/validations';
import { useAuthRoutes, useSearchParams } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useResetPassword from '@/services/auth/resetPassword';
import Button from '@/shared/Button';
import PasswordField from '@/shared/forms/PasswordField';
import { isAxiosError } from '@/utils';

const validationSchema = yup.object({
  password: validations.password,
  password_confirmation: validations.password.oneOf(
    [yup.ref('password')],
    errorMessages.passwordsMatch,
  ),
});

export default function ResetPassword() {
  const { login } = useAuthRoutes();
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useResetPassword();
  const [searchParams] = useSearchParams();

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{ password: '', password_confirmation: '' }}
      onSubmit={(values, { setErrors }) => {
        resetPassword(
          { ...values, token: searchParams.get('token')!, email: searchParams.get('email')! },
          {
            onError: (e) => {
              if (isAxiosError<IUnprocessableEntity>(e, 422)) {
                setErrors(e.response!.data.errors);
              }
            },
            onSuccess: () => {
              router.push(login());
            },
          },
        );
      }}
    >
      <Form className="space-y-4">
        <PasswordField isRequired label="Password" name="password" />
        <PasswordField isRequired label="Password Confirmation" name="password_confirmation" />
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
