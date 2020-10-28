import create from "zustand";
type State = {
  selectedChannel: string | null;
  selectChannel: (id: string) => void;
};

export const useStore = create<State>((set) => ({
  selectedChannel: null,
  selectChannel: (id: string) => set((state) => ({ selectedChannel: id })),
}));
