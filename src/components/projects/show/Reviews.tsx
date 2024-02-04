import React from 'react';
import Link from 'next/link';
import { ReviewResource } from '@/generated';
import EmptyList from '@/shared/EmptyList';
import ReviewCard from '@/shared/cards/review/ReviewCard';

type ReviewsProps = {
  reviews: ReviewResource[];
};

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section className="card bg-base-200 md:col-span-4">
      <div className="card-body gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="card-title font-display text-2xl">Reviews</h2>
          <Link className="btn btn-link btn-md no-underline" href="#">
            All Reviews
          </Link>
        </div>
        <div className="divider" />
        {reviews.length <= 0 && <EmptyList />}
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </section>
  );
}
