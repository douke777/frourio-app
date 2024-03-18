import { create } from 'zustand';

type State = {
  isLoading: boolean;
  toggleLoading: () => void;
};

const useStore = create<State>((set) => ({
  isLoading: false,
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
}));

export default useStore;
