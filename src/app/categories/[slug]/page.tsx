'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/categories/show/Breadcrumb';
import config from '@/fixtures/config';
import { useSearchParams } from '@/hooks';
import useCategory from '@/services/categories/show';
import useProjects from '@/services/projects';
import Search from '@/shared/forms/Search';
import ProjectInfiniteGridList from '@/shared/projects/ProjectInfiniteGridList';
import { extractIdFromSlug } from '@/utils';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const { data: category } = useCategory(extractIdFromSlug(slug)!);
  const [searchParams] = useSearchParams();
  const query = searchParams.get(config.searchKey) ?? '';
  const queryResult = useProjects({ filter: { category_id: category.id, title: query } });

  return (
    <div className="px-container space-y-4 overflow-y-hidden">
      <Breadcrumb title={category.title} />
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <h1 className="h1">
          <span className="text-primary">{category.title}</span> Projects
        </h1>
        <Search searchOnCurrentRoute />
      </div>
      <ProjectInfiniteGridList queryResult={queryResult} />
    </div>
  );
}
