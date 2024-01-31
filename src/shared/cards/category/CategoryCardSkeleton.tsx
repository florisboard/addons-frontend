import React from 'react';

export default function CategoryCardSkeleton() {
  return (
    <div className="btn btn-lg md:gap-8">
      <div className="skeleton h-7 w-32" />
      <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
    </div>
  );
}
