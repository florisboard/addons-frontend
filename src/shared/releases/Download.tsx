import React from 'react';
import kebabCase from 'lodash/kebabCase';
import useDownloadRelease from '@/services/releases/download';
import { downloadFile } from '@/utils';
import Button from '../Button';

type DownloadProps = {
  release: { id: number; version_name: string };
  project: { title: string };
};

export default function Download({ release, project }: DownloadProps) {
  const { mutate: download, isPending } = useDownloadRelease();
  const fileName = `${kebabCase(project.title)}-${release.version_name}.mp3`;

  const handleDownload = () => {
    download(release.id, {
      onSuccess: (result) => {
        downloadFile(result.link, fileName);
      },
    });
  };

  return (
    <Button
      disabled={isPending}
      isLoading={isPending}
      onClick={handleDownload}
      className="btn btn-primary btn-block md:w-auto"
    >
      Download
    </Button>
  );
}
