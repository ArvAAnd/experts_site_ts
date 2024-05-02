import React, { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { Connect } from "../connect/Connect";
import { UserFromServerT, UserT } from "../types/user";
import { useUsersStore } from "../store/usersStore";
import { UsersShow } from "../home/usersShow";
import { useThemesUpdateStore } from "../store/themeUpdateStore";


export const useUsersShow = () => {
    const {signOut, user, signIn} = useUserStore();
    const {users, setUsers} = useUsersStore()
    const {themesUpdate} = useThemesUpdateStore();
    // const stayC = () => {
    //   user ? (
    //     signIn({...user, "c++":true})
    //     ) : alert("")
    // }
  
  //   const changeC = async() => {
  //     const {user, signIn} = useUserStore();
  
  //     if(user){
        
  //       const response = await Connect.axiosUpdate({...users.filter(el => el.name === user.name)[0], "c++":!user["c++"]})  
  //       console.log(response.data.message)  
  //       console.log({...users.filter(el => el.name === user.name)[0], "c++":!user["c++"]})
  //       setChanged(chanhed => !chanhed)
  //     }
  // }
    
  
    const get_users = async() => {
      const response = await Connect.axiosGetUser()
      //response.data.map((user: UserFromServerT) => {console.log(user)})
      //console.log(response.data[1].experts[0])
      setUsers(response.data)
    }
  
    useEffect(() => {
      get_users()
    },[])
  
  
    return {user, signIn, signOut, users}
  }
  