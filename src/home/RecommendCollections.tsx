import React from 'react';
import Link from 'next/link';

export default function RecommendCollections() {
  return (
    <section className="px-container">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-base-200 p-4 text-center md:h-60 md:rounded-full">
        <h2 className="text-4xl font-bold">Checkout the Public Collections</h2>
        <p className="text-gray-600">
          Users can create public collection to group their favorite projects and share it to
          everyone!
        </p>
        <Link className="btn btn-secondary" href="/">
          Let&apos;s go
        </Link>
      </div>
    </section>
  );
}
