import React from 'react';
import { StatusEnum } from '@/generated';
import { cn, enumToTitle } from '@/utils';

type StatusBadgeProps = {
  status: StatusEnum;
  showWhenApproved: boolean;
};

export default function StatusBadge({ status, showWhenApproved }: StatusBadgeProps) {
  if (!showWhenApproved && status === StatusEnum.APPROVED) return false;

  return (
    <span
      className={cn('badge badge-lg min-w-max', {
        'badge-warning': [StatusEnum.UNDER_REVIEW, StatusEnum.DRAFT].includes(status),
        'badge-error': status === StatusEnum.REJECTED,
        'badge-success': status === StatusEnum.APPROVED,
      })}
    >
      {enumToTitle(status)}
    </span>
  );
}
