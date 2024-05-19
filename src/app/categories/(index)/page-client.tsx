'use client';

import React, { Fragment } from 'react';
import { useSearchParams } from '@/hooks';
import useCategories from '@/services/categories';
import CategoryCard from '@/shared/cards/category/CategoryCard';
import CategoryCardSkeleton from '@/shared/cards/category/CategoryCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';

export default function CategoriesList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const {
    data: categories,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCategories({ filter: { title: query } });

  return (
    <section className="flex flex-wrap items-center gap-4">
      {categories?.pages.map((page) => (
        <Fragment key={page.meta.current_page}>
          {page.data.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </Fragment>
      ))}
      {isLoading && Array.from({ length: 16 }).map((_, i) => <CategoryCardSkeleton key={i} />)}
      {hasNextPage && <LoadMore isLoading={isFetchingNextPage} onClick={fetchNextPage} />}
    </section>
  );
}
