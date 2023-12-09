import React from 'react';
import { ErrorMessage as FormikErrorMessage } from 'formik';

type ErrorMessageProps = {
  name: string;
};

export default function ErrorMessage({ name }: ErrorMessageProps) {
  return <FormikErrorMessage name={name} className="mt-1 text-sm text-error" component="p" />;
}
