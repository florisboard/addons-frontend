import React from 'react';
import Link from 'next/link';

export const links = [
  { name: 'Themes', href: '/' },
  { name: 'About Us', href: '/' },
  { name: 'Contact Us', href: '/' },
  { name: 'Github', href: '/' },
];

export default function Links() {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
