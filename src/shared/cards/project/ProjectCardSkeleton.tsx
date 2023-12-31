import React, { Fragment } from 'react';
import { cn } from '@/utils';

type ProjectCardSkeletonProps = {
  bodyClassName?: string;
};

export default function ProjectCardSkeleton({ bodyClassName }: ProjectCardSkeletonProps) {
  return (
    <div className={cn('card h-[23rem] w-80 bg-base-200')}>
      <div className="card-body gap-2">
        <div className="skeleton relative h-36 w-full rounded" />
        <div className="skeleton h-7" />
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Fragment key={i}>
              <div className="skeleton h-6 w-16" />
              <div
                className={cn('divider divider-horizontal m-0 p-0', {
                  hidden: i + 1 === 3,
                })}
              />
            </Fragment>
          ))}
        </div>
        <div className="skeleton h-20" />
      </div>
    </div>
  );
}
