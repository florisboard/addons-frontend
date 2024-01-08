import React from 'react';
import Avatar from 'react-avatar';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import Options from '@/components/reviews/Options';
import { ReviewResource } from '@/generated';

export default function ReviewCard({
  is_anonymous,
  user,
  score,
  updated_at,
  title,
  description,
}: ReviewResource) {
  const username = is_anonymous ? 'FlorisBoard User' : user!.username;
  const userLink = is_anonymous ? '#' : `/users/${user!.username}`;

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
              <Options className="hidden md:flex" />
            </div>
            <h4 className="card-title hidden md:block">{title}</h4>
          </div>
          <Options className="md:hidden" />
        </div>
        <h4 className="card-title md:hidden">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
