'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Form from '@/components/projects/form/Form';
import { useCanEditProject } from '@/hooks';
import useProject from '@/services/projects/show';
import AuthMiddleware from '@/shared/AuthMiddleware';
import CenterSpinner from '@/shared/CenterSpinner';

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: project, isLoading: isProjectLoading } = useProject(id);
  const { canEdit, isLoading: isMeLoading, isOwner } = useCanEditProject(project);
  const isLoading = isProjectLoading || isMeLoading;

  useEffect(() => {
    if (isLoading) return;
    if (!canEdit) router.replace('/');
  }, [isLoading, canEdit, router]);

  if (isLoading) return <CenterSpinner />;
  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        <h1 className="font-display text-3xl font-bold">Edit {project?.name}</h1>
        <Form
          isOwner={isOwner}
          initialValues={{
            ...project,
            maintainers: project?.maintainers.map((user) => user.id),
          }}
          project={project}
          onSubmit={(values, { setErrors }) => {}}
          submit={{ text: 'Edit', isPending: false }}
        />
      </div>
    </AuthMiddleware>
  );
}
