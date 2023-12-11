import React from 'react';
import Lottie from 'react-lottie-player';
import emailSent from '@/assets/animations/emailSent.json';

type EmailSentProps = {
  actionText: string;
};

export default function EmailSent({ actionText }: EmailSentProps) {
  return (
    <>
      <p>We&apos;ve sent you the instructions on how to {actionText}, Check your email.</p>
      <Lottie
        className="mx-auto"
        animationData={emailSent}
        play
        loop={false}
        style={{ width: 150, height: 150 }}
      />
    </>
  );
}
