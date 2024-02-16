'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSearchParams } from '@/hooks';
import useCategory from '@/services/categories/show';
import useProjects from '@/services/projects';
import Search from '@/shared/forms/Search';
import ProjectInfiniteGridList from '@/shared/projects/ProjectInfiniteGridList';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const { data: category } = useCategory(slug);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const queryResult = useProjects({ filter: { category_id: category.id, name: query } });

  return (
    <div className="px-container space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <h1 className="font-display text-3xl font-bold">{category.name} Projects</h1>
        <Search searchOnCurrentRoute placeholder="Search Category Projects ..." />
      </div>
      <ProjectInfiniteGridList queryResult={queryResult} />
    </div>
  );
}
