import {create} from "zustand";
import { UserFromServerT } from "../types/user";

type State = {
    users: UserFromServerT[][]
}


type Actions = {
    setUsers: (users: UserFromServerT[][]) => void
}

export const useUsersStore = create<State & Actions>((set) => ({
    users: [],
    setUsers: (users) => set(() => ({users}))
}))