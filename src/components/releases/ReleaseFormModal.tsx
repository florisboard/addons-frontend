import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import capitalize from 'lodash/capitalize';
import { ProjectsReleasesStorePayload } from '@/generated';
import yup from '@/libs/yup';
import Button from '@/shared/forms/Button';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import FileUpload from '@/shared/forms/FileUpload';
import Input from '@/shared/forms/Input';
import Textarea from '@/shared/forms/Textarea';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal } from '@/utils';

type ReleaseFormModalProps = {
  type: 'create' | 'edit';
  isPending: boolean;
  onSubmit: (
    values: ProjectsReleasesStorePayload,
    helpers: FormikHelpers<ProjectsReleasesStorePayload>,
  ) => void;
};

export const modalId = 'releaseFormModal';

const validationSchema = yup.object<ProjectsReleasesStorePayload>({
  version_name: yup
    .string()
    .matches(/^\d+(?:\.\d+){2}$/)
    .required(),
  description: yup.string().required().min(3).max(1024),
});

export default function ReleaseFormModal({ type, isPending, onSubmit }: ReleaseFormModalProps) {
  return (
    <DialogModal
      parentClassName="h-4/5"
      parentElement="div"
      dialogClassName="modal-bottom md:modal-middle"
      id={modalId}
    >
      <h3 className="font-display text-2xl font-bold md:text-3xl">{capitalize(type)} Release</h3>
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={{ version_name: '', description: '', file_path: '' }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <Textarea isRequired name="description" label="Description" />
            {type === 'create' && (
              <>
                <Input
                  attributes={{ placeholder: '1.0.0' }}
                  isRequired
                  name="version_name"
                  label="Version"
                />
                <FieldWrapper name="file_path" isRequired label="File">
                  <FileUpload
                    required
                    uploadedFileLinks={[]}
                    onFileUploadedState={(paths) => setFieldValue('file_path', paths.at(-1))}
                  />
                </FieldWrapper>
              </>
            )}
            <div className="flex items-center gap-4">
              <Button onClick={() => closeModal(modalId)} className="btn">
                Cancel
              </Button>
              <Button
                disabled={isPending}
                isLoading={isPending}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </DialogModal>
  );
}
