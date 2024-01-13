'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCanEditProject } from '@/hooks';
import useProject from '@/services/projects/show';
import CenterSpinner from '@/shared/CenterSpinner';

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: project, isLoading: isProjectLoading } = useProject(id);
  const { canEdit, isLoading: isMeLoading } = useCanEditProject(project);
  const isLoading = isProjectLoading || isMeLoading;

  useEffect(() => {
    if (isLoading) return;
    if (!canEdit) router.replace('/');
  }, [isLoading, canEdit, router]);

  if (isLoading) return <CenterSpinner />;
  return <div>Edit</div>;
}
