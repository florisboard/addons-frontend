import React from 'react';
import { HiXCircle } from 'react-icons/hi2';

type EmptyListProps = {
  message?: string;
};

export default function EmptyList({ message = 'No Records Found' }: EmptyListProps) {
  return (
    <div className="mx-auto flex h-56 items-center justify-center gap-2">
      <HiXCircle className="h-8 w-8" />
      <p className="font-display text-xl font-medium md:text-2xl">{message}</p>
    </div>
  );
}
