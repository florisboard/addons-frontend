import React from 'react';
import { HiArrowDownCircle, HiChatBubbleBottomCenter, HiStar } from 'react-icons/hi2';
import { cn, formatNumber } from '@/utils';

type StatsProps = {
  reviewsAvgScore: number;
  reviewsCount: number;
  totalDownloads: number;
};

export default function Stats({ reviewsAvgScore, reviewsCount, totalDownloads }: StatsProps) {
  const stats = [
    { value: reviewsAvgScore, Icon: HiStar, tooltip: 'Rating', format: false },
    { value: reviewsCount, Icon: HiChatBubbleBottomCenter, tooltip: 'Reviews', format: true },
    {
      value: totalDownloads,
      Icon: HiArrowDownCircle,
      tooltip: 'Total Downloads',
      format: true,
    },
  ];

  return (
    <ul className="flex items-center justify-between gap-4 rounded-btn bg-base-300 p-4">
      {stats.map((stat, i) => (
        <li key={stat.tooltip}>
          <div data-tip={stat.tooltip} className="tooltip flex items-center gap-2">
            <span className="font-display text-lg font-medium">
              {stat.format ? formatNumber(stat.value) : stat.value}
            </span>
            <stat.Icon className="h-5 w-5" />
          </div>
          <div
            className={cn('divider divider-horizontal m-0 p-0', {
              hidden: i + 1 === stats.length,
            })}
          />
        </li>
      ))}
    </ul>
  );
}
