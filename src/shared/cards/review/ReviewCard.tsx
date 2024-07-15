import React from 'react';
import Avatar from 'react-avatar';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import ReportModal, { TReportable, generateReportModalId } from '@/components/ReportModal';
import Options from '@/components/reviews/Options';
import { ReviewResource } from '@/generated';
import useMe from '@/services/users/me';
import StatusBadge from '@/shared/badges/StatusBadge';
import { cn, openModal } from '@/utils';

type ReviewCardProps = ReviewResource & {
  onEdit?: () => void;
  hasOptions?: boolean;
  showStatus?: boolean;
  cardClassName?: string;
};

export default function ReviewCard({
  id,
  user,
  score,
  updated_at,
  title,
  status,
  description,
  onEdit,
  hasOptions = true,
  cardClassName,
  showStatus,
}: ReviewCardProps) {
  const { data: me } = useMe();

  const username = user?.username;
  const userLink = `/users/${user?.username}`;
  const reportable: TReportable = { resource: 'reviews', id, title };
  const optionsProps = {
    reviewId: id,
    isOwner: me?.username === user?.username,
    onEdit,
    onReport: () => openModal(generateReportModalId(reportable)),
  };

  return (
    <div className={cn('card bg-base-300', cardClassName)}>
      <ReportModal reportable={reportable} />
      <div className="card-body">
        <div className="flex items-center gap-4">
          <Link href={userLink}>
            <Avatar textSizeRatio={3} size="50" round name={username} />
          </Link>
          <div className="w-full">
            <div className="flex w-full flex-col md:flex-row">
              <Link href={userLink} className="mr-2 font-display hover:underline">
                {username}
              </Link>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => {
                  const Icon = i < score ? HiStar : HiOutlineStar;
                  return <Icon className="h-5 w-5" key={i} />;
                })}
              </div>
              <div
                data-tip={formatDistanceToNow(updated_at, { addSuffix: true })}
                className="tooltip text-left"
              >
                <span className="md:ml-2">{format(updated_at, 'MMM d, yyyy')}</span>
              </div>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                {showStatus && <StatusBadge showWhenApproved status={status} />}
                {hasOptions && <Options {...optionsProps} />}
              </div>
            </div>
            <h4 className="card-title hidden md:block">{title}</h4>
          </div>
          {hasOptions && <Options {...optionsProps} className="md:hidden" />}
        </div>
        <div className="space-y-2 md:hidden">
          {showStatus && <StatusBadge showWhenApproved status={status} />}
          <h4 className="card-title">{title}</h4>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
