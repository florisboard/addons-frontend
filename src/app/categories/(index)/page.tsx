import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CategoriesList from '@/components/categories/index/CategoriesList';
import Search from '@/shared/forms/Search';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Categories',
};

export default function Categories() {
  return (
    <div className="px-container space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <h1 className="h1">Categories</h1>
        <Suspense>
          <Search searchOnCurrentRoute placeholder="Search Categories ..." />
        </Suspense>
      </div>
      <Suspense>
        <CategoriesList />
      </Suspense>
    </div>
  );
}
