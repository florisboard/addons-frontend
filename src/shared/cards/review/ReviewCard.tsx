import React from 'react';
import Avatar from 'react-avatar';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import Options from '@/components/reviews/Options';
import { ReviewResource } from '@/generated';
import useMe from '@/services/users/me';

type ReviewCardProps = ReviewResource & {
  onEdit?: () => void;
};

export default function ReviewCard({
  id,
  is_anonymous,
  user,
  score,
  updated_at,
  title,
  description,
  is_owner,
  onEdit,
}: ReviewCardProps) {
  const { data: me } = useMe();

  const other = {
    link: is_anonymous ? '#' : `/users/${user?.username}`,
    username: is_anonymous ? 'FlorisBoard User' : user?.username,
  };
  const username = is_owner ? me?.username : other.username;
  const userLink = is_owner ? `/users/${me?.username}` : other.link;
  const optionsProps = { reviewId: id, isOwner: is_owner, onEdit };

  return (
    <div className="card bg-base-300">
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
                  const Icon = i <= score ? HiStar : HiOutlineStar;
                  return <Icon className="h-5 w-5" key={i} />;
                })}
              </div>
              <div
                data-tip={formatDistanceToNow(updated_at, { addSuffix: true })}
                className="tooltip text-left"
              >
                <span className="md:ml-2">{format(updated_at, 'MMM d, yyyy')}</span>
              </div>
              {is_anonymous && (
                <div
                  data-tip={is_owner ? "You're profile is hidden from others" : 'Anonymous'}
                  className="tooltip text-left"
                >
                  <span className="badge badge-accent md:ml-2">Anonymous</span>
                </div>
              )}
              <Options {...optionsProps} className="hidden md:flex" />
            </div>
            <h4 className="card-title hidden md:block">{title}</h4>
          </div>
          <Options {...optionsProps} className="md:hidden" />
        </div>
        <h4 className="card-title md:hidden">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
