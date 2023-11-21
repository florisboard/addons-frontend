'use client';

import React from 'react';
import Button from '@/shared/Button';
import useThemeState from '@/states/themeState';

export default function Home() {
  const toggleTheme = useThemeState((state) => state.toggleTheme);

  return (
    <main>
      <h1>Home</h1>
      <Button onClick={toggleTheme} className="btn btn-primary text-base">
        Change Theme
      </Button>
    </main>
  );
}
