import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navbarLinks } from '@/fixtures/navbar';
import { cn } from '@/utils';

export default function Links() {
  const pathname = usePathname();

  return (
    <nav className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {navbarLinks.map((link) => (
          <li
            className={cn({
              'border-b border-primary text-primary hover:border-none': pathname === link.href,
            })}
            key={link.title}
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
