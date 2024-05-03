import {create} from "zustand";

type State = {
    token: string
}

type Actions = {
    setToken: (token:string) => void
}

export const useTokenStore = create<State & Actions>((set) => ({
    token: "",
    setToken: (token:string) => set((state) => ({...state,token}))
}))