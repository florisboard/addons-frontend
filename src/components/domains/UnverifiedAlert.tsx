'use client';

import React from 'react';
import { HiInformationCircle } from 'react-icons/hi2';
import useDomains from '@/services/domains';

export default function UnverifiedAlert() {
  const { data } = useDomains();
  const hasUnverifiedEmail = data.data.some((domain) => !domain.verified_at);

  if (!hasUnverifiedEmail) return null;

  return (
    <div role="alert" className="alert alert-info">
      <HiInformationCircle className="h-6 w-6" />
      <span>
        You must verify your unverified domains or delete them in order to create a new domain.
      </span>
    </div>
  );
}
