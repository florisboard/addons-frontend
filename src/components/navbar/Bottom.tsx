'use client';

import React, { useMemo } from 'react';
import {
  HiFire,
  HiHome,
  HiOutlineFire,
  HiOutlineHome,
  HiOutlineUser,
  HiUser,
} from 'react-icons/hi2';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useGetMe from '@/services/users/me';
import { cn } from '@/utils';

export default function Bottom() {
  const pathname = usePathname();
  const { data: me } = useGetMe();

  const links = useMemo(
    () => [
      {
        title: 'Projects',
        Icon: HiOutlineFire,
        ActiveIcon: HiFire,
        href: '/projects',
      },
      {
        title: 'Home',
        Icon: HiOutlineHome,
        ActiveIcon: HiHome,
        href: '/',
      },
      {
        title: 'Profile',
        Icon: HiOutlineUser,
        ActiveIcon: HiUser,
        href: me ? `/users/${me.username}` : '/login',
      },
    ],
    [me],
  );

  return (
    <nav className="px-container btm-nav z-10 md:hidden">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = isActive ? link.ActiveIcon : link.Icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn('relative', { 'active text-primary': isActive })}
          >
            <Icon className="h-6 w-6" />
            <span className="btm-nav-label text-sm font-medium">{link.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
