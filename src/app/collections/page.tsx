import React from 'react';
import { HiInformationCircle } from 'react-icons/hi2';

export default function Collections() {
  return (
    <div className="px-container space-y-4">
      <h1 className="h1">Collections</h1>
      <div role="alert" className="alert alert-info">
        <HiInformationCircle className="h-6 w-6" />
        <span>This feature is not ready yet.</span>
      </div>
    </div>
  );
}
