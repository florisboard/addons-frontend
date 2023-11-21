import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IThemeState {
  theme: 'light' | 'dark';
}

export interface IThemeAction {
  toggleTheme: () => void;
}

const useThemeState = create<IThemeState & IThemeAction>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
    }),
    { name: 'theme' },
  ),
);

export default useThemeState;
