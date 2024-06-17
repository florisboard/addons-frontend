import React, { Fragment, Ref, useState } from 'react';
import { ReleasesIndexParams } from '@/generated';
import { IOption } from '@/interfaces';
import useReleases from '@/services/releases';
import ReleaseCard from '@/shared/cards/release/ReleaseCard';
import ReleaseCardSkeleton from '@/shared/cards/release/ReleaseCardSkeleton';
import ResourcesModal from '../projects/show/ResourcesModal';

type ReleasesModalProps = {
  hasModalOpened: boolean;
  projectId: number | undefined;
  projectTitle: string;
};

export const modalId = 'releases';

type TSort = ReleasesIndexParams['sort'];

const sorts: IOption<TSort>[] = [
  { label: 'Latest', value: '-id' },
  { label: 'Oldest', value: 'id' },
];

export default function ReleasesModal({
  hasModalOpened,
  projectTitle,
  projectId,
}: ReleasesModalProps) {
  const [orderBy, setOrderBy] = useState<TSort>(sorts.at(0)?.value);
  const queryResult = useReleases(
    { filter: { project_id: projectId }, sort: orderBy },
    hasModalOpened,
  );

  const { isLoading, data } = queryResult;

  return (
    <ResourcesModal<TSort>
      Skeleton={ReleaseCardSkeleton}
      queryResult={queryResult}
      title="Project Releases"
      id={modalId}
      sorts={{ options: sorts, activeValue: orderBy, setActiveValue: setOrderBy }}
    >
      {isLoading && Array.from({ length: 5 }).map((_, i) => <ReleaseCardSkeleton key={i} />)}
      {data?.pages.map((page) => (
        <Fragment key={page.meta.current_page}>
          {page.data.map((release) => (
            <ReleaseCard projectTitle={projectTitle} key={release.id} {...release} />
          ))}
        </Fragment>
      ))}
    </ResourcesModal>
  );
}
