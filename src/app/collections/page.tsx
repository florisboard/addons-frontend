'use client';

import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from '@/hooks';
import useCollections from '@/services/collections';
import useProjects from '@/services/projects';
import LoadMore from '@/shared/LoadMore';

export default function Collections() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const {
    data: collections,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useCollections({ filter: { name: query } });

  return (
    <div className="px-container space-y-4">
      <h1 className="font-display text-3xl font-bold">Collections</h1>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {collections?.pages.map((page) => (
          <Fragment key={page.meta.current_page}>
            {page.data.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="card h-[23rem] w-80 bg-base-200"
              >
                <div className="card-body gap-2">
                  <figure className="relative h-36 w-full rounded">
                    <Image fill src="https://picsum.photos/200/100" alt="Shoes" />
                  </figure>
                  <h3 className="card-title line-clamp-1">{collection.name}</h3>
                </div>
              </Link>
            ))}
          </Fragment>
        ))}
      </section>
      {hasNextPage && <LoadMore isLoading={isFetchingNextPage} onClick={fetchNextPage} />}
    </div>
  );
}
