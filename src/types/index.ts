import { HiSun } from 'react-icons/hi2';
import { ToastOptions } from 'react-toastify';
import { getProjects } from '@/services/projects';

export type THasChildren = {
  children: React.ReactNode;
};

export type TIcon = typeof HiSun;

export type TToast = ToastOptions & { content: React.ReactNode };

export type TReactQuerySuccessMeta = {
  toast?: TToast;
};

export type TReactQueryErrorMeta = {
  toast?: TToast;
};

export type TReactQueryMeta = {
  success?: TReactQuerySuccessMeta;
  error?: TReactQueryErrorMeta;
};

export type TApiMeta = Omit<Awaited<ReturnType<typeof getProjects>>, 'data'>;
