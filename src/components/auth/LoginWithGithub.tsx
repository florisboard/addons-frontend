import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Button from '@/shared/Button';

export default function LoginWithGithub() {
  return (
    <Button className="btn btn-block text-base">
      Login with <FaGithub className="h-6 w-6" />
    </Button>
  );
}
