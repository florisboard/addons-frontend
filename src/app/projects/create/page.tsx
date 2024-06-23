import React, { Suspense } from 'react';
import { Metadata } from 'next';
import AuthMiddleware from '@/shared/AuthMiddleware';
import ProjectsCreateClient from './page-client';

export const metadata: Metadata = {
  title: 'New Project',
  description: 'New Project',
};

export default function CreateProject() {
  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        <h1 className="h1">Create new Project</h1>
        <Suspense>
          <ProjectsCreateClient />
        </Suspense>
      </div>
    </AuthMiddleware>
  );
}
