'use client';

import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import useGithubRedirectUrl from '@/services/auth/github';
import Button from '@/shared/forms/Button';

export default function LoginWithGithub() {
  const { mutate, isPending } = useGithubRedirectUrl();
  const router = useRouter();

  const handleLoginWithGithub = () => {
    mutate(undefined, {
      onSettled: (data) => {
        router.push(data!.url);
      },
    });
  };

  return (
    <Button
      disabled={isPending}
      isLoading={isPending}
      onClick={handleLoginWithGithub}
      className="btn btn-block text-base"
    >
      Login with <FaGithub className="h-6 w-6" />
    </Button>
  );
}
