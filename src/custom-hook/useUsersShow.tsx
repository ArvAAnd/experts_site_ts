import React, { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { Connect } from "../connect/Connect";
import { UserFromServerT, UserT } from "../types/user";
import { useUsersStore } from "../store/usersStore";
import { UsersShow } from "../home/usersShow";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useForm } from "react-hook-form";
import { SelectProps } from "antd";
import { useThemesGet } from "./useThemesGet";


export const useUsersShow = () => {
    const {signOut, user, signIn} = useUserStore();
    const {users, setUsers} = useUsersStore()
    const {themesUpdate} = useThemesUpdateStore();
    const [search, setSearch] = useState<number[]>()
    const {themes} = useThemesGet();
    const {
      register,
      handleSubmit,
    } = useForm()

    const options: SelectProps['options'] = [];
    try{
        themes?.map((themeElem) => {
            if(themeElem.name !== undefined){
            options.push({ label: themeElem.name, value: themeElem.id })
        }
        })}catch{
            console.log("Error")
        }

    const handleSubmitSearch = (values: number[]) => {
        setSearch(values)
      }
    const onSubmitSearch = async() => {
      const response = await Connect.axiosGetUserByExpert(search)
      setUsers(response.data)
      //console.log(search)
    }

    const get_users = async() => {
      //const response = await Connect.axiosGetUser()
      const response = await Connect.axiosGetUserByExpert(user?.interests?.map((interested) => interested.id).flat())
      //console.log(user?.interests?.map((interested) => interested.id).flat())
      console.log(response.data)
      //response.data.map((user: UserFromServerT) => {console.log(user)})
      //console.log(response.data[1].experts[0])
      setUsers(response.data)
    }
  
    useEffect(() => {
      get_users()
    },[themesUpdate,])
  
  
    return {user, signIn, signOut, users, onSubmitSearch, handleSubmit, options, handleSubmitSearch}
  }
  