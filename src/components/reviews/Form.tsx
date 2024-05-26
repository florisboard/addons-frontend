import React from 'react';
import { Field, Formik, Form as FormikForm, FormikHelpers } from 'formik';
import validations from '@/fixtures/forms/validations';
import { ProjectsReviewsStorePayload } from '@/generated';
import yup from '@/libs/yup';
import Button from '@/shared/forms/Button';
import { InputLists } from '@/shared/forms/Input';
import Textarea from '@/shared/forms/Textarea';

const validationSchema = yup.object<ProjectsReviewsStorePayload>({
  title: validations.title,
  description: validations.description,
  score: yup.number().min(1).max(5).required(),
});

type FormProps = {
  onCancel: () => void;
  isPending: boolean;
  initialValues: ProjectsReviewsStorePayload;
  onSubmit: (
    values: ProjectsReviewsStorePayload,
    helpers: FormikHelpers<ProjectsReviewsStorePayload>,
  ) => void;
};

export default function Form({ onCancel, onSubmit, isPending, initialValues }: FormProps) {
  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <FormikForm className="space-y-4">
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
        <InputLists fields={[{ isRequired: true, name: 'title', label: 'Title' }]} />
        <Textarea name="description" isRequired label="Description" />
        <div className="flex gap-4">
          <Button onClick={onCancel} type="button" className="btn">
            Cancel
          </Button>
          <Button
            isLoading={isPending}
            disabled={isPending}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </Button>
        </div>
      </FormikForm>
    </Formik>
  );
}
