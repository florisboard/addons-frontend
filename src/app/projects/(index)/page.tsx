import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Search from '@/shared/forms/Search';
import ProjectsList from './page-client';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects',
};

export default function Projects() {
  return (
    <div className="px-container space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <h1 className="h1">Projects</h1>
        <Suspense>
          <Search searchOnCurrentRoute />
        </Suspense>
      </div>
      <Suspense>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
