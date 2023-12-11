import React from 'react';
import useSendEmailVerification from '@/services/auth/emailVerifiaction';
import Button from '@/shared/Button';

export default function EmailVerification() {
  const { mutate: sendEmailVerification, isPending, isSuccess } = useSendEmailVerification();

  if (isSuccess) {
  }

  return (
    <>
      <p>
        Verify your email to unlock all of the features available in our website. If you
        haven&apos;t gotten the link, We can send you again.
      </p>
      <Button
        onSubmit={() => sendEmailVerification()}
        type="button"
        isLoading={isPending}
        disabled={isPending}
        className="btn-submit-auth"
      >
        Send
      </Button>
    </>
  );
}
