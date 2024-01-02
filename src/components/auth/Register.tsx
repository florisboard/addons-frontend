import React from 'react';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import errorMessages from '@/fixtures/errorMessages';
import validations from '@/fixtures/validations';
import { useAuthRoutes } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useRegister from '@/services/auth/register';
import Button from '@/shared/Button';
import InputFields from '@/shared/forms/InputFields';
import PasswordField from '@/shared/forms/PasswordField';
import { isAxiosError } from '@/utils';
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
  const { mutate: register, isPending } = useRegister();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ username: '', email: '', password: '', password_confirmation: '' }}
      onSubmit={(values, { setErrors }) => {
        register(values, {
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
          fields={[
            { isRequired: true, name: 'username', label: 'Username' },
            { isRequired: true, name: 'email', label: 'Email', type: 'email' },
          ]}
        />
        <PasswordField isRequired label="Password" name="password" />
        <PasswordField isRequired label="Password Confirmation" name="password_confirmation" />
        <Link href={login()} className="btn-link-auth">
          Have an Account?
        </Link>
        <Button
          isLoading={isPending}
          disabled={isPending}
          type="submit"
          className="btn-submit-auth"
        >
          Register
        </Button>
        <LoginWithGithub />
      </Form>
    </Formik>
  );
}
