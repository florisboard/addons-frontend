import React, { Fragment, useMemo } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { FormikHelpers } from 'formik';
import ReleaseFormModal, { modalId } from '@/components/releases/ReleaseFormModal';
import { ProjectsReleasesStorePayload, StatusEnum } from '@/generated';
import { IUnprocessableEntity } from '@/interfaces';
import useReleases from '@/services/releases';
import useCreateRelease from '@/services/releases/create';
import ReleaseCard from '@/shared/cards/release/ReleaseCard';
import ReleaseCardSkeleton from '@/shared/cards/release/ReleaseCardSkeleton';
import Button from '@/shared/forms/Button';
import LoadMore from '@/shared/forms/LoadMore';
import { closeModal, isAxiosError, openModal } from '@/utils';

type ReleasesProps = {
  project: { id: number; title: string };
};

export default function Releases({ project }: ReleasesProps) {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useReleases({
    filter: { project_id: project.id },
  });
  const { mutate: createRelease, isPending: isCreatingRelease } = useCreateRelease();
  const hasPendingRelease = data?.pages
    .flatMap((page) => page.data)
    .some((release) => release.status === StatusEnum.UNDER_REVIEW);

  const infoText = useMemo(() => {
    if (hasPendingRelease) {
      return 'A release for this project is currently in a "Pending" state. Additional releases may be initiated following the completion of the review process.';
    }
    return null;
  }, [hasPendingRelease]);

  const handleSubmit = (
    values: ProjectsReleasesStorePayload,
    { setErrors }: FormikHelpers<ProjectsReleasesStorePayload>,
  ) => {
    createRelease(
      { ...values, projectId: project.id },
      {
        onSuccess: () => {
          closeModal(modalId);
        },
        onError: (e) => {
          if (isAxiosError<IUnprocessableEntity>(e, 422)) {
            setErrors(e.response!.data.errors);
          }
        },
      },
    );
  };

  return (
    <>
      <ReleaseFormModal onSubmit={handleSubmit} isPending={isCreatingRelease} type="create" />
      {infoText && (
        <div role="alert" className="alert alert-info">
          <HiOutlineInformationCircle className="h-6 w-6" />
          <span>{infoText}</span>
        </div>
      )}
      <div className="card bg-base-200">
        <div className="card-body flex-row flex-wrap items-center justify-between gap-4">
          <h4 className="card-title">Create a new Release</h4>
          <Button
            disabled={Boolean(infoText)}
            onClick={() => openModal(modalId)}
            className="btn btn-primary"
          >
            Create
          </Button>
        </div>
      </div>
      {isLoading && Array.from({ length: 5 }).map((_, i) => <ReleaseCardSkeleton key={i} />)}
      {data?.pages.map((page) => (
        <Fragment key={page.meta.current_page}>
          {page.data.map((release) => (
            <ReleaseCard projectTitle={project.title} key={release.id} {...release} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && <LoadMore onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </>
  );
}
