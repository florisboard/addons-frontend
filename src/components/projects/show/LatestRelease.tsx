import React, { useMemo, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ReleasesModal, { modalId } from '@/components/releases/ReleasesModal';
import { ReleaseFullResource } from '@/generated';
import EmptyList from '@/shared/EmptyList';
import Button from '@/shared/forms/Button';
import Markdown from '@/shared/forms/Markdown';
import Download from '@/shared/releases/Download';
import { cn, formatNumber, openModal } from '@/utils';

type LatestReleaseProps = {
  latestRelease: ReleaseFullResource | null;
  projectTitle: string;
};

export default function LatestRelease({ latestRelease, projectTitle }: LatestReleaseProps) {
  const [hasModalOpened, setHasModalOpened] = useState(false);

  const handleOpenModal = () => {
    openModal(modalId);
    setHasModalOpened(true);
  };

  const badges = useMemo(() => {
    if (!latestRelease) return [];
    return [
      {
        name: 'downloadsCount',
        className: 'badge-accent',
        value: `Downloads : ${formatNumber(latestRelease.downloads_count)}`,
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
        value: `Version : ${latestRelease.version_name}`,
      },
    ];
  }, [latestRelease]);

  return (
    <section className="card bg-base-200 md:col-span-2 md:h-min lg:sticky lg:top-20">
      <ReleasesModal
        projectTitle={projectTitle}
        projectId={latestRelease?.project_id}
        hasModalOpened={hasModalOpened}
      />
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
            <Markdown hasViewMore className="prose-sm">
              {latestRelease?.description}
            </Markdown>
            {latestRelease && (
              <Download release={latestRelease} project={{ title: projectTitle }} />
            )}
          </>
        )}
      </div>
    </section>
  );
}
