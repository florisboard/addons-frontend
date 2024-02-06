import React from 'react';

export default function ReleaseCardSkeleton() {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="skeleton h-14 w-14 shrink-0 rounded-full" />
          <div className="space-y-2">
            <div className="skeleton h-6 w-24" />
            <div className="skeleton h-6 w-14" />
          </div>
        </div>
        <div className="skeleton h-40 w-full" />
      </div>
    </div>
  );
}
