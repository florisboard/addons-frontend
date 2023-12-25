'use client';

import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';
import config from '@/fixtures/config';
import { useDialogModal, useSearchParams } from '@/hooks';
import useMe from '@/services/users/me';
import Button from '@/shared/Button';
import DialogModal from '@/shared/modals/DialogModal';
import { cn } from '@/utils';
import EmailVerification from './EmailVerification';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';

const routes = [
  {
    name: 'login',
    title: 'Welcome Back',
    component: <Login />,
    canOpenWhenAuthenticated: false,
    isFullOnMobile: true,
  },
  {
    name: 'register',
    title: 'Create your Account',
    component: <Register />,
    canOpenWhenAuthenticated: false,
    isFullOnMobile: true,
  },
  {
    name: 'forgotPassword',
    title: 'Forgot your Password',
    component: <ForgotPassword />,
    canOpenWhenAuthenticated: false,
    isFullOnMobile: true,
  },
  {
    name: 'resetPassword',
    title: 'Reset your Password',
    component: <ResetPassword />,
    canOpenWhenAuthenticated: false,
    isFullOnMobile: true,
  },
  {
    name: 'emailVerification',
    title: 'Verify your Email',
    component: <EmailVerification />,
    canOpenWhenAuthenticated: true,
    isFullOnMobile: false,
  },
];

export default function AuthModal() {
  const { data: user } = useMe();
  const { modalRef, handleCloseModal, handleOpenModal } = useDialogModal();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseAuthModal = () => {
    handleCloseModal();
    setSearchParams((params) => {
      params.delete(config.authParamName);
      return params;
    });
  };

  const authParam = searchParams.get(config.authParamName) as 'login' | null;
  const route = routes.find((r) => r.name === authParam);

  useEffect(() => {
    if (route) handleOpenModal();
    if (user && !route?.canOpenWhenAuthenticated) handleCloseAuthModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, user]);

  return (
    <DialogModal
      dialogClassName={cn(route?.isFullOnMobile && 'modal-bottom md:modal-middle')}
      parentClassName={cn(route?.isFullOnMobile && 'h-full max-h-screen md:h-auto')}
      parentElement="div"
      modalRef={modalRef}
      id={config.authParamName}
    >
      <div className="flex items-center justify-between">
        <h2
          className={cn('font-bold', {
            'text-3xl': route?.isFullOnMobile,
            'text-2xl md:text-3xl': !route?.isFullOnMobile,
          })}
        >
          {route?.title} <span className="text-5xl text-primary">.</span>
        </h2>
        <Button
          onClick={handleCloseAuthModal}
          type="button"
          className="btn btn-circle btn-ghost btn-sm"
        >
          <HiXMark className="h-6 w-6" />
        </Button>
      </div>
      {route?.component}
    </DialogModal>
  );
}
