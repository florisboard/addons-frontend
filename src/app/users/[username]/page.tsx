'use client';

import React, { useMemo } from 'react';
import Avatar from 'react-avatar';
import {
  HiFire,
  HiOutlineFire,
  HiOutlineRectangleStack,
  HiOutlineStar,
  HiRectangleStack,
  HiStar,
} from 'react-icons/hi2';
import { useParams } from 'next/navigation';
import Collections from '@/components/users/show/Collections';
import DeleteAccount from '@/components/users/show/DeleteAccount';
import ProfileUpdate from '@/components/users/show/ProfileUpdate';
import Projects from '@/components/users/show/Projects';
import Reviews from '@/components/users/show/Reviews';
import Tabs, { TAB_PARAM_KEY, TTab } from '@/components/users/show/Tabs';
import { useSearchParams } from '@/hooks';
import useMe from '@/services/users/me';
import useUser from '@/services/users/show';

export default function User() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const { data: me } = useMe();
  const { data: user, isError } = useUser(username);
  const isCurrentUser = username === me?.username;

  const tabs: TTab[] = useMemo(() => {
    return [
      {
        name: 'projects',
        icon: { base: HiOutlineFire, active: HiFire },
        label: 'Projects',
        component: <Projects isCurrentUser={isCurrentUser} userId={user.id} />,
      },
      {
        name: 'reviews',
        icon: { base: HiOutlineStar, active: HiStar },
        label: 'Reviews',
        component: <Reviews userId={user.id} />,
      },
      {
        name: 'collections',
        icon: { base: HiOutlineRectangleStack, active: HiRectangleStack },
        label: 'Collections',
        component: <Collections />,
      },
    ];
  }, [user, isCurrentUser]);

  const activeTab = tabs.find((tab) => tab.name === searchParams.get(TAB_PARAM_KEY)) ?? tabs[0];

  if (isError) return <p>User not found.</p>;
  return (
    <div className="px-container space-y-4">
      <div className="space-y-4 rounded-box bg-base-200 p-4">
        <div className="flex items-center gap-4">
          <Avatar round size="40" name={username} />
          <h1 className="h1 text-center md:text-left">{username}</h1>
        </div>
        <Tabs activeTab={activeTab} tabs={tabs} />
        {activeTab.component}
      </div>
      {isCurrentUser && (
        <>
          <div className="divider" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProfileUpdate />
            <DeleteAccount />
          </div>
        </>
      )}
    </div>
  );
}
