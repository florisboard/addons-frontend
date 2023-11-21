import { create } from 'zustand';

interface IAuthState {
  isLoggedIn: null | boolean;
  user: any | null;
  clearUser: () => void;
  setUser: (user: Partial<any>) => void;
}

const useAuthState = create<IAuthState>((set) => ({
  isLoggedIn: null,
  user: null,
  clearUser: () => set({ user: null, isLoggedIn: false }),
  setUser: (user) => set((state) => ({ isLoggedIn: true, user: { ...state.user!, ...user } })),
}));

export default useAuthState;
