'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import Search from '../../shared/forms/Search';
import Links from './Links';
import MobileDropdown from './MobileDropdown';
import Profile from './Profile';

function canShowGlobalSearch(pathname: string) {
  return ['/projects', '/categories', '/domains'].every((path) => !pathname.startsWith(path));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isGlobalSearchActive = useMemo(() => canShowGlobalSearch(pathname), [pathname]);

  useEffect(() => {
    const checkScrollTop = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  return (
    <header
      className={cn('navbar sticky right-0 top-0 z-10 bg-base-100 transition-shadow delay-100', {
        'shadow-md': isScrolled,
      })}
    >
      <MobileDropdown isSearchActive={isGlobalSearchActive} />
      <div className="navbar-center md:navbar-start md:flex-shrink">
        <Link href="/" className="btn btn-ghost text-xl">
          <span className="hidden md:block">FlorisBoard Addons</span>
          <span className="md:hidden">Addons</span>
        </Link>
      </div>
      <Links />
      <div className="navbar-end items-center gap-2">
        {isGlobalSearchActive && (
          <Suspense>
            <Search className="hidden md:form-control" />
          </Suspense>
        )}
        <Profile />
      </div>
    </header>
  );
}
