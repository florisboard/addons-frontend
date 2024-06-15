import React from 'react';
import Link from 'next/link';
import compact from 'lodash/compact';
import { ProjectFullResource } from '@/generated';

type LinksProps = {
  project: ProjectFullResource;
};

type TLink = {
  title: string;
  href: string;
};

export default function Links({ project }: LinksProps) {
  const links: TLink[] = compact([{ title: 'Source Code', href: project.links.source_code }]);

  return (
    <section className="card bg-base-200 md:col-span-2">
      <div className="card-body">
        <h2 className="card-title font-display text-2xl">Links</h2>
        <div className="divider" />
        <ul className="flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <li key={link.title}>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-neutral"
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
