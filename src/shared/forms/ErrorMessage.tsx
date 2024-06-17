import React from 'react';
import { ErrorMessage as FormikErrorMessage } from 'formik';
import isArray from 'lodash/isArray';

type ErrorMessageProps = {
  name: string;
};

export default function ErrorMessage({ name }: ErrorMessageProps) {
  return (
    <FormikErrorMessage
      render={(message) => {
        if (isArray(message) && message.length > 1) {
          return (
            <ul className="mt-1 list-disc space-y-2 px-4 text-sm text-error">
              {message.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          );
        }
        return <p className="mt-1 text-sm text-error">{message}</p>;
      }}
      name={name}
    />
  );
}
