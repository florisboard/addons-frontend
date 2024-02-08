'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
import Markdown from '@/shared/forms/Markdown';

export default function Project() {
  const router = useRouter();
  const { id } = useParams<{ id: string; slug: string }>();
  const { data: project } = useProject(+id);
  const { canEdit } = useCanEditProject(project);

  useEffect(() => {
    router.replace(`/projects/${id}/${project.slug}`);
  }, [id, router, project.slug]);

  return (
    <div className="px-container space-y-4">
      <Breadcrumb slug={project.slug} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        <div className="card bg-base-200 md:col-span-4">
          <div className="card-body">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="font-display text-3xl font-bold">{project.name}</h1>
              {canEdit && (
                <Link href={`/projects/${id}/edit`} className="btn btn-accent">
                  Edit
                </Link>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <Link
                className="badge badge-accent badge-lg min-w-max"
                href={`/categories/${project.category.slug}`}
              >
                {project.category.name}
              </Link>
              {project.is_recommended && (
                <span className="badge badge-primary badge-lg min-w-max">Recommended</span>
              )}
              {!project.is_active && (
                <span className="badge badge-warning badge-lg min-w-max">Not Approved</span>
              )}
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
        <LatestRelease projectSlug={project.slug} latestRelease={project.latest_release} />
        <Reviews authUserReview={project.user_review} projectId={id!} reviews={project.reviews} />
      </div>
    </div>
  );
}
