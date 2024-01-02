import React, { HTMLInputTypeAttribute } from 'react';
import { Field } from 'formik';
import { cn } from '@/utils';
import FieldWrapper, { FieldProps } from './FieldWrapper';

type InputFields = {
  fields: (Omit<FieldProps, 'children'> & { type?: HTMLInputTypeAttribute })[];
};

export default function InputFields({ fields }: InputFields) {
  return fields.map((field) => (
    <FieldWrapper key={field.name} {...field}>
      {({ hasError, ...props }) => (
        <Field
          {...props}
          type={field.type ?? 'text'}
          className={cn('input input-bordered w-full', { 'input-error': hasError })}
        />
      )}
    </FieldWrapper>
  ));
}
