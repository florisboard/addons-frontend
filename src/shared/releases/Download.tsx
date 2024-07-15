import React from 'react';
import kebabCase from 'lodash/kebabCase';
import useDownloadRelease from '@/services/releases/download';
import { cn, openLink } from '@/utils';
import Button from '../forms/Button';

type DownloadProps = {
  release: { id: number; version_name: string };
  project: { title: string };
  className?: string;
};

export default function Download({ release, project, className }: DownloadProps) {
  const { mutate: download, isPending } = useDownloadRelease();
  const fileName = `${kebabCase(project.title)}-${release.version_name}.flex`;

  const handleDownload = () => {
    download(release.id, {
      onSuccess: (result) => {
        openLink(result.link);
      },
    });
  };

  return (
    <Button
      disabled={isPending}
      isLoading={isPending}
      onClick={handleDownload}
      className={cn('btn btn-primary btn-block md:w-auto', className)}
    >
      Download
    </Button>
  );
}
