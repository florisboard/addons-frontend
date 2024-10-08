import React, { Suspense, useRef } from 'react';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import Link from 'next/link';
import { navbarLinks } from '@/fixtures/navbar';
import Search from '@/shared/forms/Search';

type MobileDropdownProps = {
  isSearchActive: boolean;
};

export default function MobileDropdown({ isSearchActive }: MobileDropdownProps) {
  const isOpen = useRef(false);

  return (
    <div className="navbar-start md:w-auto lg:hidden">
      <div className="dropdown">
        <label
          onClick={(e) => {
            if (isOpen.current) {
              e.currentTarget.blur();
            }
            isOpen.current = !isOpen.current;
          }}
          tabIndex={0}
          className="btn btn-circle btn-ghost"
        >
          <HiBars3BottomLeft className="h-6 w-6" />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-[95vw] rounded-box bg-base-100 p-2 shadow md:menu-md"
        >
          {navbarLinks.map((link) => (
            <li key={link.title}>
              <Link onClick={(e) => e.currentTarget.blur()} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
          {isSearchActive && (
            <Suspense>
              <Search className="w-full md:hidden" />
            </Suspense>
          )}
        </ul>
      </div>
    </div>
  );
}
