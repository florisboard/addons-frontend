import React from 'react';
import { ProjectFullResource } from '@/generated';
import Button from '@/shared/forms/Button';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal, openModal } from '@/utils';
import { TSubmit, formId } from './Form';

type DeleteProps = {
  project: ProjectFullResource | undefined;
  submit: TSubmit;
};

const modalId = 'projects/edit';

export default function Submit({ project, submit }: DeleteProps) {
  const handleEdit = () => {
    closeModal(modalId);
    (document.getElementById(formId) as HTMLFormElement).requestSubmit();
  };

  return (
    <>
      <DialogModal parentElement="div" closeOnClickOutside id={modalId}>
        <h3 className="text-2xl font-bold">
          Edit <span className="text-primary">{project?.title}</span>
        </h3>
        <p className="text-base-content/80">Are you sure you want to perform this action?</p>
        <div className="flex items-center gap-4">
          <Button type="button" onClick={() => closeModal(modalId)} className="btn">
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            disabled={submit.isPending}
            isLoading={submit.isPending}
            className="btn btn-primary"
          >
            {submit.text}
          </Button>
        </div>
      </DialogModal>
      <Button
        onClick={() => project && openModal(modalId)}
        type={project ? 'button' : 'submit'}
        disabled={submit.disabled || submit.isPending}
        isLoading={submit.isPending}
        className="btn btn-primary"
      >
        {submit.text}
      </Button>
    </>
  );
}
