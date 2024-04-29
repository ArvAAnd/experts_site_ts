import {create} from "zustand";
import {UserAndTheme} from "../types/user";

type State = {
    interesteds: UserAndTheme[]
}

type Actions = {
    setStayInteresteds: (interesteds: UserAndTheme[]) => void
}

type Store = State & Actions

export const useInterestedsStore = create<Store>((set) => ({
    interesteds: [],
    setStayInteresteds: (interesteds) => set(() => ({interesteds}))
}))