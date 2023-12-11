import React from 'react';
import Lottie from 'react-lottie-player';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import emailSent from '@/assets/animations/emailSent.json';
import validations from '@/fixtures/validations';
import { useAuthRoutes } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useForgotPassword from '@/services/auth/forgotPassword';
import Button from '@/shared/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import { cn, isAxiosError } from '@/utils';

const validationSchema = yup.object({
  email: validations.email,
});

export default function ForgotPassword() {
  const { login } = useAuthRoutes();
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  if (isSuccess) {
    return (
      <>
        <p>We send you an instruction to recover your account. Check your email.</p>
        <Lottie
          className="mx-auto"
          animationData={emailSent}
          play
          loop={false}
          style={{ width: 150, height: 150 }}
        />
      </>
    );
  }

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
        <FieldWrapper label="Email" isRequired name="email">
          {({ hasError, ...props }) => (
            <Field
              {...props}
              type="email"
              className={cn('input input-bordered w-full', { 'input-error': hasError })}
            />
          )}
        </FieldWrapper>
        <Link href={login} className="btn-link-auth">
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
