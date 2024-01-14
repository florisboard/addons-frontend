'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import VerifyAlert from '@/components/projects/create/VerifyAlert';
import Form from '@/components/projects/form/Form';
import { ProjectTypeEnum } from '@/generated';
import { IUnprocessableEntity } from '@/interfaces';
import useCreateProject from '@/services/projects/create';
import useMe from '@/services/users/me';
import AuthMiddleware from '@/shared/AuthMiddleware';
import CenterSpinner from '@/shared/CenterSpinner';
import { isAxiosError } from '@/utils';

export default function CreateProject() {
  const { data: me, isLoading } = useMe();
  const isVerified = me?.email_verified_at;
  const { isPending, mutate: create } = useCreateProject();
  const router = useRouter();

  if (isLoading) return <CenterSpinner />;
  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        {!isLoading && !isVerified && <VerifyAlert />}
        <h1 className="font-display text-3xl font-bold">Create new Project</h1>
        <Form
          onSubmit={(values, { setErrors }) => {
            create(values, {
              onError: (e) => {
                if (isAxiosError<IUnprocessableEntity>(e, 422)) {
                  setErrors(e.response?.data.errors as any);
                }
              },
              onSuccess: (data) => {
                router.push(`/projects/${data.id}/${data.slug}`);
              },
            });
          }}
          submit={{ text: 'Create', disabled: !isVerified, isPending }}
        />
      </div>
    </AuthMiddleware>
  );
}
