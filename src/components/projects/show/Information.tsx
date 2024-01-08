import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import compact from 'lodash/compact';
import { ProjectFullResource } from '@/generated';

type InformationProps = {
  project: ProjectFullResource;
};

type TInfoList = {
  name: string;
  value: string | number | undefined;
};

export default function Information({ project }: InformationProps) {
  const lists: TInfoList[] = compact([
    { name: 'Package Name', value: project?.package_name },
    { name: 'Creator', value: project?.user.username },
    { name: 'Version', value: project?.latest_release.version },
    { name: 'Created', value: formatDistanceToNow(project?.created_at, { addSuffix: true }) },
    { name: 'Updated', value: formatDistanceToNow(project?.updated_at, { addSuffix: true }) },
    {
      name: 'Last Release',
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
            <li key={list.name} className="flex items-center gap-2">
              <span className="font-display text-lg font-medium">{list.name} :</span>
              <span className="select-all font-medium">{list.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
