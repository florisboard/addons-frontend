import React from 'react';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import validations from '@/fixtures/validations';
import { useAuthRoutes } from '@/hooks';
import yup from '@/libs/yup';
import Button from '@/shared/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import PasswordField from '@/shared/forms/PasswordField';
import { cn } from '@/utils';
import LoginWithGithub from './LoginWithGithub';

const validationSchema = yup.object({
  email: validations.email,
  password: validations.password,
});

export default function Login() {
  const { register, forgotPassword } = useAuthRoutes();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: '', password: '' }}
      onSubmit={() => {}}
    >
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
          <PasswordField isRequired label="Password" name="password" />
          <div className="item-center flex justify-between">
            <Link href={register} className="btn-link-auth">
              New here?
            </Link>
            <Link href={forgotPassword} className="btn-link-auth">
              Forgot password?
            </Link>
          </div>
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
            className="btn-submit-auth"
          >
            Login
          </Button>
          <LoginWithGithub />
        </Form>
      )}
    </Formik>
  );
}
