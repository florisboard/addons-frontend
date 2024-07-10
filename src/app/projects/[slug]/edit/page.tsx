'use client';

import React, { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Information from '@/components/projects/edit/Information';
import Releases from '@/components/projects/edit/Releases';
import config from '@/fixtures/config';
import { useCanEditProject, useSearchParams } from '@/hooks';
import useProject from '@/services/projects/show';
import AuthMiddleware from '@/shared/AuthMiddleware';
import { cn, extractIdFromSlug, slugifyId } from '@/utils';

function Edit() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const id = extractIdFromSlug(slug)!;
  const [searchParams] = useSearchParams();
  const { data: project, isLoading: isProjectLoading } = useProject(id);
  const { canEdit, isLoading: isMeLoading } = useCanEditProject(project);

  const isLoading = isProjectLoading || isMeLoading;

  const tabs = [
    {
      title: 'Information',
      name: 'information',
      children: <Information project={project} />,
    },
    {
      title: 'Releases',
      name: 'releases',
      children: <Releases project={{ id: +id, title: project.title }} />,
    },
  ];

  const activeTab =
    tabs.find((tab) => tab.name === searchParams.get(config.tabParamsKey)) ?? tabs[0];

  useEffect(() => {
    if (isLoading) return;
    if (!canEdit) router.replace('/');
  }, [isLoading, canEdit, router]);

  return (
    <AuthMiddleware middleware="auth">
      <div className="px-container space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="h1">
            Edit <span className="text-primary">{project?.title}</span>
          </h1>
          <Link
            href={`/projects/${slugifyId(project.id, project.title)}`}
            className="btn btn-primary"
          >
            Main Page
          </Link>
        </div>
        <div role="tablist" className="tabs tabs-lifted">
          {tabs.map((tab) => {
            const isActive = activeTab.name === tab.name;

            return (
              <Fragment key={tab.name}>
                <Link
                  key={tab.title}
                  href={`${pathname}?${config.tabParamsKey}=${tab.name}`}
                  role="tab"
                  className={cn('tab', { 'tab-active': isActive })}
                >
                  {tab.title}
                </Link>
                {isActive && (
                  <div
                    role="tabpanel"
                    className="tab-content space-y-4 rounded-box border-base-300 bg-base-100 p-6"
                  >
                    {tab.children}
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </AuthMiddleware>
  );
}

const EditSSRDisabled = dynamic(() => Promise.resolve(Edit), {
  ssr: false,
});

export default EditSSRDisabled;
