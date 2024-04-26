import {create} from "zustand";

type State = {
    selectedTheme: number
}

type Actions = {
    setSelectedTheme: (selectedTheme: number) => void
}

type Store = State & Actions

export const useSelectedTheme = create<Store>((set) => ({
    selectedTheme: 0,
    setSelectedTheme: (selectedTheme) => set(() => ({selectedTheme}))
}))