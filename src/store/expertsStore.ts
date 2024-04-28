import {create} from "zustand";
import {UserAndTheme} from "../types/user";

type State = {
    experts: UserAndTheme[]
}

type Actions = {
    setStayExpert: (experts: UserAndTheme[]) => void
}

type Store = State & Actions

export const useExpertsStore = create<Store>((set) => ({
    experts: [],
    setStayExpert: (experts) => set(() => ({experts}))
}))