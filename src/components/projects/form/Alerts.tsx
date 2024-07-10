import React from 'react';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';
import { isBefore, subDays } from 'date-fns';
import { ProjectFullResource, StatusEnum } from '@/generated';

type AlertsProps = {
  project: ProjectFullResource | undefined;
};

export default function Alerts({ project }: AlertsProps) {
  const isBefore2Days =
    project?.latest_change_proposal &&
    isBefore(subDays(project?.latest_change_proposal?.updated_at, 2), new Date());

  return (
    <>
      {project?.latest_change_proposal?.status === StatusEnum.REJECTED && isBefore2Days && (
        <div role="alert" className="alert alert-error">
          <HiOutlineXCircle className="h-6 w-6" />
          <span>
            Your previous Change Proposal got rejected.{' '}
            {project.latest_change_proposal.reviewer_description &&
              `Here's the Reviewer Description : ${project.latest_change_proposal.reviewer_description}`}
          </span>
        </div>
      )}
      {project?.latest_change_proposal?.status === StatusEnum.APPROVED && isBefore2Days && (
        <div role="alert" className="alert alert-success">
          <HiOutlineCheckCircle className="h-6 w-6" />
          <span>Congratulations. Your previous change proposal has been approved.</span>
        </div>
      )}
    </>
  );
}
