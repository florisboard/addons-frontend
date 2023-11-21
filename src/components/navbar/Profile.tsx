'use client';

import React from 'react';
import Avatar from 'react-avatar';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const guestLinks = [
  { name: 'Login', href: '/' },
  { name: 'Register', href: '/' },
];

export default function Profile() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
        <Avatar round size="40px" name="?" />
      </label>
      <ul
        tabIndex={0}
        className="w-50 menu dropdown-content menu-sm z-[1] mt-3 gap-2 rounded-box bg-base-100 p-2 shadow"
      >
        {guestLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
        <ThemeSwitcher />
      </ul>
    </div>
  );
}
