import React from 'react';
import capitalize from 'lodash/capitalize';
import { StatusEnum } from '@/generated';
import { cn } from '@/utils';

type StatusBadgeProps = {
  status: StatusEnum;
  showWhenApproved: boolean;
};

export default function StatusBadge({ status, showWhenApproved }: StatusBadgeProps) {
  if (!showWhenApproved && status === StatusEnum.APPROVED) return false;

  return (
    <span
      className={cn('badge badge-lg min-w-max', {
        'badge-warning': status === StatusEnum.PENDING,
        'badge-error': status === StatusEnum.REJECTED,
        'badge-success': status === StatusEnum.APPROVED,
      })}
    >
      {capitalize(status)}
    </span>
  );
}
