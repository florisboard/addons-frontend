import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { Field } from 'formik';
import { cn } from '@/utils';
import Button from './Button';
import FieldWrapper, { FieldProps } from './FieldWrapper';

type PasswordFieldProps = Omit<FieldProps, 'children'>;

export default function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = showPassword ? HiOutlineEyeSlash : HiOutlineEye;

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FieldWrapper className="relative" {...props}>
      {({ hasError, ...props }) => (
        <>
          <Field
            {...props}
            type={showPassword ? 'text' : 'password'}
            className={cn('input input-bordered w-full pr-10', { 'input-error': hasError })}
          />
          <Button
            onClick={handleToggleShowPassword}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-8"
          >
            <Icon className="h-6 w-6" />
          </Button>
        </>
      )}
    </FieldWrapper>
  );
}
