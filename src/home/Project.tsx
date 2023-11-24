import React from 'react';
import { HiChatBubbleBottomCenter, HiStar } from 'react-icons/hi2';
import Image from 'next/image';
import Link from 'next/link';
import { humanReadableFormatter } from '@/utils';

type ProjectProps = {
  name: string;
  ratings: number;
  reviews: number;
  description: string;
};

export default function Project({ name, ratings, reviews, description }: ProjectProps) {
  return (
    <Link href="/" className="card bg-base-200">
      <div className="card-body">
        <figure className="relative h-36 w-full rounded">
          <Image fill src="https://picsum.photos/200/100" alt="Shoes" />
        </figure>
        <h3 className="card-title line-clamp-1 truncate">{name}</h3>
        <div className="flex items-center gap-2">
          <div data-tip="Rating" className="tooltip flex gap-2">
            <span className="font-bold">{ratings}</span> <HiStar className="h-6 w-6" />
          </div>
          <div data-tip="Reviews" className="tooltip flex gap-2">
            <span className="font-bold">{humanReadableFormatter.format(reviews)}</span>{' '}
            <HiChatBubbleBottomCenter className="h-6 w-6" />
          </div>
        </div>
        <p className="line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
