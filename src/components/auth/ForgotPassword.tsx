import React from 'react';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import validations from '@/fixtures/validations';
import { useAuthRoutes } from '@/hooks';
import yup from '@/libs/yup';
import Button from '@/shared/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import { cn } from '@/utils';

const validationSchema = yup.object({
  email: validations.email,
});

export default function ForgotPassword() {
  const { login } = useAuthRoutes();

  return (
    <Formik validationSchema={validationSchema} initialValues={{ email: '' }} onSubmit={() => {}}>
      {({ isSubmitting }) => (
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
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
            className="btn-submit-auth"
          >
            Forgot Password
          </Button>
        </Form>
      )}
    </Formik>
  );
}
