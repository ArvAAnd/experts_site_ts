import { create } from 'zustand'
import { UserT } from '../types/user';

type State = {
    user:UserT | null;
    loading:boolean
}

type Actions = {
    signIn:(userData:UserT) => void,
    signOut:() => void;
    // setToken:(token:string) => void,
    // setAvatar:(avatar:string) => void,
    // startLoading:() => void,
    // stopLoading:() => void,
    // setActive:() => void
}
type StoreType = State & Actions;

export const useUserStore = create<StoreType>((set) => ({
    user:{
        id: -1,
        name: '',
        password: '',
        experts: [],
        interesteds: []
    },
    loading:false,
    // startLoading:() => set((state) => ({...state,loading:true})),
    // stopLoading:() => set((state) => ({...state,loading:false})),
    signIn: (userData) => set((state) => ({ ...state,user:{...state.user,...userData} })),
    signOut: () => set(() => ({
        user:null,
        loading:false
    })),
    // setToken: (token:string) => set((state) => ({
    //     user:{...state.user,token}
    // // })), 
    // setAvatar: (avatar:string) => set((state) => ({
    //     user:{...state.user,avatar}
    // })),
    // setActive: () => set((state) => ({...state,user:{...state.user,is_active:true}}))
}));