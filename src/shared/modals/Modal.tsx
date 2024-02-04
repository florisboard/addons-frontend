import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
};

export const MODAL_ROOT_ID = 'modals';

export default function Modal({ children }: ModalProps) {
  const [root, setRoot] = useState<any>(null);

  useEffect(() => {
    setRoot(document.getElementById(MODAL_ROOT_ID));
  }, []);

  if (!root) return children;

  return createPortal(children, root);
}
