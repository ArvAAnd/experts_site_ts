import React from "react";
import { Connect } from "./connect/Connect";
import { UserT } from "./types/user";
import {UserFromServerT} from "./types/user"
import { useForm } from "react-hook-form";
import { useUserStore } from "./store/userStore";

export const St = (users: UserFromServerT[], setUsers: React.Dispatch<React.SetStateAction<UserFromServerT[]>>) => {
    
    
    // const changeC = async() => {
    //     const {user, signIn} = useUserStore();

    //     if(user){
    //         signIn({...user, "c++":true})
    //         const response = await Connect.axiosUpdate(user)  
    //         console.log(response.data.message)  
    //     }
    // }
    // const {register, handleSubmit} = useForm()

    return (
        <></>
        // <form onSubmit={handleSubmit(changeC)}>
        //     <h1>Change C</h1>
        //     <input {...register("userId")} placeholder="Name" />
        // </form>
    )
}