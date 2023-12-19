import React from 'react';

type EmptyListProps = {
  name: string;
};

export default function EmptyList({ name }: EmptyListProps) {
  return (
    <div className="flex h-56 flex-col items-center justify-center">
      <h4 className="text-xl font-medium">Empty {name}</h4>
    </div>
  );
}
