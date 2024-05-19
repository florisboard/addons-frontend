'use client';

import React from 'react';
import { Field, Formik, Form as FormikForm, FormikHelpers } from 'formik';
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
import InputFields from '@/shared/forms/InputFields';
import MarkdownInput from '@/shared/forms/MarkdownInput';
import { cn } from '@/utils';
import CategoriesSelect from './CategoriesSelect';
import MaintainersSelect from './MaintainersSelect';

export type TProjectValues = ProjectsStorePayload & {
  image_path: string;
  screenshots_path: string[];
};

type FormProps = {
  submit: { text: string; isPending: boolean; disabled?: boolean };
  onSubmit: (values: TProjectValues, helpers: FormikHelpers<TProjectValues>) => void;
  initialValues?: Partial<TProjectValues>;
  project?: ProjectFullResource;
  isOwner: boolean;
};

const validationSchema = yup.object<ProjectsStorePayload>({
  category_id: yup.number().required().min(1),
  name: yup.string().required().min(3).max(50),
  package_name: validations.package_name,
  short_description: yup.string().required().min(3).max(255),
  type: yup.string().required().oneOf([ProjectTypeEnum.EXTENSION]),
  home_page: validations.url,
  support_email: validations.email.notRequired(),
  support_site: validations.url,
  donate_site: validations.url,
  description: yup.string().required().min(3).max(2024),
});

export default function Form({ submit, onSubmit, initialValues, project, isOwner }: FormProps) {
  const { mutate: deleteImage } = useDeleteProjectImage();
  const { mutate: deleteScreenshot } = useDeleteProjectScreenshots();

  const handleDeleteImage = () => {
    if (project?.image) {
      deleteImage(project.id);
    }
  };

  const handleDeleteScreenshot = (mediaId: number) => {
    if (project?.screenshots) {
      console.log(mediaId);
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
          name: '',
          package_name: '',
          short_description: '',
          type: ProjectTypeEnum.EXTENSION,
          home_page: '',
          support_email: '',
          support_site: '',
          donate_site: '',
          description: '',
          image_path: '',
          screenshots_path: [],
          maintainers: [],
          ...initialValues,
        } as TProjectValues
      }
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
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
            <InputFields
              fields={[
                { isRequired: true, name: 'name', label: 'Name' },
                { isRequired: true, name: 'package_name', label: 'Package Name' },
                { isRequired: true, name: 'short_description', label: 'Short Description' },
              ]}
            />
            <FieldWrapper label="Type" isRequired name="type">
              {({ hasError, ...props }) => (
                <Field
                  {...props}
                  as="select"
                  className={cn('select select-bordered w-full', { 'select-error': hasError })}
                >
                  {Object.values(ProjectTypeEnum).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Field>
              )}
            </FieldWrapper>
          </Collapse>
          <Collapse title="Links" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputFields
              fields={[
                { isRequired: false, name: 'home_page', label: 'Home Page' },
                { isRequired: false, name: 'support_email', label: 'Support Email' },
                { isRequired: false, name: 'support_site', label: 'Support Site' },
                { isRequired: false, name: 'donate_site', label: 'Donate Site' },
              ]}
            />
          </Collapse>
          <Collapse title="Description">
            <FieldWrapper name="description" isRequired={false} label="">
              {({ name }) => <MarkdownInput name={name} />}
            </FieldWrapper>
          </Collapse>
          <Collapse title="Images" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
            <>
              <FieldWrapper name="image_path" isRequired={false} label="Image">
                <FileUpload
                  required
                  onremovefile={handleDeleteImage}
                  onFileUploadedState={(paths) => setFieldValue('image_path', paths.at(0))}
                  uploadedFileLinks={compact([project?.image])}
                  acceptedFileTypes={validations.image}
                />
              </FieldWrapper>
              <FieldWrapper name="screenshots" isRequired={false} label="Screenshots">
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
