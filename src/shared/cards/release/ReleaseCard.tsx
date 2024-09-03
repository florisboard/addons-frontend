import React from 'react';
import Avatar from 'react-avatar';
import { HiArrowDownCircle, HiClock } from 'react-icons/hi2';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ReleaseFullResource } from '@/generated';
import StatusBadge from '@/shared/badges/StatusBadge';
import Markdown from '@/shared/forms/Markdown';
import Download from '@/shared/releases/Download';
import { formatNumber } from '@/utils';

type ReleaseCardProps = ReleaseFullResource & {
  projectTitle: string;
};

export default function ReleaseCard({
  id,
  user,
  version_name,
  downloads_count,
  description,
  status,
  created_at,
  projectTitle,
}: ReleaseCardProps) {
  const userLink = `/users/${user.username}`;

  const badges = [
    {
      name: 'createdAt',
      Icon: HiClock,
      value: formatDistanceToNow(created_at, { addSuffix: true }),
    },
    {
      name: 'downloadsCount',
      Icon: HiArrowDownCircle,
      value: formatNumber(downloads_count),
    },
  ];

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <Link href={userLink}>
            <Avatar round size="50" name={user.username} />
          </Link>
          <div>
            <Link href={userLink} className="font-display hover:underline">
              {user.username}
            </Link>
            <h4 className="card-title">{version_name}</h4>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-none">
          <StatusBadge showWhenApproved={false} status={status} />
          {badges.map((badge) => (
            <span key={badge.name} className="badge badge-lg min-w-fit gap-2 bg-base-300 p-3">
              <badge.Icon className="h-6 w-6" />
              {badge.value}
            </span>
          ))}
        </div>
        <Markdown hasViewMore>{description}</Markdown>
        <div className="card-actions">
          <Download release={{ id, version_name }} project={{ title: projectTitle }} />
        </div>
      </div>
    </div>
  );
}
