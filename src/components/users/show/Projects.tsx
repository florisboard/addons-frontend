import React from 'react';
import useProjects from '@/services/projects';
import EmptyList from './EmptyList';

type ProjectsProps = {
  userId?: number;
};

export default function Projects({ userId }: ProjectsProps) {
  const { data: projects, isLoading } = useProjects({ sort: 'id', filter: { user_id: userId } });

  return <EmptyList name="Projects" />;
}
