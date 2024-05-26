import React from 'react';
import { Field } from 'formik';
import { IOption } from '@/interfaces';
import { cn } from '@/utils';
import FieldWrapper, { FieldProps } from './FieldWrapper';

type SelectProps = Omit<FieldProps, 'children'> & {
  options: IOption<string>[];
};

export default function Select({ options, ...props }: SelectProps) {
  return (
    <FieldWrapper {...props}>
      {({ hasError, ...fieldProps }) => (
        <Field
          {...fieldProps}
          as="select"
          className={cn('select select-bordered w-full', {
            'select-error': hasError,
          })}
        >
          <option value="">Please Select an Option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      )}
    </FieldWrapper>
  );
}
