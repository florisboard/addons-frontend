'use client';

import React from 'react';
import { Field, Formik, Form as FormikForm, FormikHelpers } from 'formik';
import validations from '@/fixtures/validations';
import { ProjectTypeEnum, ProjectsStorePayload } from '@/generated';
import yup from '@/libs/yup';
import Button from '@/shared/Button';
import Collapse from '@/shared/Collapse';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import FileUpload from '@/shared/forms/FileUpload';
import InputFields from '@/shared/forms/InputFields';
import MarkdownInput from '@/shared/forms/MarkdownInput';
import { cn } from '@/utils';
import CategoriesSelect from './CategoriesSelect';

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

type FormProps = {
  submit: { text: string; isPending: boolean; disabled?: boolean };
  onSubmit: (values: ProjectsStorePayload, helpers: FormikHelpers<ProjectsStorePayload>) => void;
};

export default function Form({ submit, onSubmit }: FormProps) {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
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
      }}
      onSubmit={onSubmit}
    >
      <FormikForm className="space-y-4">
        <Collapse title="Main" contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CategoriesSelect />
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
                <option disabled value="">
                  Select a type
                </option>
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
            <FieldWrapper name="image" isRequired label="Image">
              <FileUpload uploadedFileLinks={[]} acceptedFileTypes={validations.image} />
            </FieldWrapper>
            <FieldWrapper name="screenshots" isRequired label="Screenshots">
              <FileUpload
                uploadedFileLinks={[]}
                allowMultiple
                allowReorder
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
    </Formik>
  );
}