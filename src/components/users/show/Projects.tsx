import React, { Fragment } from 'react';
import ProjectCard from '@/home/ProjectCard';
import useProjects from '@/services/projects';
import LoadMore from '@/shared/LoadMore';
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
      <div className="flex flex-wrap gap-4">
        {projects?.pages.map((page) => (
          <Fragment key={page.meta.current_page}>
            {page.data.map((project) => (
              <ProjectCard
                key={project.id}
                bodyClassName="bg-base-300"
                reviews={1}
                ratings={1}
                {...project}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && <LoadMore onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </>
  );
}
