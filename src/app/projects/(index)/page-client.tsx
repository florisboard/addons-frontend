'use client';

import React from 'react';
import config from '@/fixtures/config';
import { useSearchParams } from '@/hooks';
import useProjects from '@/services/projects';
import ProjectInfiniteGridList from '@/shared/projects/ProjectInfiniteGridList';

export default function ProjectsList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get(config.searchKey) ?? '';
  const queryResult = useProjects({ filter: { title: query } });

  return <ProjectInfiniteGridList queryResult={queryResult} />;
}
