'use client';

import React from 'react';
import OpenFlorisBoard from '@/components/updates/OpenFlorisBoard';
import useCheckUpdates from '@/services/updates/check';
import CenterSpinner from '@/shared/CenterSpinner';
import Download from '@/shared/releases/Download';
import { hasNewVersion } from '@/utils/updates';

function getProjectsFromHash(): { [packageName: string]: string } {
  try {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#data=')) return {};
    return JSON.parse(decodeURIComponent(hash.substring(6)));
  } catch (error) {
    return {};
  }
}

const tableHeads = [
  '#',
  'Package Name',
  'Title',
  'Current Version',
  'Available Version',
  'Actions',
];

export default function CheckUpdatesClient() {
  const parsedProjects = Object.entries(getProjectsFromHash()).map(([packageName, version]) => ({
    package_name: packageName,
    version_name: version,
  }));

  const { data, isLoading } = useCheckUpdates({ projects: parsedProjects });
  if (isLoading) return <CenterSpinner />;
  if ((data?.data.length ?? 0) < 1) return <OpenFlorisBoard />;

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
              (project) => project.package_name === value.project.package_name,
            );

            return (
              <tr key={value.project.id}>
                <th>{i + 1}</th>
                <td>{value.project.package_name}</td>
                <td>{value.project.title}</td>
                <td>{parsedProject?.version_name}</td>
                <td>{value.latest_release?.version_name ?? '-'}</td>
                <td>
                  {hasNewVersion(
                    parsedProject?.version_name,
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
