import React from 'react';

export default function CenterSpinner() {
  return (
    <div className="flex h-[60svh] w-full items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
