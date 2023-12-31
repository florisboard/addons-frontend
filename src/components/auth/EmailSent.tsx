import React from 'react';
import emailSent from '@/assets/animations/emailSent.json';
import { Player } from '@lottiefiles/react-lottie-player';

type EmailSentProps = {
  actionText: string;
};

export default function EmailSent({ actionText }: EmailSentProps) {
  return (
    <>
      <p>We&apos;ve sent you the instructions on how to {actionText}, Check your email.</p>
      <Player
        className="mx-auto"
        src={emailSent}
        autoplay
        loop={false}
        style={{ width: 150, height: 150 }}
      />
    </>
  );
}
