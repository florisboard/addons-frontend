import React from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import validations from '@/fixtures/validations';
import yup from '@/libs/yup';
import Button from '@/shared/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import InputFields from '@/shared/forms/InputFields';
import { cn } from '@/utils';

const validationSchema = yup.object({
  title: validations.title,
  description: validations.description,
  is_anonymous: yup.boolean().required(),
  score: yup.number().min(1).max(5).required(),
});

export default function Form() {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ score: 5, is_anonymous: true, title: '', description: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <FormikForm className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Field
                key={i}
                value={`${i + 1}`}
                type="radio"
                name="score"
                className="mask mask-star-2 bg-orange-400"
              />
            ))}
          </div>
          <FieldWrapper
            className="flex-row items-center gap-2"
            isRequired={false}
            name="is_anonymous"
            label="Anonymous"
          >
            {({ hasError, ...props }) => (
              <Field {...props} className="toggle toggle-primary" type="checkbox" />
            )}
          </FieldWrapper>
        </div>
        <InputFields fields={[{ isRequired: true, name: 'title', label: 'Title' }]} />
        <FieldWrapper name="description" isRequired={true} label="Description">
          {({ hasError, ...props }) => (
            <Field
              {...props}
              className={cn('textarea textarea-bordered w-full', { 'textarea-error': hasError })}
              as="textarea"
            />
          )}
        </FieldWrapper>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </FormikForm>
    </Formik>
  );
}
