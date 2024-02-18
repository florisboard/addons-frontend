'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/categories/show/Breadcrumb';
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
    <div className="px-container space-y-4 overflow-y-hidden">
      <Breadcrumb slug={slug} />
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <h1 className="h1">
          <span className="text-primary">{category.name}</span> Projects
        </h1>
        <Search searchOnCurrentRoute placeholder="Search Projects ..." />
      </div>
      <ProjectInfiniteGridList queryResult={queryResult} />
    </div>
  );
}
