import React from 'react';
import { useRouter } from 'next/navigation';
import { ProjectFullResource, StatusEnum } from '@/generated';
import useDeleteProject from '@/services/projects/delete';
import Button from '@/shared/forms/Button';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal, openModal } from '@/utils';

type DeleteProps = {
  project: ProjectFullResource;
};

const modalId = 'projects/delete';

export default function Delete({ project }: DeleteProps) {
  const { mutate: deleteProject, isPending } = useDeleteProject(project.id);
  const router = useRouter();

  const handleDelete = () => {
    deleteProject(undefined, {
      onSuccess: () => {
        router.replace('/');
      },
    });
  };

  if (project.status !== StatusEnum.DRAFT) return null;

  return (
    <>
      <DialogModal parentElement="div" closeOnClickOutside id={modalId}>
        <h3 className="text-2xl font-bold">
          Delete <span className="text-error">{project.title}</span>
        </h3>
        <p className="text-base-content/80">Are you sure you want to perform this action?</p>
        <div className="flex items-center gap-4">
          <Button type="button" onClick={() => closeModal(modalId)} className="btn">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            isLoading={isPending}
            className="btn btn-error"
          >
            Delete
          </Button>
        </div>
      </DialogModal>
      <Button
        onClick={() => openModal(modalId)}
        type="button"
        disabled={isPending}
        isLoading={isPending}
        className="btn btn-error ms-auto"
      >
        Delete
      </Button>
    </>
  );
}
