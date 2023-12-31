import React, { useState } from 'react';
import Link from 'next/link';
import rocketLunch from '@/assets/animations/rocketLunch.json';
import { Player } from '@lottiefiles/react-lottie-player';

export default function NewProjectCard() {
  const [isAnimationActive, setIsAnimationActive] = useState(true);

  return (
    <Link href="/projects/create" className="card h-[23rem] w-auto bg-base-300">
      <div className="card-body m-4 items-center justify-center border-8 border-dotted border-primary/20">
        {isAnimationActive && (
          <Player
            className="mx-auto h-auto w-auto max-w-[200px]"
            src={rocketLunch}
            autoplay
            onEvent={(e) => {
              if (e === 'pause') setIsAnimationActive(false);
            }}
            loop={false}
          />
        )}
        <div className="card-actions">
          <p className="btn btn-primary">New Project</p>
        </div>
      </div>
    </Link>
  );
}
