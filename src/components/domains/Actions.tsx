import React from 'react';
import { HiOutlineCheckCircle, HiOutlineClipboard, HiOutlineTrash } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { DomainResource } from '@/generated';
import useDeleteDomain from '@/services/domains/delete';
import useVerifyDomain from '@/services/domains/verify';
import Button from '@/shared/forms/Button';
import DialogModal from '@/shared/modals/DialogModal';
import { closeModal, copyTextToClipboard, openModal } from '@/utils';

type ActionsProps = {
  domain: DomainResource;
};

export default function Actions({ domain }: ActionsProps) {
  const deleteModalId = `domains/delete#${domain.id}`;
  const { mutate: deleteDomain, isPending: isDeleting } = useDeleteDomain();
  const { mutateAsync: verifyDomain, isPending: isVerifying } = useVerifyDomain();

  const handleCopy = async () => {
    await copyTextToClipboard(domain.verification_text);
    toast.success('Verification Text copied successfully.');
  };

  const handleDelete = () => {
    deleteDomain(domain.id, { onSuccess: () => closeModal(deleteModalId) });
  };

  const handleVerify = () => {
    toast.promise(verifyDomain(domain.id), {
      pending: 'Verifying domain ...',
      success: `${domain.name} has been verified successfully.`,
      error: "Couldn't verify the domain please try again later.",
    });
  };

  const actions = [
    {
      title: 'Copy Verification Text',
      Icon: HiOutlineClipboard,
      isActive: true,
      onClick: handleCopy,
    },
    {
      title: 'Verify Domain',
      Icon: HiOutlineCheckCircle,
      isActive: !domain.verified_at,
      onClick: handleVerify,
      isLoading: isVerifying,
    },
    {
      title: 'Delete Domain',
      Icon: HiOutlineTrash,
      isActive: !domain.is_reserved,
      onClick: () => openModal(deleteModalId),
    },
  ].filter((action) => action.isActive);

  return (
    <td className="min-w-36">
      <DialogModal id={deleteModalId} closeOnClickOutside>
        <h3 className="text-2xl font-bold">
          Delete <span className="text-primary">{domain.name}</span>
        </h3>
        <p className="text-base-content/80">Are you sure you want to perform this action?</p>
        <div className="flex items-center gap-4">
          <Button type="submit" className="btn">
            Cancel
          </Button>
          <Button
            disabled={isDeleting}
            isLoading={isDeleting}
            onClick={handleDelete}
            className="btn btn-error"
          >
            Delete
          </Button>
        </div>
      </DialogModal>
      {actions.map((action) => (
        <div key={action.title} data-tip={action.title} className="tooltip tooltip-secondary">
          <Button
            isLoading={action.isLoading}
            disabled={action.isLoading}
            onClick={action.onClick}
            className="btn btn-circle btn-ghost btn-sm"
          >
            <action.Icon className="h-6 w-6" />
          </Button>
        </div>
      ))}
    </td>
  );
}
