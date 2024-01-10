'use client';

import React from 'react';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Breadcrumb from '@/components/projects/show/Breadcrumb';
import Information from '@/components/projects/show/Information';
import Links from '@/components/projects/show/Links';
import Maintainers from '@/components/projects/show/Maintainers';
import Reviews from '@/components/projects/show/Reviews';
import ReviewsPerStars from '@/components/projects/show/ReviewsPerStars';
import Screenshots from '@/components/projects/show/Screenshots';
import Stats from '@/components/projects/show/Stats';
import useProject from '@/services/projects/show';
import Button from '@/shared/Button';

export default function Project() {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const router = useRouter();
  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return (
      <div className="flex h-[60svh] w-full items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }
  if (!project) return null;
  if (project.slug !== slug) router.replace(`/projects/${project.id}/${project.slug}`);
  return (
    <div className="px-container space-y-4">
      <Breadcrumb slug={project.slug} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <div className="card bg-base-200 md:col-span-4">
          <div className="card-body">
            <h1 className="font-display text-3xl font-bold">{project?.name}</h1>
            <Link
              className="badge badge-accent badge-lg"
              href={`/categories/${project.category.slug}`}
            >
              {project.category.name}
            </Link>
            <div className="divider" />
            <Markdown className="prose prose-sm">{project?.description}</Markdown>
            <Screenshots />
            <div className="card-actions mt-4">
              <Button className="btn btn-primary">Download</Button>
            </div>
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
        <Reviews reviews={project.reviews} />
      </div>
    </div>
  );
}
