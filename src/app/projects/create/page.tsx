'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/projects/form/Form';
import { IUnprocessableEntity } from '@/interfaces';
import useCreateProject from '@/services/projects/create';
import useCreateProjectImage from '@/services/projects/image/create';
import useCreateProjectScreenshots from '@/services/projects/screenshots/create';
import AuthMiddleware from '@/shared/AuthMiddleware';
import { convertPackageName, isAxiosError, slugifyId } from '@/utils';

export default function CreateProject() {
  const { isPending: isCreating, mutateAsync: createProject } = useCreateProject();
  const { isPending: isCreatingImage, mutateAsync: createImage } = useCreateProjectImage();
  const { mutate: createScreenshots, isPending: isScreenshotsPending } =
    useCreateProjectScreenshots();
  const isPending = isCreating || isCreatingImage;

  const router = useRouter();

  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        <h1 className="h1">Create new Project</h1>
        <Form
          mode="create"
          isOwner
          onSubmit={async (values, { setErrors }) => {
            const data = await createProject(
              {
                ...values,
                package_name: convertPackageName(values.package_name, values.domain_name),
              },
              {
                onError: (e) => {
                  if (isAxiosError<IUnprocessableEntity>(e, 422)) {
                    setErrors(e.response?.data.errors as any);
                  }
                },
              },
            );
            if (values.image_path) {
              await createImage({ image_path: values.image_path, projectId: data.id });
            }
            if (values.screenshots_path.length > 0) {
              await createScreenshots({
                screenshots_path: values.screenshots_path,
                projectId: data.id,
              });
            }
            router.push(`/projects/${slugifyId(data.id, data.title)}/edit?tab=releases`);
          }}
          submit={{ text: 'Create', disabled: isPending, isPending }}
        />
      </div>
    </AuthMiddleware>
  );
}
