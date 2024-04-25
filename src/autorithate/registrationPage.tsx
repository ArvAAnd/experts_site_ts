import React, { useState } from "react"
import "./registrationPage"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { UserT } from "../types/user"
import {useUserStore} from "../store/userStore"
import { routes } from "../Routers"
import { Connect } from "../connect/Connect"

export const useRegistration = () => {
  const {
    register,
    handleSubmit,
    reset
  }= useForm<UserT>()

  

  const {user, signIn} = useUserStore()
  const navigate = useNavigate()
  const onSubmit = async(data: UserT) => {
    try{
      signIn({...data})
      
      const response = await Connect.axiosPost({...data, "c++":false})
      //console.log(response)
      //console.log(data, user)
      navigate(routes.home)
    }catch{
      alert("Can't to autorizate")
    }finally{}
  }
  return {onSubmit, register, reset, handleSubmit}
}

export function Registration(){
    const {onSubmit, register, reset, handleSubmit} = useRegistration()
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
    </div>
    )
}