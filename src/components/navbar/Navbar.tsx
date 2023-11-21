import React from 'react';
import Link from 'next/link';
import Links from './Links';
import MobileDropdown from './MobileDropdown';
import Profile from './Profile';
import Search from './Search';

export default function Navbar() {
  return (
    <header className="navbar">
      <MobileDropdown />
      <div className="navbar-center md:navbar-start md:flex-shrink">
        <Link href="/" className="btn btn-ghost text-xl">
          FlorisBoard Addons
        </Link>
      </div>
      <Links />
      <div className="navbar-end items-center gap-2">
        <Search className="hidden md:form-control" />
        <Profile />
      </div>
    </header>
  );
}
