import React, { useState } from "react"
import "./registrationPage"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { UserT } from "../types/user"
import {useUserStore} from "../store/userStore"
import { routes } from "../Routers"
import { Connect } from "../connect/Connect"
import { useThemesUpdateStore } from "../store/themeUpdateStore"

export const useRegistration = () => {
  const {
    register,
    handleSubmit,
    reset
  }= useForm<UserT>()

  const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();

  const {user, signIn} = useUserStore()
  const navigate = useNavigate()

  const goBack = () => {
    navigate(routes.home)
  }
  const onSubmit = async(data: UserT) => {
    try{
      
      const response = await Connect.axiosAddUser({...data})

      if(response.data.massage != "Nevdalo") {
        console.log(response.data)
        signIn({...response.data})   
        //console.log(response.data)    
        navigate(routes.pick_theme)
      } 
      else alert("Users with this name already exist") 
      
      //console.log(response)
      //console.log(data, user)
    }catch{
      alert("Can't to registrate")
    }finally{}
  }
  return {onSubmit, register, reset, handleSubmit, goBack}
}

export function Registration(){
    const {onSubmit, register, reset, handleSubmit, goBack} = useRegistration()
    return(
        <div className="main">
        <form onSubmit={handleSubmit(onSubmit)} className="allInputLines">
        <div className="inputLine">
          <p>Name</p>
          <input 
            placeholder="Arsen" 
            type="text"
            {...register('name', {required: 'name is required'})}
          />
        </div>
        <div className="inputLine">
          <p>Password</p>
          <input
            placeholder="0000"
            type="text" 
            {...register('password', {required: 'Password is required'})}
          />
          
        </div>
        <input type="submit" value="Autorizate"/>
      </form>
      <button onClick={goBack}>Back</button>
    </div>
    )
}