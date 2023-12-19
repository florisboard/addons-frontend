import { HiSun } from 'react-icons/hi2';
import { ToastOptions } from 'react-toastify';

export type THasChildren = {
  children: React.ReactNode;
};

export type TIcon = typeof HiSun;

export type TToast = ToastOptions & { content: React.ReactNode };

export type TSuccessMeta = {
  toast?: TToast;
};

export type TErrorMeta = {
  toast?: TToast;
};

export type TMeta = {
  success?: TSuccessMeta;
  error?: TErrorMeta;
};
