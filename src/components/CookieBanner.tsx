'use client';

import React, { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'react-use-cookie';
import { isbot } from 'isbot';
import Button from '@/shared/forms/Button';
import DialogModal from '@/shared/modals/DialogModal';

const cookies = [
  {
    title: 'addons_session',
    description:
      'Manages session data, including the identification of the currently authenticated user.',
  },
  {
    title: 'XSRF-TOKEN',
    description:
      'Utilizes a Cross-Site Request Forgery (CSRF) token to safeguard against unauthorized actions by enhancing security measures.',
  },
  {
    title: 'remember_web',
    description:
      'Facilitates persistent login sessions, enabling users to remain signed in for a long time.',
  },
];

const cookieName = 'cookies_accepted';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // don't show the modal for bots like google etc ...
    if (!isbot(navigator.userAgent) && !getCookie(cookieName)) setShow(true);
  }, []);

  const handleAccept = () => {
    setShow(false);
    setCookie(cookieName, '1', { days: 365 });
  };

  if (!show) return null;

  return (
    <DialogModal
      parentClassName="h-4/5 md:h-auto"
      dialogClassName="modal-open modal-bottom md:modal-middle"
      id="cModal"
    >
      <h2 className="text-lg font-bold md:text-2xl">
        We only use <span className="text-primary">Necessary Cookies</span>
      </h2>
      <p className="text-base-content/80">
        Cookies are small text files placed on your computer to support authentication. The Addons
        Store only places strictly necessary cookies on your computer, this list describes all
        cookies and their use:
      </p>
      {cookies.map((cookie) => (
        <p key={cookie.title} className="text-base-content/80">
          <span className="badge badge-neutral">{cookie.title}</span> {cookie.description}
        </p>
      ))}
      <Button onClick={handleAccept} className="btn btn-primary">
        OK
      </Button>
    </DialogModal>
  );
}
