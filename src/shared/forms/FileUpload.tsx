import React from 'react';
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
import axiosInstance from '@/libs/axios';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
);

export type TFiles = (FilePondInitialFile | FilePondFile)[];

interface FileUploadProps extends FilePondProps {
  initialFiles: TFiles;
  setFiles: React.Dispatch<React.SetStateAction<TFiles>>;
}

export default function FileUpload({ initialFiles, setFiles, ...rest }: FileUploadProps) {
  return (
    <FilePond
      files={initialFiles as any}
      onupdatefiles={setFiles}
      server={{
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const formData = new FormData();
          formData.append('file', file, file.name);
          const cancelToken = axios.CancelToken;

          axiosInstance
            .postForm('api/v1/uploads/process', formData, {
              cancelToken: cancelToken.source().token,
              onUploadProgress: (e) => progress(true, e.loaded, e.total!),
            })
            .then((resp) => load(resp.data))
            .catch((e) => {
              if (axios.isCancel(e)) error(e.message ?? 'Request canceled');
              if (axios.isAxiosError(e)) error(e.response?.data.message);
            });

          return {
            abort: () => {
              cancelToken.source().cancel('Operation canceled by the user.');
              abort();
            },
          };
        },
      }}
      maxFileSize="512KB"
      className="input input-bordered h-auto w-auto cursor-pointer"
      allowRevert={true}
      allowReorder={false}
      credits={false}
      {...rest}
    />
  );
}
