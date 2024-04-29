import {create} from "zustand";

type State = {
    changedMode: boolean
}

type Actions = {
    setChangedMode: (changedMode: boolean) => void
}

export const useChangedModeStore = create<State & Actions>((set) => ({
    changedMode: false,
    setChangedMode: (changedMode) => set(() => ({changedMode}))
}))