import React from 'react';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import capitalize from 'lodash/capitalize';
import { useMutation } from '@tanstack/react-query';
import { ReportTypeEnum, ReviewsReportsStorePayload } from '@/generated';
import api from '@/libs/api';
import yup from '@/libs/yup';
import Button from '@/shared/forms/Button';
import Select from '@/shared/forms/Select';
import Textarea from '@/shared/forms/Textarea';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal } from '@/utils';

export type TReportable = { id: number; title: string; resource: 'projects' | 'reviews' };

type ReportModalProps = {
  reportable: TReportable;
};

function enumToTitle(key: string) {
  return capitalize(key).replaceAll('_', ' ');
}

export function generateReportModalId({ resource, id }: TReportable) {
  return `report-${resource}#${id}`;
}

const validationSchema = yup.object({
  type: yup.string().oneOf(Object.keys(ReportTypeEnum)).required(),
  description: yup.string().min(3).max(2024).required(),
});

export default function ReportModal({ reportable }: ReportModalProps) {
  const modalId = generateReportModalId(reportable);
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ReviewsReportsStorePayload) => {
      await api.http.instance.post(`v1/${reportable.resource}/${reportable.id}/reports`, values);
    },
  });

  return (
    <DialogModal parentElement="div" id={modalId}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ type: '', description: '' }}
        onSubmit={(values, { resetForm }) => {
          mutate(
            { ...values, type: values.type as ReportTypeEnum },
            {
              onSuccess: () => {
                toast.success(`You've successfully reported ${reportable.title}`);
                resetForm();
                closeModal(modalId);
              },
            },
          );
        }}
      >
        {({ errors }) => (
          <Form className="space-y-4">
            <h3 className="text-2xl font-bold">
              Report <span className="text-secondary">{reportable.title}</span>
            </h3>
            <Select
              isRequired
              name="type"
              label="Type"
              options={(Object.keys(ReportTypeEnum) as Array<keyof typeof ReportTypeEnum>).map(
                (value) => ({ value, label: enumToTitle(value) }),
              )}
            />
            <Textarea isRequired name="description" label="Description" />
            <div className="flex items-center gap-4">
              <Button className="btn" onClick={() => closeModal(modalId)}>
                Cancel
              </Button>
              <Button
                isLoading={isPending}
                disabled={isPending}
                type="submit"
                className="btn btn-primary"
              >
                Report
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </DialogModal>
  );
}
