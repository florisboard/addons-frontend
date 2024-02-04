import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import illustration from '@/assets/svg/errors/404.svg';

export default function Error404() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center space-y-4 text-center">
      <Image className="md:w-1/2" alt="not found" src={illustration} />
      <h1 className="font-display text-4xl font-bold">Uh oh. That page doesn’t exist.</h1>
      <p>Head to our homepage that does exist, or try double-checking the URL.</p>
      <Link href="/" className="btn btn-primary btn-md">
        Go back Home
      </Link>
    </div>
  );
}
