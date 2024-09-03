import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import compact from 'lodash/compact';
import { ProjectFullResource } from '@/generated';

type InformationProps = {
  project: ProjectFullResource;
};

type TInfoList = {
  title: string;
  value: string | number | undefined;
};

export default function Information({ project }: InformationProps) {
  const lists: TInfoList[] = compact([
    { title: 'Package Name', value: 'io.github.itsmartashub.floristyle' },
    { title: 'Creator', value: project?.user.username },
    { title: 'Version', value: project?.latest_release?.version_name ?? '0' },
    { title: 'Created', value: formatDistanceToNow(project?.created_at, { addSuffix: true }) },
    { title: 'Updated', value: formatDistanceToNow(project?.updated_at, { addSuffix: true }) },
    project?.latest_release && {
      title: 'Last Release',
      value: formatDistanceToNow(project?.latest_release.created_at, { addSuffix: true }),
    },
  ]);

  return (
    <section className="card bg-base-200 md:col-span-2">
      <div className="card-body">
        <h2 className="card-title font-display text-2xl">Information</h2>
        <div className="divider" />
        <ul>
          {lists.map((list) => (
            <li key={list.title} className="flex flex-wrap items-center gap-2">
              <span className="min-w-max font-display text-lg font-medium">{list.title} :</span>
              <span className="select-all font-medium">{list.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
