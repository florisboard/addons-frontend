import React, { Fragment } from 'react';
import { HiArrowDownCircle, HiChatBubbleBottomCenter, HiStar } from 'react-icons/hi2';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import compact from 'lodash/compact';
import { IProject } from '@/interfaces';
import { cn, humanReadableFormatter, isBetweenDate } from '@/utils';

type ProjectCardProps = IProject & {
  bodyClassName?: string;
};

export default function ProjectCard({
  name,
  slug,
  short_description,
  reviews_avg_score,
  reviews_count,
  releases_sum_downloads_count,
  is_recommended,
  latest_release,
  bodyClassName,
}: ProjectCardProps) {
  const stats = [
    { value: reviews_avg_score, Icon: HiStar, tooltip: 'Rating', format: false },
    { value: reviews_count, Icon: HiChatBubbleBottomCenter, tooltip: 'Reviews', format: true },
    {
      value: releases_sum_downloads_count,
      Icon: HiArrowDownCircle,
      tooltip: 'Total Downloads',
      format: true,
    },
  ];

  const badges = compact([
    is_recommended && {
      tooltip: 'Recommended By FlorisBoard',
      text: 'Recommended',
      className: 'badge-primary',
    },
    latest_release &&
      isBetweenDate(new Date(latest_release.created_at), 14) && {
        tooltip: `Last release : ${formatDistanceToNow(latest_release?.created_at, {
          addSuffix: true,
        })}`,
        text: 'New',
        className: 'badge-accent',
      },
  ]);

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn('card h-[23rem] w-80 bg-base-200', bodyClassName)}
    >
      <div className="card-body gap-2">
        <figure className="relative h-36 w-full rounded">
          <Image fill src="https://picsum.photos/200/100" alt="Shoes" />
        </figure>
        <h3 className="card-title line-clamp-1">{name}</h3>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <div
              key={badge.text}
              data-tip={badge?.tooltip}
              className="tooltip flex items-center gap-2"
            >
              <span key={badge.text} className={cn('badge', badge.className)}>
                {badge.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {stats.map((stat, i) => (
            <Fragment key={stat.tooltip}>
              <div data-tip={stat.tooltip} className="tooltip flex items-center gap-2">
                <span className="font-display font-medium">
                  {stat.format ? humanReadableFormatter.format(stat.value) : stat.value}
                </span>
                <stat.Icon className="h-5 w-5" />
              </div>
              <div
                className={cn('divider divider-horizontal m-0 p-0', {
                  hidden: i + 1 === stats.length,
                })}
              />
            </Fragment>
          ))}
        </div>
        <p className="line-clamp-3 text-sm">{short_description}</p>
      </div>
    </Link>
  );
}
