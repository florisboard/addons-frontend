import React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { cn } from '@/utils';
import Button from './Button';

type LabelProps = {
  label: string;
  htmlFor: string;
  isRequired?: boolean;
  info?: string;
  className?: string;
};

export default function Label({ label, htmlFor, info, isRequired = false, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn('label-text w-full font-medium', className)}>
      {label} {isRequired && <span className="text-error">*</span>}{' '}
      {info && (
        <Button data-tip={info} className="tooltip">
          <HiOutlineInformationCircle strokeWidth={2} className="inline-block size-5" />
        </Button>
      )}
    </label>
  );
}
