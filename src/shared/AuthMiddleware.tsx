'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuthRoutes } from '@/hooks';
import useMe from '@/services/users/me';
import { THasChildren } from '@/types';

type AuthMiddlewareProps = THasChildren & {
  middleware: 'guest' | 'auth';
  navigateTo?: string;
  waitForAuthResult?: boolean;
};

function AuthMiddleware({
  middleware,
  navigateTo,
  children,
  waitForAuthResult = true,
}: AuthMiddlewareProps) {
  const { data: me, isLoading } = useMe();
  const isLoggedIn = !!me?.id;
  const router = useRouter();
  const { login } = useAuthRoutes();

  useEffect(() => {
    if (waitForAuthResult && isLoading) return;
    if (middleware === 'guest' && isLoggedIn) router.replace(navigateTo ?? '/');
    if (middleware === 'auth' && !isLoggedIn) router.replace(navigateTo ?? login('/'));
  }, [isLoggedIn, isLoading, navigateTo, router, middleware, waitForAuthResult, login]);

  return children;
}

const ClientAuthMiddleware = dynamic(() => Promise.resolve(AuthMiddleware), {
  ssr: false,
});

export default ClientAuthMiddleware;
