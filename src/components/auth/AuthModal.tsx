'use client';

import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';
import config from '@/fixtures/config';
import { useDialogModal, useSearchParams } from '@/hooks';
import useMe from '@/services/users/me';
import Button from '@/shared/Button';
import DialogModal from '@/shared/modals/DialogModal';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';

const routes = [
  { name: 'login', title: 'Welcome Back', component: <Login /> },
  { name: 'register', title: 'Create your Account', component: <Register /> },
  { name: 'forgotPassword', title: 'Reset your Password', component: <ForgotPassword /> },
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
    if (user) handleCloseAuthModal();
  }, [route, handleOpenModal, user]);

  return (
    <DialogModal
      dialogClassName="modal-bottom md:modal-middle"
      parentClassName="max-h-screen h-full md:h-auto"
      parentElement="div"
      modalRef={modalRef}
      id={config.authParamName}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
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
