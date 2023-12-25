import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

export type TAvailableTheme = 'light' | 'dark' | 'system';

export interface IThemeState {
  theme: TAvailableTheme;
}

export interface IThemeAction {
  toggleTheme: () => void;
  setTheme: (theme: TAvailableTheme) => void;
}

const useThemeState = create<IThemeState & IThemeAction>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'light',
        toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
        setTheme: (theme) => set({ theme }),
      }),
      { name: 'theme' },
    ),
  ),
);

export default useThemeState;
