'use client';

import React, { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import Releases from '@/components/projects/edit/Releases';
import Form from '@/components/projects/form/Form';
import { useCanEditProject } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import useEditProject from '@/services/projects/edit';
import useCreateProjectImage from '@/services/projects/image/create';
import useCreateProjectScreenshots from '@/services/projects/screenshots/create';
import useProject from '@/services/projects/show';
import AuthMiddleware from '@/shared/AuthMiddleware';
import { convertNullToEmptyString, isAxiosError } from '@/utils';

function Edit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: project, isLoading: isProjectLoading } = useProject(+id);
  const { canEdit, isLoading: isMeLoading, isOwner } = useCanEditProject(project);
  const { mutate: createImage, isPending: isImagePending } = useCreateProjectImage();
  const { mutate: createScreenshots, isPending: isScreenshotsPending } =
    useCreateProjectScreenshots();
  const { mutate: editProject, isPending: isProjectPending } = useEditProject(+id);

  const isLoading = isProjectLoading || isMeLoading;
  const isPending = isImagePending || isScreenshotsPending || isProjectPending;

  const tabs = [
    {
      name: 'Information',
      children: (
        <Form
          isOwner={isOwner}
          initialValues={{
            ...convertNullToEmptyString(project),
            maintainers: project?.maintainers.map((user) => user.id),
          }}
          project={project}
          onSubmit={(values, { setErrors }) => {
            editProject(values, {
              onError: (e) => {
                if (isAxiosError<IUnprocessableEntity>(e, 422)) {
                  setErrors(e.response!.data.errors);
                }
              },
            });
            if (values.image_path) {
              createImage({ image: values.image_path, projectId: +id });
            }
            if (values.screenshots_path.length > 0) {
              createScreenshots({ screenshots: values.screenshots_path, projectId: +id });
            }
          }}
          submit={{ text: 'Edit', isPending }}
        />
      ),
    },
    {
      name: 'Releases',
      children: <Releases project={{ id: +id, slug: project.slug }} />,
    },
  ];

  useEffect(() => {
    if (isLoading) return;
    if (!canEdit) router.replace('/');
  }, [isLoading, canEdit, router]);

  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        <h1 className="font-display text-3xl font-bold">Edit {project?.name}</h1>
        <div role="tablist" className="tabs tabs-lifted">
          {tabs.map((tab, i) => (
            <Fragment key={tab.name}>
              <input
                type="radio"
                aria-label={tab.name}
                name="tab"
                role="tab"
                className="tab"
                defaultChecked={i === 0}
              />
              <div
                role="tabpanel"
                className="tab-content space-y-4 rounded-box border-base-300 bg-base-100 p-6"
              >
                {tab.children}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </AuthMiddleware>
  );
}

const EditSSRDisabled = dynamic(() => Promise.resolve(Edit), {
  ssr: false,
});

export default EditSSRDisabled;
