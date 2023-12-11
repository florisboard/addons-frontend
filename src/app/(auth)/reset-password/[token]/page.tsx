'use client';

import React from 'react';
import { redirect, useParams } from 'next/navigation';
import config from '@/fixtures/config';
import { useSearchParams } from '@/hooks';

export default function ResetPassword() {
  // This is the route that backend sends on the user email
  // so instead we redirect to the wanted route (auth modal)
  const { token } = useParams();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');
  return redirect(`/?${config.authParamName}=resetPassword&email=${email}&token=${token}`);
}
