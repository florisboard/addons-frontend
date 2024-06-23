import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Create from '@/components/domains/Create';
import UnverifiedAlert from '@/components/domains/UnverifiedAlert';
import AuthMiddleware from '@/shared/AuthMiddleware';
import CenterSpinner from '@/shared/CenterSpinner';
import Collapse from '@/shared/Collapse';
import DomainsList from './page-client';

export const metadata: Metadata = {
  title: 'Domains',
  description: 'Domains',
};

export default function Domains() {
  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="h1">Domains</h1>
          <Create />
        </div>
        <UnverifiedAlert />
        <Suspense fallback={<CenterSpinner />}>
          <DomainsList />
        </Suspense>
        <div className="divider" />
        <Collapse title="How to verify a Domain?">
          <ol className="list-decimal px-2">
            <li>Copy the verification code of the domain you want to verify.</li>
            <li>Go to your domain name provider management and go to DNS record management.</li>
            <li>Create a new TXT record with host @ and paste the verification code there.</li>
            <li>Wait couple of seconds (or sometimes minutes) and click verify domain.</li>
          </ol>
        </Collapse>
      </div>
    </AuthMiddleware>
  );
}
