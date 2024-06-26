import React from 'react';
import { cn } from '@/utils';
import Modal from './Modal';

export interface DialogModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  id: string;
  children: React.ReactNode;
  parentClassName?: string;
  dialogClassName?: string;
  parentElement?: 'div' | 'form';
  closeOnClickOutside?: boolean;
}

export default function DialogModal({
  children,
  closeOnClickOutside = false,
  dialogClassName,
  parentClassName,
  parentElement = 'form',
  ...props
}: DialogModalProps) {
  const parentProps = { className: cn('modal-box space-y-4', parentClassName) };

  return (
    <Modal>
      <dialog {...props} className={cn('modal', dialogClassName)}>
        {parentElement === 'form' ? (
          <form method="dialog" {...parentProps}>
            {children}
          </form>
        ) : (
          <div {...parentProps}>{children}</div>
        )}
        {closeOnClickOutside && (
          <form method="dialog" className="modal-backdrop">
            <button type="submit">close</button>
          </form>
        )}
      </dialog>
    </Modal>
  );
}
