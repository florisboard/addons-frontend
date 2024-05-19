import React from 'react';
import { HiOutlineComputerDesktop, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useStore } from '@/hooks';
import Button from '@/shared/forms/Button';
import useThemeState, { TAvailableTheme } from '@/states/themeState';
import { TIcon } from '@/types';
import { cn } from '@/utils';

type TTheme = {
  title: string;
  Icon: TIcon;
  name: TAvailableTheme;
};

const themes: TTheme[] = [
  { title: 'Light', Icon: HiOutlineSun, name: 'light' },
  { title: 'Dark', Icon: HiOutlineMoon, name: 'dark' },
  { title: 'System', Icon: HiOutlineComputerDesktop, name: 'system' },
];

export default function ThemeSwitcher() {
  const currentTheme = useStore(useThemeState, (state) => state.theme);
  const setTheme = useThemeState((state) => state.setTheme);

  return (
    <div className="join join-horizontal">
      {themes.map((theme) => (
        <div key={theme.name} className="tooltip" data-tip={theme.title}>
          <Button
            onClick={() => setTheme(theme.name)}
            className={cn('btn join-item', {
              'btn-accent': theme.name === currentTheme,
            })}
          >
            <theme.Icon className="h-6 w-6" />
          </Button>
        </div>
      ))}
    </div>
  );
}
