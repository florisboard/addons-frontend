'use client';

import React, { Fragment } from 'react';
import { useSearchParams } from '@/hooks';
import useProjects from '@/services/projects';
import LoadMore from '@/shared/LoadMore';
import ProjectCard from '@/shared/ProjectCard';

export default function Projects() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const {
    data: projects,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useProjects({ filter: { name: query } });

  return (
    <div className="px-container space-y-4">
      <h1 className="font-display text-3xl font-bold">Projects</h1>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects?.pages.map((page) => (
          <Fragment key={page.meta.current_page}>
            {page.data.map((project) => (
              <ProjectCard key={project.id} bodyClassName="w-auto" {...project} />
            ))}
          </Fragment>
        ))}
      </section>
      {hasNextPage && <LoadMore isLoading={isFetchingNextPage} onClick={fetchNextPage} />}
    </div>
  );
}
