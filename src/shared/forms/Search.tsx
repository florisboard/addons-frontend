'use client';

import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams } from '@/hooks';
import { cn } from '@/utils';

type SearchProps = {
  className?: string;
};

export default function Search({ className }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [search, setSearch] = useState<string>(query);
  const debounced = useDebouncedCallback((value: string) => {
    setSearchParams((params) => {
      if (value) params.set('query', value);
      else params.delete('query');
      return { params, pathname: '/projects' };
    });
  }, 1000);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  return (
    <div className={cn('form-control relative', className)}>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          debounced(e.target.value);
        }}
        type="search"
        placeholder="Search ..."
        className="input input-bordered w-full md:w-auto"
      />
    </div>
  );
}
