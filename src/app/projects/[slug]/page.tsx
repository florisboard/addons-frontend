'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import ReportModal, { TReportable, generateReportModalId } from '@/components/ReportModal';
import Breadcrumb from '@/components/projects/show/Breadcrumb';
import Information from '@/components/projects/show/Information';
import LatestRelease from '@/components/projects/show/LatestRelease';
import Links from '@/components/projects/show/Links';
import Maintainers from '@/components/projects/show/Maintainers';
import Reviews from '@/components/projects/show/Reviews';
import ReviewsPerStars from '@/components/projects/show/ReviewsPerStars';
import Screenshots from '@/components/projects/show/Screenshots';
import Stats from '@/components/projects/show/Stats';
import { useCanEditProject } from '@/hooks';
import useProject from '@/services/projects/show';
import StatusBadge from '@/shared/badges/StatusBadge';
import Button from '@/shared/forms/Button';
import Markdown from '@/shared/forms/Markdown';
import { extractIdFromSlug, isOfficialProject, openModal, slugifyId } from '@/utils';

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const id = extractIdFromSlug(slug);
  if (!id) notFound();

  const { data: project } = useProject(id);
  const { canEdit } = useCanEditProject(project);
  const reportable: TReportable = { resource: 'projects', title: project.title, id };

  return (
    <div className="px-container space-y-4">
      <Breadcrumb title={project.title} />
      <ReportModal reportable={reportable} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        <div className="card bg-base-200 md:col-span-4">
          <div className="card-body">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="h1">{project.title}</h1>
              <div className="flex items-center gap-2">
                {canEdit && (
                  <Link
                    href={`/projects/${slugifyId(project.id, project.title)}/edit`}
                    className="btn btn-accent"
                  >
                    Edit
                  </Link>
                )}
                <Button
                  onClick={() => openModal(generateReportModalId(reportable))}
                  className="btn btn-error"
                >
                  Report
                </Button>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {isOfficialProject(project.package_name) && (
                <span className="badge badge-primary badge-lg min-w-max">Official</span>
              )}
              {project.is_recommended && (
                <span className="badge badge-secondary badge-lg min-w-max">Recommended</span>
              )}
              <Link
                className="badge badge-accent badge-lg min-w-max"
                href={`/categories/${slugifyId(project.category.id, project.category.title)}`}
              >
                {project.category.title}
              </Link>
              <StatusBadge status={project.status} showWhenApproved={false} />
            </div>
            <div className="divider" />
            <Markdown className="prose-sm">{project.description}</Markdown>
            <Screenshots screenshots={project.screenshots} />
          </div>
        </div>
        <div className="card max-h-[38rem] bg-base-200 md:col-span-2">
          <div className="card-body gap-4">
            <Stats
              reviewsAvgScore={project.reviews_avg_score}
              reviewsCount={project.reviews_count}
              totalDownloads={project.releases_sum_downloads_count}
            />
            <ReviewsPerStars
              one={project.one_reviews_count}
              two={project.two_reviews_count}
              three={project.three_reviews_count}
              four={project.four_reviews_count}
              five={project.five_reviews_count}
              total={project.reviews_count}
            />
          </div>
        </div>
        <Information project={project} />
        <Maintainers user={project.user} maintainers={project.maintainers} />
        <Links project={project} />
        <LatestRelease projectTitle={project.title} latestRelease={project.latest_release} />
        <Reviews authUserReview={project.user_review} projectId={id} reviews={project.reviews} />
      </div>
    </div>
  );
}
