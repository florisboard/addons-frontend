import React from 'react';
import NewProjectCard from '@/components/projects/create/NewProjectCard';
import useProjects from '@/services/projects';
import ProjectInfiniteGridList from '@/shared/projects/ProjectInfiniteGridList';

type ProjectsProps = {
  userId: number;
  isCurrentUser: boolean;
};

export default function Projects({ userId, isCurrentUser }: ProjectsProps) {
  const queryResult = useProjects({ sort: '-id', filter: { user_id: userId } });

  return (
    <ProjectInfiniteGridList
      sectionChildren={!queryResult.isLoading && isCurrentUser && <NewProjectCard />}
      queryResult={queryResult}
    />
  );
}
