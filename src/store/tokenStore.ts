import {create} from "zustand"

type State = {
    token: string | null
}

type Actions = {
    setToken: (token:string) => void
}

export const useTokenStore = create<State & Actions>((set) => ({
    token: null,
    setToken: (token:string) => set((state) => ({
        token
    }))
}))