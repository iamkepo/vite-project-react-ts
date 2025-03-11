import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  id: number;
  username: string;
  role: string;
  init: () => void;
};

const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'useAuthStore' });

export const useAuthStore = create<State>()(
  myMiddlewares((set) => ({
    id: 0,
    username: '',
    role: '',
    init: () => set(() => ({ id: 0, username: '', role: ''})),
  })),
);

export const setSession = (data: {id: number; username: string; role: string; }) => {
  useAuthStore.setState({ id: data.id, username: data.username, role: data.role });
};
export const logout = () => {
  const { init } = useAuthStore.getState();
  init()
  window.location.reload()
}