import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ProjectsList from '@/components/projects/index/ProjectsList';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects',
};

export default function Projects() {
  return (
    <div className="px-container space-y-4">
      <h1 className="h1">Projects</h1>
      <Suspense>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
