import React, { Fragment, Ref } from 'react';
import { HiXMark } from 'react-icons/hi2';
import useReleases from '@/services/releases';
import Button from '@/shared/Button';
import DialogModal from '@/shared/modals/DialogModal';

type ReleasesModal = {
  modalRef: Ref<HTMLDialogElement>;
};

export default function ReleasesModal({ modalRef }: ReleasesModal) {
  const { data } = useReleases();

  return (
    <DialogModal
      dialogClassName="modal-bottom"
      parentClassName="w-full h-full"
      closeOnClickOutside
      modalRef={modalRef}
      id="releases"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h4 className="font-display text-2xl font-bold md:text-3xl">Latest Releases</h4>
        <Button className="btn btn-circle btn-sm md:btn-md" type="submit">
          <HiXMark className="h-6 w-6" />
        </Button>
      </div>
      {data?.pages.map((page) => (
        <Fragment key={page.meta.current_page}>
          {page.data.map((release) => (
            <p key={release.id}>Release</p>
          ))}
        </Fragment>
      ))}
    </DialogModal>
  );
}
