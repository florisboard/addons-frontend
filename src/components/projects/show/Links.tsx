import React from 'react';
import Link from 'next/link';
import compact from 'lodash/compact';
import { ProjectFullResource } from '@/generated';

type LinksProps = {
  project: ProjectFullResource;
};

type TLink = {
  name: string;
  href: string;
};

export default function Links({ project }: LinksProps) {
  const links: TLink[] = compact([
    project?.home_page && { name: 'Home Page', href: project.home_page },
    project?.donate_site && { name: 'Donate Site', href: project.donate_site },
    project?.support_email && {
      name: 'Support Email',
      href: `mailto:${project.support_email}`,
    },
    project?.support_site && {
      name: 'Support Site',
      href: project.support_site,
    },
  ]);

  return (
    <section className="card bg-base-200 md:col-span-2">
      <div className="card-body">
        <h2 className="card-title font-display text-2xl">Links</h2>
        <div className="divider" />
        <ul className="flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-neutral"
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
