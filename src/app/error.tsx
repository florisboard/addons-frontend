'use client';

import React from 'react';
import Error404 from '@/components/errors/404';
import { isAxiosError } from '@/utils';

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  if (isAxiosError(error, 404)) return <Error404 />;
  return <div>Error</div>;
}
