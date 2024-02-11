import React, { Fragment } from 'react';
import NewProjectCard from '@/components/projects/create/NewProjectCard';
import useProjects from '@/services/projects';
import ProjectCard from '@/shared/cards/project/ProjectCard';
import ProjectCardSkeleton from '@/shared/cards/project/ProjectCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';

type ProjectsProps = {
  userId: number;
  isCurrentUser: boolean;
};

export default function Projects({ userId, isCurrentUser }: ProjectsProps) {
  const {
    data: projects,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useProjects({ sort: '-id', filter: { user_id: userId } });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {!isLoading && isCurrentUser && <NewProjectCard />}
        {projects?.pages.map((page) => (
          <Fragment key={page.meta.current_page}>
            {page.data.map((project) => (
              <ProjectCard key={project.id} bodyClassName="bg-base-300 w-auto" {...project} />
            ))}
          </Fragment>
        ))}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton bodyClassName="w-auto bg-base-100" key={i} />
          ))}
      </div>
      {hasNextPage && <LoadMore onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </>
  );
}
