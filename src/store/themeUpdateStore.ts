import {create} from "zustand";


type State = {
    themesUpdate: boolean
}

type Actions = {
    setThemesUpdate: (themesUpdate: boolean) => void
}

export const useThemesUpdateStore = create<State & Actions>((set) => ({
    themesUpdate: false,
    setThemesUpdate: (themesUpdate) => set(() => ({themesUpdate}))
}))