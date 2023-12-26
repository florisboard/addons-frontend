import React, { Fragment } from 'react';
import useProjects from '@/services/projects';
import LoadMore from '@/shared/LoadMore';
import ProjectCard from '@/shared/ProjectCard';
import EmptyList from './EmptyList';

type ProjectsProps = {
  userId?: number;
};

export default function Projects({ userId }: ProjectsProps) {
  const {
    data: projects,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useProjects({ sort: 'id', filter: { user_id: userId } }, { enabled: !!userId });

  if (!isLoading && projects?.pages.at(0)?.meta.total! <= 0) {
    return <EmptyList name="Projects" />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects?.pages.map((page) => (
          <Fragment key={page.meta.current_page}>
            {page.data.map((project) => (
              <ProjectCard key={project.id} bodyClassName="bg-base-300 w-auto" {...project} />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && <LoadMore onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </>
  );
}
