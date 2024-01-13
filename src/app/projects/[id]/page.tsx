'use client';

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useProject from '@/services/projects/show';

export default function Show() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useProject(id);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (data) router.replace(`/projects/${id}/${data.slug}`);
    else {
      toast.error(`Project ${id} was not found.`);
      router.replace('/');
    }
  }, [id, router, data, isLoading]);

  return (
    <div className="px-container flex flex-1 items-center justify-center">
      <div className="card bg-base-200">
        <div className="card-body">
          <h1 className="card-title">Redirecting ...</h1>
          <p>We are redirecting you the project.</p>
          <span className="loading loading-dots loading-lg mx-auto mt-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
