'use client';

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import OpenFlorisBoard from '@/components/updates/OpenFlorisBoard';
import { useSearchParams } from '@/hooks';
import useCheckUpdates from '@/services/updates/check';
import Download from '@/shared/releases/Download';
import { hasNewVersion } from '@/utils/updates';

const tableHeads = [
  '#',
  'Package Name',
  'Title',
  'Current Version',
  'Available Version',
  'Actions',
];

type TParsedProject = {
  versionName: string;
  packageName: string;
};

export default function CheckUpdatesClient() {
  const [searchParams] = useSearchParams();
  const router = useRouter();

  const projects = searchParams.getAll('projects[]');
  const versions = searchParams.getAll('versions[]');
  const isUrlSearchParamsValid = projects.length === versions.length;
  const { data, isError } = useCheckUpdates({ projects, versions });
  const parsedProjects: TParsedProject[] = [];

  useEffect(() => {
    if (isError) {
      toast.warning('The URL parameters for each updates is invalid.');
      router.replace('/check-updates');
    }
  }, [isError, router]);

  if (isUrlSearchParamsValid) {
    for (let i = 0; i < projects.length; i++) {
      parsedProjects.push({ packageName: projects[i], versionName: versions[i] });
    }
  }

  if (data && data.data.length < 1) return <OpenFlorisBoard />;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-lg">
        <thead>
          <tr>
            {tableHeads.map((text) => (
              <th key={text}>{text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.data.map((value, i) => {
            const parsedProject = parsedProjects.find(
              (project) => project.packageName === value.project.package_name,
            );

            return (
              <tr key={value.project.id}>
                <th>{i + 1}</th>
                <td>{value.project.package_name}</td>
                <td>{value.project.title}</td>
                <td>{parsedProject?.versionName}</td>
                <td>{value.latest_release?.version_name ?? '-'}</td>
                <td>
                  {hasNewVersion(
                    parsedProject?.versionName,
                    value.latest_release?.version_name,
                  ) && (
                    <Download
                      className="btn-sm"
                      project={{ title: value.project.title }}
                      release={{
                        id: value.latest_release!.id,
                        version_name: value.latest_release!.version_name,
                      }}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
