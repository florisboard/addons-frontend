import React, { Suspense } from 'react';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import Link from 'next/link';
import { navbarLinks } from '@/fixtures/navbar';
import Search from '../../shared/forms/Search';

type MobileDropdownProps = {
  isSearchActive: boolean;
};

export default function MobileDropdown({ isSearchActive }: MobileDropdownProps) {
  return (
    <div className="navbar-start md:w-auto lg:hidden">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-circle btn-ghost">
          <HiBars3BottomLeft className="h-6 w-6" />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-[95vw] rounded-box bg-base-100 p-2 shadow md:menu-md"
        >
          {navbarLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
          {isSearchActive && (
            <Suspense>
              <Search placeholder="Search Projects ..." className="w-full md:hidden" />
            </Suspense>
          )}
        </ul>
      </div>
    </div>
  );
}
