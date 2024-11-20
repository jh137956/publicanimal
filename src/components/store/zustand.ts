import { create } from "zustand";
import { User } from "./interface";

// 상태 스토어 정의
export interface UserStore {
    user: User | undefined;
    setUser: (user: User) => void;
    removeUser: () => void;
  }

const useUserStore = create<UserStore>((set) => ({
    user: undefined,
    setUser: (user: User) => set(() => ({ user })),
    removeUser: () => set({ user: undefined }),
}));



export default useUserStore;