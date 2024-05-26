'use client';

import React from 'react';
import Avatar from 'react-avatar';
import Link from 'next/link';
import compact from 'lodash/compact';
import useLogout from '@/services/auth/logout';
import useMe from '@/services/users/me';
import Button from '@/shared/forms/Button';
import ThemeSwitcher from './ThemeSwitcher';

export default function Profile() {
  const { mutate: logout } = useLogout();
  const { data: user } = useMe();

  const guestLinks = [
    { title: 'Login', href: '/login' },
    { title: 'Register', href: '/register' },
  ];
  const authLinks = compact([
    { title: 'Profile', href: `/users/${user?.username}` },
    { title: 'Domains', href: `/domains` },
    { title: 'New Project', href: `/projects/create` },
  ]);
  const links = user ? authLinks : guestLinks;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
        <Avatar round size="40" name={user?.username ?? '?'} />
      </label>
      <ul
        tabIndex={0}
        className="w-50 menu dropdown-content menu-sm z-[1] mt-3 gap-2 rounded-box bg-base-100 p-2 shadow"
      >
        {links.map((link) => (
          <li key={link.title}>
            <Link href={link.href}>{link.title}</Link>
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
