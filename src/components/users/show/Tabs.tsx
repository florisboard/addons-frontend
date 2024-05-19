import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import config from '@/fixtures/config';
import { TIcon } from '@/types';
import { cn } from '@/utils';

export type TTab = {
  name: string;
  icon: { base: TIcon; active: TIcon };
  label: string;
  component: React.ReactNode;
};

type TabsProps = {
  tabs: TTab[];
  activeTab: TTab;
};

export default function Tabs({ tabs, activeTab }: TabsProps) {
  const pathname = usePathname();

  return (
    <div role="tablist" className="tabs tabs-bordered">
      {tabs.map((tab) => {
        const isActive = activeTab?.name === tab.name;
        const Icon = isActive ? tab.icon.active : tab.icon.base;

        return (
          <Link
            key={tab.name}
            href={`${pathname}?${config.tabParamsKey}=${tab.name}`}
            role="tab"
            className={cn('tab h-14 min-w-fit gap-2 md:h-auto', { 'tab-active': isActive })}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
