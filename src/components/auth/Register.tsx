import React from 'react';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import errorMessages from '@/fixtures/errorMessages';
import validations from '@/fixtures/validations';
import { useAuthRoutes } from '@/hooks';
import yup from '@/libs/yup';
import Button from '@/shared/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import InputFields from '@/shared/forms/InputFields';
import PasswordField from '@/shared/forms/PasswordField';
import { cn } from '@/utils';
import LoginWithGithub from './LoginWithGithub';

const validationSchema = yup.object({
  username: validations.username,
  email: validations.email,
  password: validations.password,
  password_confirmation: validations.password.oneOf(
    [yup.ref('password')],
    errorMessages.passwordsMatch,
  ),
});

export default function Register() {
  const { login } = useAuthRoutes();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ username: '', email: '', password: '', password_confirmation: '' }}
      onSubmit={() => {}}
    >
      {({ isSubmitting, errors, values }) => (
        <Form className="space-y-4">
          <InputFields fields={[{ isRequired: true, name: 'username', label: 'Username' }]} />
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
          <PasswordField isRequired label="Password Confirmation" name="password_confirmation" />
          <Link href={login} className="btn-link-auth">
            Have an Account?
          </Link>
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
            className="btn-submit-auth"
          >
            Register
          </Button>
          <LoginWithGithub />
        </Form>
      )}
    </Formik>
  );
}
