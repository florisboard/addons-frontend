'use client';

import React, { Fragment } from 'react';
import { useSearchParams } from '@/hooks';
import useProjects from '@/services/projects';
import ProjectCard from '@/shared/cards/project/ProjectCard';
import ProjectCardSkeleton from '@/shared/cards/project/ProjectCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';

export default function ProjectsList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const {
    data: projects,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useProjects({ filter: { name: query } });

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects?.pages.map((page) => (
          <Fragment key={page.meta.current_page}>
            {page.data.map((project) => (
              <ProjectCard key={project.id} bodyClassName="w-auto" {...project} />
            ))}
          </Fragment>
        ))}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProjectCardSkeleton bodyClassName="w-auto" key={i} />
          ))}
      </section>
      {hasNextPage && <LoadMore isLoading={isFetchingNextPage} onClick={fetchNextPage} />}
    </>
  );
}
