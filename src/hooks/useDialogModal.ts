import { useRef } from 'react';

export default function useDialogModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => modalRef.current?.showModal();
  const handleCloseModal = () => modalRef.current?.close();

  return { modalRef, handleOpenModal, handleCloseModal } as const;
}
