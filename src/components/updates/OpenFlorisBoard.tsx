import React from 'react';
import Link from 'next/link';
import phone from '@/assets/animations/phone.json';
import { Player } from '@lottiefiles/react-lottie-player';

export default function OpenFlorisBoard() {
  return (
    <div className="card card-bordered bg-base-200">
      <div className="card-body">
        <Player className="max-w-[200px] md:hidden" src={phone} autoplay loop={false} />
        <h2 className="card-title">Open the Link from FlorisBoard</h2>
        <p>
          Please open the link check updates for extensions to see if you&apos;re extensions are
          using the latest version.
        </p>
        <div className="card-actions">
          <Link href="ui://florisboard/ext/check-updates" className="btn btn-primary">
            Open FlorisBoard
          </Link>
        </div>
      </div>
    </div>
  );
}
