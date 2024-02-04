import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import ReleasesModal from '@/components/releases/ReleasesModal';
import { ReleaseFullResource } from '@/generated';
import { useDialogModal } from '@/hooks';
import Button from '@/shared/Button';
import EmptyList from '@/shared/EmptyList';
import Download from '@/shared/releases/Download';
import { cn, humanReadableFormatter } from '@/utils';

type LatestReleaseProps = {
  latestRelease: ReleaseFullResource | null;
};

export default function LatestRelease({ latestRelease }: LatestReleaseProps) {
  const { modalRef, handleOpenModal, handleCloseModal } = useDialogModal();

  const badges = useMemo(() => {
    if (!latestRelease) return [];
    return [
      {
        name: 'downloadsCount',
        className: 'badge-accent',
        value: `Downloads : ${humanReadableFormatter.format(latestRelease.downloads_count)}`,
      },
      {
        name: 'releasedAt',
        className: 'badge-secondary',
        value: `Released At : ${formatDistanceToNow(latestRelease.created_at, {
          addSuffix: true,
        })}`,
      },
      {
        name: 'version',
        className: 'badge-primary',
        value: `Version : ${latestRelease.version}`,
      },
    ];
  }, [latestRelease]);

  return (
    <section className="card bg-base-200 md:col-span-2 md:h-min lg:sticky lg:top-20">
      <ReleasesModal modalRef={modalRef} />
      <div className="card-body gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="card-title font-display text-2xl">Release</h2>
          {latestRelease && (
            <Button onClick={handleOpenModal} className="btn btn-link btn-md no-underline">
              All Releases
            </Button>
          )}
        </div>
        <div className="divider" />
        {!latestRelease && <EmptyList />}
        {latestRelease && (
          <>
            <div className="flex flex-wrap items-center gap-4">
              {badges.map((badge) => (
                <div className={cn('badge', badge.className)} key={badge.name}>
                  {badge.value}
                </div>
              ))}
            </div>
            <Markdown className="prose prose-sm line-clamp-[12]">
              {latestRelease?.description}
            </Markdown>
            <Download />
          </>
        )}
      </div>
    </section>
  );
}
