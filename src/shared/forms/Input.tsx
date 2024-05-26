import React, { InputHTMLAttributes } from 'react';
import { Field } from 'formik';
import { cn } from '@/utils';
import FieldWrapper, { FieldProps } from './FieldWrapper';

type InputProps = Omit<FieldProps, 'children'> & {
  attributes?: InputHTMLAttributes<HTMLInputElement>;
  inputClassName?: string;
};

export default function Input({ attributes, inputClassName, ...props }: InputProps) {
  return (
    <FieldWrapper {...props}>
      {({ hasError, ...fieldProps }) => (
        <Field
          {...fieldProps}
          {...attributes}
          className={cn('input input-bordered w-full', inputClassName, {
            'input-error': hasError,
          })}
        />
      )}
    </FieldWrapper>
  );
}

type InputListsProps = {
  fields: InputProps[];
};

export function InputLists({ fields }: InputListsProps) {
  return fields.map((input) => <Input key={input.name} {...input} />);
}
