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
      title: 'Information',
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
              createImage({ image_path: values.image_path, projectId: +id });
            }
            if (values.screenshots_path.length > 0) {
              createScreenshots({ screenshots_path: values.screenshots_path, projectId: +id });
            }
          }}
          submit={{ text: 'Edit', isPending }}
        />
      ),
    },
    {
      title: 'Releases',
      children: <Releases project={{ id: +id, title: project.title }} />,
    },
  ];

  useEffect(() => {
    if (isLoading) return;
    if (!canEdit) router.replace('/');
  }, [isLoading, canEdit, router]);

  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        <h1 className="h1">Edit {project?.title}</h1>
        <div role="tablist" className="tabs tabs-lifted">
          {tabs.map((tab, i) => (
            <Fragment key={tab.title}>
              <input
                type="radio"
                aria-label={tab.title}
                name="tab"
                role="tab"
                className="tab"
                defaultChecked={i === 1}
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
