import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { IOption } from '@/interfaces';
import Button from '@/shared/Button';
import LoadMore from '@/shared/forms/LoadMore';
import DialogModal, { DialogModalProps } from '@/shared/modals/DialogModal';
import { cn } from '@/utils';

type ResourcesModalProps<OrderBy> = Pick<DialogModalProps, 'modalRef' | 'id' | 'children'> & {
  title: string;
  queryResult: UseInfiniteQueryResult<InfiniteData<unknown>>;
  Skeleton: React.FunctionComponent;
  sorts: {
    options: IOption<OrderBy>[];
    activeValue: OrderBy;
    setActiveValue: (value: OrderBy) => void;
  };
  filters?: {
    options: IOption<number>[];
    activeValue: number;
    setActiveValue: (value: number) => void;
  };
};

export default function ResourcesModal<OrderBy>({
  modalRef,
  id,
  children,
  title,
  Skeleton,
  queryResult,
  filters,
  sorts,
}: ResourcesModalProps<OrderBy>) {
  const { isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = queryResult;

  return (
    <DialogModal
      dialogClassName="modal-bottom"
      parentClassName="w-full h-full"
      closeOnClickOutside
      modalRef={modalRef}
      id={id}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h4 className="font-display text-2xl font-bold md:text-3xl">{title}</h4>
        <Button className="btn btn-circle btn-sm md:btn-md" type="submit">
          <HiXMark className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 overflow-x-auto md:flex-row">
        <div className="flex gap-4 overflow-x-auto scrollbar-none">
          {sorts.options.map((sort) => (
            <Button
              onClick={() => sorts.setActiveValue(sort.value)}
              className={cn('btn', { 'btn-primary': sorts.activeValue === sort.value })}
              key={sort.value as string}
            >
              {sort.label}
            </Button>
          ))}
        </div>
        {filters && <div className="divider divider-horizontal hidden md:flex" />}
        <div className="flex gap-4 overflow-x-auto scrollbar-none">
          {filters?.options.map((filter) => (
            <Button
              onClick={() => filters!.setActiveValue(filter.value)}
              className={cn('btn', { 'btn-primary': filters!.activeValue === filter.value })}
              key={filter.value}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
      {isLoading && Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)}
      {children}
      {hasNextPage && <LoadMore onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </DialogModal>
  );
}
