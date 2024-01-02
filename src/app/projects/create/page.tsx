'use client';

import React from 'react';
import { Field, Form, Formik } from 'formik';
import VerifyAlert from '@/components/projects/create/VerifyAlert';
import validations from '@/fixtures/validations';
import yup from '@/libs/yup';
import useMe from '@/services/users/me';
import AuthMiddleware from '@/shared/AuthMiddleware';
import Button from '@/shared/Button';
import Collapse from '@/shared/Collapse';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import FileUpload from '@/shared/forms/FileUpload';
import InputFields from '@/shared/forms/InputFields';
import MarkdownInput from '@/shared/forms/MarkdownInput';
import { cn } from '@/utils';

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(50),
  slug: validations.slug,
  package_name: validations.package_name,
});

export default function CreateProject() {
  const { data: me, isLoading } = useMe();
  const isVerified = me?.email_verified_at;

  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        {!isLoading && !isVerified && <VerifyAlert />}
        <h1 className="font-display text-3xl font-bold">Create new Project</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: '',
            slug: '',
            package_name: '',
            short_description: '',
            type: '',
            home_page: '',
            support_email: '',
            support_site: '',
            donate_site: '',
            description: '',
          }}
          onSubmit={() => {}}
        >
          <Form className="space-y-4">
            <Collapse
              title="Main"
              isOpenByDefault
              contentClassName="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <InputFields
                fields={[
                  { isRequired: true, name: 'name', label: 'Name' },
                  { isRequired: true, name: 'slug', label: 'Slug' },
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
                    <option value="extension">Extension</option>
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
              <MarkdownInput name="description" />
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
            <Button type="submit" disabled={!isVerified} className="btn btn-primary">
              Create
            </Button>
          </Form>
        </Formik>
      </div>
    </AuthMiddleware>
  );
}
