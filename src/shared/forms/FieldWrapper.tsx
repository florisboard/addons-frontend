import React from 'react';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import { cn } from '@/utils';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

export type FieldProps = {
  name: string;
  label: string;
  isRequired: boolean;
  children:
    | React.ReactNode
    | ((props: {
        hasError: boolean;
        name: string;
        id: string;
        className?: string;
      }) => React.ReactNode);
  info?: string;
  className?: string;
};

export default function FieldWrapper({
  name,
  label,
  info,
  isRequired,
  className,
  children,
}: FieldProps) {
  const { errors, touched } = useFormikContext<{
    [key: string]: string;
  }>();

  const hasError: boolean = (get(touched, name) && get(errors, name) !== undefined) || false;

  return (
    <div className={cn('form-control', className)}>
      <Label info={info} isRequired={isRequired} htmlFor={name} label={label} />
      {typeof children === 'function' ? children({ hasError, name, id: name }) : children}
      <ErrorMessage name={name} />
    </div>
  );
}
