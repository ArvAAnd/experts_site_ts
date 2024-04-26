import React, { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { Connect } from "../connect/Connect";
import { UserFromServerT, UserT } from "../types/user";
import { useUsersStore } from "../store/usersStore";
import { UsersShow } from "../home/usersShow";


export const useUsersShow = () => {
    const {signOut, user, signIn} = useUserStore();
    const {users, setUsers} = useUsersStore()
    const [chanhed, setChanged] = useState(false)
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
      console.log(response.data)
      setUsers(response.data)
    }
  
    useEffect(() => {
      get_users()
    },[chanhed])
  
  
  
    
  
    return {user, signOut, users}
  }
  