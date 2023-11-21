import React from 'react';
import Link from 'next/link';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { links } from './Links';
import Search from './Search';

export default function MobileDropdown() {
  return (
    <div className="navbar-start md:w-auto lg:hidden">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-circle btn-ghost">
          <Bars3BottomLeftIcon className="h-6 w-6" />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-[95vw] rounded-box bg-base-100 p-2 shadow md:menu-md"
        >
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
          <Search className="w-full md:hidden" />
        </ul>
      </div>
    </div>
  );
}
