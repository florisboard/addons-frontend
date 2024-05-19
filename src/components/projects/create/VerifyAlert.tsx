import React, { useState } from 'react';
import { HiOutlineXCircle, HiXMark } from 'react-icons/hi2';
import Button from '@/shared/forms/Button';

export default function VerifyAlert() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;
  return (
    <div role="alert" className="alert alert-error">
      <HiOutlineXCircle className="h-6 w-6" />
      <span>You have to verify your email to create a project.</span>
      <Button aria-label="close" onClick={() => setIsOpen(false)}>
        <HiXMark className="h-5 w-5" />
      </Button>
    </div>
  );
}
