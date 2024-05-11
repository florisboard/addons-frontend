import React, { Fragment } from 'react';
import useReleases from '@/services/releases';
import ReleaseCard from '@/shared/cards/release/ReleaseCard';
import ReleaseCardSkeleton from '@/shared/cards/release/ReleaseCardSkeleton';
import LoadMore from '@/shared/forms/LoadMore';

type ReleasesProps = {
  project: { id: number; title: string };
};

export default function Releases({ project }: ReleasesProps) {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useReleases({
    filter: { project_id: project.id },
  });

  return (
    <>
      {isLoading && Array.from({ length: 5 }).map((_, i) => <ReleaseCardSkeleton key={i} />)}
      {data?.pages.map((page) => (
        <Fragment key={page.meta.current_page}>
          {page.data.map((release) => (
            <ReleaseCard projectTitle={project.title} key={release.id} {...release} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && <LoadMore onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </>
  );
}
