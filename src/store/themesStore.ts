import {create} from "zustand";
import { ThemeFromServerT } from "../types/user";

type State = {
    themes: ThemeFromServerT[]
}

type Actions = {
    setThemes: (themes: ThemeFromServerT[]) => void
}

export const useThemesStore = create<State & Actions>((set) => ({
    themes: [],
    setThemes: (themes) => set(() => ({themes}))
}))