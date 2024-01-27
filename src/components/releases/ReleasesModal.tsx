import React, { Fragment, Ref, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { IOption } from '@/interfaces';
import useReleases from '@/services/releases';
import Button from '@/shared/Button';
import ReleaseCard from '@/shared/cards/release/ReleaseCard';
import ReleaseCardSkeleton from '@/shared/cards/release/ReleaseCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';
import DialogModal from '@/shared/modals/DialogModal';
import { cn } from '@/utils';

type ReleasesModal = {
  modalRef: Ref<HTMLDialogElement>;
  hasModalOpened: boolean;
};

const filters: IOption<string>[] = [
  { label: 'Latest', value: '-id' },
  { label: 'Oldest', value: 'id' },
];

export default function ReleasesModal({ modalRef, hasModalOpened }: ReleasesModal) {
  const [orderBy, setOrderBy] = useState('latest');
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useReleases(
    {},
    hasModalOpened,
  );

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
      <div className="flex gap-4 overflow-x-auto">
        {filters.map((filter) => (
          <Button
            onClick={() => setOrderBy(filter.value)}
            className={cn('btn', { 'btn-primary': orderBy === filter.value })}
            key={filter.value}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      {isLoading && Array.from({ length: 5 }).map((_, i) => <ReleaseCardSkeleton key={i} />)}
      {data?.pages.map((page) => (
        <Fragment key={page.meta.current_page}>
          {page.data.map((release) => (
            <ReleaseCard key={release.id} {...release} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && <LoadMore onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </DialogModal>
  );
}
