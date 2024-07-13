import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import logo from '@/assets/svg/logo.svg';
import LoginWithGithub from '@/components/auth/LoginWithGithub';
import AuthMiddleware from '@/shared/AuthMiddleware';

export const metadata: Metadata = {
  title: 'Authentication',
  description:
    'Authenticate to unlock project creation, review capabilities, and more with FlorisBoard Addons.',
};

export default function Auth() {
  return (
    <AuthMiddleware middleware="guest">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="card card-bordered w-full max-w-xl bg-base-100 shadow">
          <div className="card-body gap-4 text-center">
            <Image className="mx-auto rounded-full bg-base-200" alt="FlorisBoard Logo" src={logo} />
            <h1 className="text-2xl font-bold text-primary">Authentication</h1>
            <p className="text-base-content/80">
              You can Login / Register your FlorisBoard account using these providers below.
            </p>
            <LoginWithGithub />
          </div>
        </div>
      </div>
    </AuthMiddleware>
  );
}
