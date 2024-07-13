import React from 'react';
import { ProjectFullResource, StatusEnum } from '@/generated';
import usePublishProject from '@/services/projects/publish';
import Button from '@/shared/forms/Button';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal, openModal } from '@/utils';

type PublishProps = {
  project: ProjectFullResource;
};

const modalId = 'projects/publish';

export default function Publish({ project }: PublishProps) {
  const { mutate: publish, isPending } = usePublishProject(project.id);

  const handlePublish = () => {
    publish();
  };

  if (project.status !== StatusEnum.DRAFT) return null;

  return (
    <>
      <DialogModal parentElement="div" closeOnClickOutside id={modalId}>
        <h3 className="text-2xl font-bold">
          Publish <span className="text-secondary">{project.title}</span>
        </h3>
        <p className="text-base-content/80">Are you sure you want to perform this action?</p>
        <div className="flex items-center gap-4">
          <Button type="button" onClick={() => closeModal(modalId)} className="btn">
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPending}
            isLoading={isPending}
            className="btn btn-secondary"
          >
            Publish
          </Button>
        </div>
      </DialogModal>
      <Button
        onClick={() => openModal(modalId)}
        type="button"
        disabled={isPending}
        isLoading={isPending}
        className="btn btn-secondary"
      >
        Publish
      </Button>
    </>
  );
}
