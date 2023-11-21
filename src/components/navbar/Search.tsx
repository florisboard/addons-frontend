'use client';

import React, { useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import Button from '@/shared/Button';
import { cn } from '@/utils';

type SearchProps = {
  className?: string;
};

export default function Search({ className }: SearchProps) {
  const [search, setSearch] = useState('');

  return (
    <div className={cn('form-control relative', className)}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="input input-bordered w-full pr-12 md:w-auto"
      />
      {search && (
        <Button className="btn btn-circle btn-sm absolute right-2 top-2">
          <HiChevronRight className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
