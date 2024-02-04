import React from 'react';
import { HiXCircle } from 'react-icons/hi2';

export default function EmptyList() {
  return (
    <div className="flex h-56 items-center justify-center gap-2">
      <HiXCircle className="h-8 w-8" />
      <h4 className="font-display text-xl font-medium md:text-2xl">No Records Found</h4>
    </div>
  );
}
