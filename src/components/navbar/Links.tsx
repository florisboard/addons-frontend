import React from 'react';
import Link from 'next/link';
import { navbarLinks } from '@/fixtures/navbar';

export default function Links() {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {navbarLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
