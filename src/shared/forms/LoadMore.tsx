import React from 'react';
import { cn } from '@/utils';
import Button from '../Button';

type LoadMoreProps = {
  isLoading: boolean;
  onClick: () => void;
  className?: string;
};

export default function LoadMore({ className, ...props }: LoadMoreProps) {
  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      <Button disabled={props.isLoading} {...props} className="btn btn-primary">
        Load More
      </Button>
    </div>
  );
}
