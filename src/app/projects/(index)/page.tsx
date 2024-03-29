import React, { Suspense } from 'react';
import ProjectsList from '@/components/projects/index/ProjectsList';

export default function Projects() {
  return (
    <div className="px-container space-y-4">
      <h1 className="font-display text-3xl font-bold">Projects</h1>
      <Suspense>
        <ProjectsList />
      </Suspense>
    </div>
  );
}
