'use client';

import React, { Fragment } from 'react';
import useCategories from '@/services/categories';
import CategoryCard from '@/shared/cards/category/CategoryCard';
import CategoryCardSkeleton from '@/shared/cards/category/CategoryCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';

export default function Categories() {
  const {
    data: categories,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCategories();

  return (
    <div className="px-container space-y-4">
      <h1 className="font-display text-3xl font-bold">Categories</h1>
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
