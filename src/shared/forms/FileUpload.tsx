import React, { useEffect, useState } from 'react';
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond';
import axios from 'axios';
import { FilePondFile, FilePondInitialFile } from 'filepond';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { ImageResource } from '@/generated';
import axiosInstance from '@/libs/axios';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
);

interface FileUploadProps extends FilePondProps {
  onFileUploaded?: (path: string) => void;
  onFileUploadedState?: (paths: string[]) => void;
  uploadedFileLinks: ImageResource[];
}

export default function FileUpload({
  onFileUploaded,
  onFileUploadedState,
  uploadedFileLinks = [],
  ...rest
}: FileUploadProps) {
  const [files, setFiles] = useState<(string | FilePondInitialFile | Blob | FilePondFile)[]>(
    uploadedFileLinks.map((link) => ({
      source: link.url,
      options: { type: 'local', metadata: { poster: link.url, id: link.id } },
    })),
  );
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  useEffect(() => {
    if (onFileUploadedState) onFileUploadedState(uploadedFiles);
    // eslint-disable-next-line
  }, [uploadedFiles]);

  return (
    <FilePond
      server={{
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const formData = new FormData();
          formData.append('file', file, file.name);
          const cancelToken = axios.CancelToken;

          axiosInstance
            .postForm('api/uploads/process', formData, {
              cancelToken: cancelToken.source().token,
              onUploadProgress: (e) => progress(true, e.loaded, e.total!),
            })
            .then((resp) => {
              if (onFileUploaded) onFileUploaded(resp.data);
              setUploadedFiles((prev) => [...prev, resp.data]);
              load(resp.data);
            })
            .catch((e) => {
              if (axios.isCancel(e)) error(e.message ?? 'Request canceled');
              if (axios.isAxiosError(e)) error(e.response?.data.message);
            });

          return {
            abort: () => cancelToken.source().cancel('Operation canceled by the user.'),
          };
        },
      }}
      files={files as any}
      onupdatefiles={setFiles}
      maxFileSize="512KB"
      className="input input-bordered h-auto w-auto cursor-pointer"
      allowRevert={true}
      credits={false}
      {...rest}
    />
  );
}
