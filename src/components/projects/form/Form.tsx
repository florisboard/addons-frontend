'use client';

import React, { useState } from 'react';
import { FilePondFile } from 'filepond';
import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import compact from 'lodash/compact';
import validations from '@/fixtures/forms/validations';
import { ProjectFullResource, ProjectTypeEnum, ProjectsStorePayload } from '@/generated';
import yup from '@/libs/yup';
import useDeleteProjectScreenshots from '@/services/projects/screenshots/delete';
import useMe from '@/services/users/me';
import Collapse from '@/shared/Collapse';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import FileUpload, { TFiles } from '@/shared/forms/FileUpload';
import Input, { InputLists } from '@/shared/forms/Input';
import MarkdownInput from '@/shared/forms/MarkdownInput';
import Select from '@/shared/forms/Select';
import Textarea from '@/shared/forms/Textarea';
import { createPackageName } from '@/utils';
import Alerts from './Alerts';
import CategoriesSelect from './CategoriesSelect';
import Delete from './Delete';
import DomainsSelect from './DomainsSelect';
import MaintainersSelect from './MaintainersSelect';
import Publish from './Publish';
import Submit from './Submit';

export type TProjectValues = Omit<ProjectsStorePayload, 'verified_domain_id'> & {
  image_path: string;
  screenshots_path: string[];
  domain_name: string;
};

export type TSubmit = { text: string; isPending: boolean; disabled?: boolean };

export const formId = 'project/form';

type FormProps = {
  submit: TSubmit;
  onSubmit: (values: TProjectValues, helpers: FormikHelpers<TProjectValues>) => void;
  initialValues?: Partial<TProjectValues>;
  project?: ProjectFullResource;
  isOwner: boolean;
  mode: 'create' | 'edit';
};

const validationSchema = yup.object<ProjectsStorePayload>({
  category_id: yup.number().required().min(1),
  title: yup.string().required().min(3).max(50),
  package_name: yup
    .string()
    .min(2)
    .max(255)
    .matches(/^[a-z][a-z0-9_]*(\.[a-z0-9][a-z0-9_]*)*$/)
    .required(),
  short_description: yup.string().required().min(3).max(255),
  type: yup.string().required().oneOf([ProjectTypeEnum.THEME]),
  links: yup.object({ source_code: validations.url }),
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
  const { mutate: deleteScreenshot } = useDeleteProjectScreenshots();
  const [screenshots, setScreenshots] = useState<TFiles>(
    compact(
      project?.screenshots.map((link) => ({
        source: link.url,
        options: { type: 'local', metadata: { poster: link.url, id: link.id } },
      })),
    ),
  );
  const { data: me } = useMe();

  const handleDeleteScreenshot = (mediaId: number) => {
    console.log(mediaId);
    // if (project?.screenshots) {
    //   deleteScreenshot({ projectId: project.id, mediaId });
    // }
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
          type: ProjectTypeEnum.THEME,
          description: '',
          links: { source_code: '' },
          image_path: '',
          screenshots_path: [],
          maintainers: [],
          domain_name: '',
          ...initialValues,
        } as TProjectValues
      }
      onSubmit={(values, helpers) => {
        const newScreenshots = (screenshots as (FilePondFile | undefined)[])
          .map((screenshot) => screenshot?.serverId)
          .filter((value) => value && value.startsWith('tmp/'));

        onSubmit({ ...values, screenshots_path: newScreenshots as string[] }, helpers);
      }}
    >
      {({ setFieldValue, values }) => (
        <FormikForm id={formId} className="space-y-4">
          <Alerts project={project} />
          <Collapse title="Main" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <CategoriesSelect
              defaultValue={
                project?.category && {
                  label: project.category.title,
                  value: project.category_id,
                }
              }
            />
            {isOwner && (
              <MaintainersSelect
                ownerId={project?.user_id ?? me?.id}
                defaultValue={project?.maintainers.map((user) => ({
                  label: user.username,
                  value: user.id,
                }))}
              />
            )}
            <Textarea
              className="col-span-full"
              name="short_description"
              label="Short Description"
              isRequired
            />
          </Collapse>
          {mode === 'create' && (
            <Collapse title="Package Name" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DomainsSelect />
              <Input
                bottomLabel={{
                  left: `Final Package Name : ${createPackageName(values.domain_name, values.package_name)}`,
                }}
                isRequired
                name="package_name"
                label="Package Name"
              />
            </Collapse>
          )}
          <Collapse title="Links" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputLists
              fields={[{ isRequired: true, name: 'links.source_code', label: 'Source Code' }]}
            />
          </Collapse>
          <Collapse title="Description (Supports Markdown)">
            <FieldWrapper name="description" isRequired={false} label="">
              {({ name }) => <MarkdownInput name={name} />}
            </FieldWrapper>
          </Collapse>
          <Collapse title="Images" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
            <>
              {/* <FieldWrapper name="image_path" isRequired label="Image">
                <FileUpload
                  required
                  name="image_path"
                  onUploaded={(paths) => setFieldValue('image_path', paths.at(-1))}
                  uploadedFiles={compact([project?.image])}
                  acceptedFileTypes={validations.image}
                />
              </FieldWrapper> */}
              <FieldWrapper name="screenshots" isRequired={false} label="Screenshots">
                <FileUpload
                  name="screenshots"
                  initialFiles={screenshots}
                  setFiles={setScreenshots}
                  allowMultiple
                  allowReorder
                  maxFiles={5}
                  // onFilesChange={(files) => {
                  //   const tmpPaths = files
                  //     .map((file) => file?.serverId)
                  //     .filter((value) => value && value.startsWith('tmp/'));

                  //   console.log(files, tmpPaths);
                  //   setFieldValue('screenshots_path', tmpPaths);
                  // }}
                  // onUploaded={(paths) => setFieldValue('screenshots_path', paths)}
                  acceptedFileTypes={validations.image}
                />
              </FieldWrapper>
            </>
          </Collapse>
          <div className="flex flex-wrap items-center gap-4">
            <Submit submit={submit} project={project} />
            {project && <Publish project={project} />}
            {project && <Delete project={project} />}
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}
