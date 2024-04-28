import { create } from 'zustand';

import { User } from '$/types';

export type Session = User | null;

type State = {
  session: Session;
  setSession: (session: Session) => void;
};

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) =>
    set({
      session: payload,
    }),
}));

export default useStore;
