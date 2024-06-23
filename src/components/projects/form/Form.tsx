'use client';

import React from 'react';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import compact from 'lodash/compact';
import validations from '@/fixtures/forms/validations';
import { ProjectFullResource, ProjectTypeEnum, ProjectsStorePayload } from '@/generated';
import yup from '@/libs/yup';
import useDeleteProjectImage from '@/services/projects/image/delete';
import useDeleteProjectScreenshots from '@/services/projects/screenshots/delete';
import Collapse from '@/shared/Collapse';
import Button from '@/shared/forms/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import FileUpload from '@/shared/forms/FileUpload';
import Input, { InputLists } from '@/shared/forms/Input';
import MarkdownInput from '@/shared/forms/MarkdownInput';
import Select from '@/shared/forms/Select';
import Textarea from '@/shared/forms/Textarea';
import { createPackageName } from '@/utils';
import CategoriesSelect from './CategoriesSelect';
import DomainsSelect from './DomainsSelect';
import MaintainersSelect from './MaintainersSelect';

export type TProjectValues = ProjectsStorePayload & {
  image_path: string;
  screenshots_path: string[];
  domain_name: string;
};

type FormProps = {
  submit: { text: string; isPending: boolean; disabled?: boolean };
  onSubmit: (values: TProjectValues, helpers: FormikHelpers<TProjectValues>) => void;
  initialValues?: Partial<TProjectValues>;
  project?: ProjectFullResource;
  isOwner: boolean;
  mode: 'create' | 'edit';
};

const validationSchema = yup.object<ProjectsStorePayload>({
  category_id: yup.number().required().min(1),
  title: yup.string().required().min(3).max(50),
  package_name: validations.slug,
  short_description: yup.string().required().min(3).max(255),
  type: yup.string().required().oneOf([ProjectTypeEnum.EXTENSION]),
  links: yup.object({
    source_code: validations.url.test(
      'isGithubUrl',
      'This field must start with https://github.com',
      (value: any) => Boolean(value) && value?.startsWith('https://github.com'),
    ),
  }),
  description: yup.string().required().min(3).max(2024),
});

export default function Form({
  submit,
  mode,
  onSubmit,
  initialValues,
  project,
  isOwner,
}: FormProps) {
  const { mutate: deleteImage } = useDeleteProjectImage();
  const { mutate: deleteScreenshot } = useDeleteProjectScreenshots();

  const handleDeleteImage = () => {
    if (project?.image) {
      deleteImage(project.id);
    }
  };

  const handleDeleteScreenshot = (mediaId: number) => {
    if (project?.screenshots) {
      deleteScreenshot({ projectId: project.id, mediaId });
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={
        {
          category_id: 0,
          title: '',
          package_name: '',
          short_description: '',
          type: ProjectTypeEnum.EXTENSION,
          description: '',
          links: { source_code: '' },
          image_path: '',
          screenshots_path: [],
          maintainers: [],
          domain_name: '',
          ...initialValues,
        } as TProjectValues
      }
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, errors }) => (
        <FormikForm className="space-y-4">
          <Collapse title="Main" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CategoriesSelect
              defaultValue={
                project?.category && { label: project.category.title, value: project.category_id }
              }
            />
            {isOwner && (
              <MaintainersSelect
                ownerId={project?.user_id}
                defaultValue={project?.maintainers.map((user) => ({
                  label: user.username,
                  value: user.id,
                }))}
              />
            )}
            <InputLists fields={[{ isRequired: true, name: 'title', label: 'Title' }]} />
            <Select
              label="Type"
              name="type"
              isRequired
              options={Object.values(ProjectTypeEnum).map((option) => ({
                label: option,
                value: option,
              }))}
            />
            <Textarea
              className="col-span-full"
              name="short_description"
              label="Short Description"
              isRequired
            />
          </Collapse>
          {mode === 'create' && (
            <Collapse
              title={'Package Name: ' + createPackageName(values.domain_name, values.package_name)}
              contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <DomainsSelect />
              <Input isRequired name="package_name" label="Package Name" />
            </Collapse>
          )}
          <Collapse title="Links" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputLists
              fields={[{ isRequired: true, name: 'links.source_code', label: 'Source Code' }]}
            />
          </Collapse>
          <Collapse title="Description">
            <FieldWrapper name="description" isRequired={false} label="">
              {({ name }) => <MarkdownInput name={name} />}
            </FieldWrapper>
          </Collapse>
          <Collapse title="Images" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
            <>
              <FieldWrapper name="image_path" isRequired label="Image">
                <FileUpload
                  required
                  onremovefile={handleDeleteImage}
                  onFileUploadedState={(paths) => setFieldValue('image_path', paths.at(0))}
                  uploadedFileLinks={compact([project?.image])}
                  acceptedFileTypes={validations.image}
                />
              </FieldWrapper>
              <FieldWrapper name="screenshots" isRequired label="Screenshots">
                <FileUpload
                  onremovefile={(_, file) => handleDeleteScreenshot(file.getMetadata().id)}
                  uploadedFileLinks={compact(project?.screenshots)}
                  allowMultiple
                  allowReorder
                  maxFiles={5}
                  onFileUploadedState={(paths) => setFieldValue('screenshots_path', paths)}
                  acceptedFileTypes={validations.image}
                />
              </FieldWrapper>
            </>
          </Collapse>
          <Button
            type="submit"
            isLoading={submit.isPending}
            disabled={submit.disabled || submit.isPending}
            className="btn btn-primary"
          >
            {submit.text}
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}
