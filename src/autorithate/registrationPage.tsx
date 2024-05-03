import React, { useState } from "react"
import "./registrationPage"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { UserT } from "../types/user"
import {useUserStore} from "../store/userStore"
import { routes } from "../Routers"
import { Connect } from "../connect/Connect"
import { useThemesUpdateStore } from "../store/themeUpdateStore"
import { useTokenStore } from "../store/tokenStore"

export const useRegistration = () => {
  const {
    register,
    handleSubmit,
    reset
  }= useForm<UserT>()
  const {token, setToken} = useTokenStore()
  const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();

  const {user, signIn} = useUserStore()
  const navigate = useNavigate()

  const setCookie = (name: string, val: string) => {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}
function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  
  if (parts.length == 2) {
      return parts.pop()?.split(";").shift();
  }
}

  const goBack = () => {
    navigate(routes.home)
  }
  const onSubmit = async(data: UserT) => {
    try{
      
      const response = await Connect.axiosAddUser({...data})

      if(response.data.massage != "Nevdalo") {
        //console.log(response.data)
        signIn({...response.data.data})
        setToken(response.data.tocken)
        setCookie(JSON.stringify(response.data.tocken), JSON.stringify(response.data.data))
        console.log(getCookie(JSON.stringify(response.data.tocken)))
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