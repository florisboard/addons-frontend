import React, { InputHTMLAttributes } from 'react';
import { Field } from 'formik';
import { cn } from '@/utils';
import FieldWrapper, { FieldProps } from './FieldWrapper';

type TextareaProps = Omit<FieldProps, 'children'> & {
  attributes?: InputHTMLAttributes<HTMLTextAreaElement>;
};

export default function Textarea({ className, attributes, ...props }: TextareaProps) {
  return (
    <FieldWrapper className={cn('col-span-full', { className })} {...props}>
      {({ hasError, ...props }) => (
        <Field
          {...attributes}
          {...props}
          as="textarea"
          className={cn('textarea textarea-bordered w-full', {
            'textarea-error': hasError,
          })}
        />
      )}
    </FieldWrapper>
  );
}
