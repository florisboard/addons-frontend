'use client';

import React from 'react';
import { useSearchParams } from '@/hooks';
import useProjects from '@/services/projects';
import ProjectInfiniteGridList from '@/shared/projects/ProjectInfiniteGridList';

export default function ProjectsList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const queryResult = useProjects({ filter: { title: query } });

  return <ProjectInfiniteGridList queryResult={queryResult} />;
}
