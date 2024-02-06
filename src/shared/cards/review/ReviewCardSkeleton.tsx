import React from 'react';

export default function ReviewCardSkeleton() {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="skeleton h-14 w-14 shrink-0 rounded-full" />
          <div className="flex w-full flex-col justify-center space-y-2">
            <div className="skeleton h-8 w-20" />
            <div className="skeleton hidden h-7 w-1/2 md:block" />
          </div>
        </div>
        <div className="skeleton h-14 w-3/4 md:hidden" />
        <div className="skeleton h-24 w-full" />
      </div>
    </div>
  );
}
