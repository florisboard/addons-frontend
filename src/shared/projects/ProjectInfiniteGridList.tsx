import React, { Fragment } from 'react';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { getProjects } from '@/services/projects';
import ProjectCard from '@/shared/cards/project/ProjectCard';
import ProjectCardSkeleton from '@/shared/cards/project/ProjectCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';
import { cn } from '@/utils';

type ProjectInfiniteGridListProps = {
  queryResult: UseInfiniteQueryResult<InfiniteData<Awaited<ReturnType<typeof getProjects>>>>;
  sectionChildren?: React.ReactNode;
  projectCardClassName?: string;
};

export default function ProjectInfiniteGridList({
  queryResult,
  sectionChildren,
  projectCardClassName,
}: ProjectInfiniteGridListProps) {
  const { data: projects, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = queryResult;

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sectionChildren}
        {projects?.pages.map((page) => (
          <Fragment key={page.meta.current_page}>
            {page.data.map((project) => (
              <ProjectCard
                key={project.id}
                bodyClassName={cn('w-auto md:w-auto', projectCardClassName)}
                {...project}
              />
            ))}
          </Fragment>
        ))}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProjectCardSkeleton bodyClassName={cn('w-auto', projectCardClassName)} key={i} />
          ))}
      </section>
      {hasNextPage && <LoadMore isLoading={isFetchingNextPage} onClick={fetchNextPage} />}
    </>
  );
}
