import React, { Fragment } from 'react';
import { HiStar } from 'react-icons/hi2';
import Link from 'next/link';
import { cn, humanReadableFormatter } from '@/utils';

type ReviewsPerStarsProps = {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  total: number;
};

export default function ReviewsPerStars({
  one,
  two,
  three,
  four,
  five,
  total,
}: ReviewsPerStarsProps) {
  const reviews = [five, four, three, two, one];

  return (
    <section className="flex flex-col gap-4">
      {reviews.map((review, i) => (
        <Fragment key={i}>
          <div className="join">
            <Link
              href="/"
              className="join-item flex flex-1 items-center justify-around gap-4 bg-base-300 p-4"
            >
              {Array.from({ length: 5 }).map((_, j) => (
                <HiStar
                  className={cn('h-5 w-5 text-primary', { 'text-base-content/70': 5 - i <= j })}
                  key={j}
                />
              ))}
            </Link>
            <div className="join-item w-12 bg-neutral p-4 font-display text-white">
              {humanReadableFormatter.format(review)}
            </div>
          </div>
          <progress className="progress" value={(review / total) * 100} max="100" />
        </Fragment>
      ))}
    </section>
  );
}
