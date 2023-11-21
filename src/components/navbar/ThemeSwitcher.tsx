import React from 'react';
import { useStore } from 'zustand';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Button from '@/shared/Button';
import useThemeState, { TAvailableTheme } from '@/states/themeState';
import { TIcon } from '@/types';
import { cn } from '@/utils';

type TTheme = {
  name: string;
  Icon: TIcon;
  theme: TAvailableTheme;
};

const themes: TTheme[] = [
  { name: 'Light', Icon: SunIcon, theme: 'light' },
  { name: 'Dark', Icon: MoonIcon, theme: 'dark' },
  { name: 'System', Icon: ComputerDesktopIcon, theme: 'system' },
];

export default function ThemeSwitcher() {
  const currentTheme = useStore(useThemeState, (state) => state.theme);
  const setTheme = useThemeState((state) => state.setTheme);

  return (
    <div className="join join-horizontal">
      {themes.map((theme) => (
        <div key={theme.theme} className="tooltip" data-tip={theme.name}>
          <Button
            onClick={() => setTheme(theme.theme)}
            className={cn('btn join-item', {
              'btn-accent': theme.theme === currentTheme,
            })}
          >
            <theme.Icon className="h-6 w-6" />
          </Button>
        </div>
      ))}
    </div>
  );
}
