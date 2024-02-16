import React from 'react';
import NewProjectCard from '@/components/projects/create/NewProjectCard';
import useProjects from '@/services/projects';
import EmptyList from '@/shared/EmptyList';
import ProjectInfiniteGridList from '@/shared/projects/ProjectInfiniteGridList';
import { isInfiniteResultEmpty } from '@/utils';

type ProjectsProps = {
  userId: number;
  isCurrentUser: boolean;
};

export default function Projects({ userId, isCurrentUser }: ProjectsProps) {
  const queryResult = useProjects({ sort: '-id', filter: { user_id: userId } });
  const { isLoading } = queryResult;

  if (isInfiniteResultEmpty(queryResult) && !isCurrentUser) return <EmptyList />;

  return (
    <ProjectInfiniteGridList
      sectionChildren={!isLoading && isCurrentUser && <NewProjectCard />}
      queryResult={queryResult}
    />
  );
}
