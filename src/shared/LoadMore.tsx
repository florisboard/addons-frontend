import React from 'react';
import Button from './Button';

type LoadMoreProps = {
  isLoading: boolean;
  onClick: () => void;
};

export default function LoadMore(props: LoadMoreProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <Button {...props} className="btn btn-primary">
        Load More
      </Button>
    </div>
  );
}
