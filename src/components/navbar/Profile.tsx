'use client';

import React from 'react';
import Avatar from 'react-avatar';
import Link from 'next/link';
import compact from 'lodash/compact';
import { useAuthRoutes } from '@/hooks';
import useLogout from '@/services/auth/logout';
import useMe from '@/services/users/me';
import Button from '@/shared/Button';
import ThemeSwitcher from './ThemeSwitcher';

export default function Profile() {
  const { login, register, emailVerification } = useAuthRoutes();
  const { mutate: logout } = useLogout();
  const { data: user } = useMe();

  const guestLinks = [
    { name: 'Login', href: login },
    { name: 'Register', href: register },
  ];
  const authLinks = compact([
    { name: 'Profile', href: `/users/${user?.username}` },
    { name: 'New Project', href: `/projects/create` },
    !user?.email_verified_at && { name: 'Verify your Email', href: emailVerification },
  ]);
  const links = user ? authLinks : guestLinks;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
        <Avatar round size="40px" name={user?.username ?? '?'} />
      </label>
      <ul
        tabIndex={0}
        className="w-50 menu dropdown-content menu-sm z-[1] mt-3 gap-2 rounded-box bg-base-100 p-2 shadow"
      >
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
        {user && (
          <li>
            <Button onClick={() => logout()}>Logout</Button>
          </li>
        )}
        <ThemeSwitcher />
      </ul>
    </div>
  );
}
