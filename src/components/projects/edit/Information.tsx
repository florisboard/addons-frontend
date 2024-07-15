import React from 'react';
import { ProjectFullResource, StatusEnum } from '@/generated';
import { useCanEditProject } from '@/hooks';
import { IUnprocessableEntity } from '@/interfaces';
import useEditProject from '@/services/projects/edit';
import useCreateProjectImage from '@/services/projects/image/create';
import useCreateProjectScreenshots from '@/services/projects/screenshots/create';
import { convertNullToEmptyString, isAxiosError } from '@/utils';
import Form from '../form/Form';

type InformationProps = {
  project: ProjectFullResource;
};

export default function Information({ project }: InformationProps) {
  const { isOwner } = useCanEditProject(project);

  const { mutate: createImage, isPending: isImagePending } = useCreateProjectImage();
  const { mutate: createScreenshots, isPending: isScreenshotsPending } =
    useCreateProjectScreenshots();
  const { mutate: editProject, isPending: isProjectPending } = useEditProject(project.id);
  const isPending = isImagePending || isScreenshotsPending || isProjectPending;

  const isInPendingState =
    project?.status === StatusEnum.UNDER_REVIEW ||
    project?.latest_change_proposal?.status === StatusEnum.UNDER_REVIEW;

  if (isInPendingState) {
    return (
      <div className="card card-bordered bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Thank you for your contribution to Addon Stores</h2>
          <p>
            Now you just gotta wait until the reviewers review the{' '}
            {project.status === StatusEnum.UNDER_REVIEW ? 'Project' : 'Change Proposal'} and
            hopefully they will Approve it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form
      mode="edit"
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
          createImage({ image_path: values.image_path, projectId: project.id });
        }
        if (values.screenshots_path.length > 0) {
          createScreenshots({ screenshots_path: values.screenshots_path, projectId: project.id });
        }
      }}
      submit={{ text: 'Edit', isPending }}
    />
  );
}
