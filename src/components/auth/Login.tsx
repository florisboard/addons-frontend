import React from 'react';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import validations from '@/fixtures/forms/validations';
import { useAuthRoutes } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import yup from '@/libs/yup';
import useLogin from '@/services/auth/login';
import Button from '@/shared/forms/Button';
import InputFields from '@/shared/forms/InputFields';
import PasswordField from '@/shared/forms/PasswordField';
import { isAxiosError } from '@/utils';
import LoginWithGithub from './LoginWithGithub';

const validationSchema = yup.object({
  email: validations.email,
  password: validations.password,
});

export default function Login() {
  const { register, forgotPassword } = useAuthRoutes();
  const { mutate: login, isPending } = useLogin();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setErrors }) => {
        login(values, {
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
          isLoading={isPending}
          disabled={isPending}
          type="submit"
          className="btn-submit-auth"
        >
          Login
        </Button>
        <LoginWithGithub />
      </Form>
    </Formik>
  );
}
