import React from 'react';
import {
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { isBefore, subDays } from 'date-fns';
import { ProjectFullResource, StatusEnum } from '@/generated';

type AlertsProps = {
  infoText: string | null;
  project: ProjectFullResource | undefined;
};

export default function Alerts({ infoText, project }: AlertsProps) {
  return (
    <>
      {infoText && (
        <div role="alert" className="alert alert-info">
          <HiOutlineInformationCircle className="h-6 w-6" />
          <span>{infoText}</span>
        </div>
      )}
      {project?.latest_change_proposal?.status === StatusEnum.REJECTED && (
        <div role="alert" className="alert alert-error">
          <HiOutlineXCircle className="h-6 w-6" />
          <span>
            Your previous Change Proposal got rejected.{' '}
            {project.latest_change_proposal.reviewer_description &&
              `Here's the Reviewer Description : ${project.latest_change_proposal.reviewer_description}`}
          </span>
        </div>
      )}
      {project?.latest_change_proposal?.status === StatusEnum.APPROVED &&
        isBefore(subDays(project.latest_change_proposal.updated_at, 2), new Date()) && (
          <div role="alert" className="alert alert-success">
            <HiOutlineCheckCircle className="h-6 w-6" />
            <span>Congratulations. Your previous change proposal has been approved.</span>
          </div>
        )}
    </>
  );
}
