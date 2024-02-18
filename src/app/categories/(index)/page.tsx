'use client';

import React, { Fragment } from 'react';
import { useSearchParams } from '@/hooks';
import useCategories from '@/services/categories';
import CategoryCard from '@/shared/cards/category/CategoryCard';
import CategoryCardSkeleton from '@/shared/cards/category/CategoryCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';
import Search from '@/shared/forms/Search';

export default function Categories() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const {
    data: categories,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCategories({ filter: { name: query } });

  return (
    <div className="px-container space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <h1 className="h1">Categories</h1>
        <Search searchOnCurrentRoute placeholder="Search Categories ..." />
      </div>
      <section className="flex flex-wrap items-center gap-4">
        {categories?.pages.map((page) => (
          <Fragment key={page.meta.current_page}>
            {page.data.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </Fragment>
        ))}
        {isLoading && Array.from({ length: 16 }).map((_, i) => <CategoryCardSkeleton key={i} />)}
      </section>
      {hasNextPage && <LoadMore isLoading={isFetchingNextPage} onClick={fetchNextPage} />}
    </div>
  );
}
