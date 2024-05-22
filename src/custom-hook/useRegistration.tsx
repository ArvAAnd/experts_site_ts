import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { UserRegistrationT, UserT } from "../types/user"
import {useUserStore} from "../store/userStore"
import { routes } from "../Routers"
import { Connect } from "../connect/Connect"
import { useThemesUpdateStore } from "../store/themeUpdateStore"
import { useTokenStore } from "../store/tokenStore"
import Cookies from 'js-cookie';

export const useRegistration = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    }= useForm<UserRegistrationT>({
      mode: 'onChange'
    })
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    const [email, setEmail] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const {user, signIn} = useUserStore()
    const navigate = useNavigate()
    const {setToken} = useTokenStore()
  
    function getCookie(name: string) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      
      if (parts.length == 2) {
          return parts.pop()?.split(";").shift();
      }
    }
  
    // const handleChangeGmail = (e: ChangeEvent<HTMLInputElement>) => {
    //   const inputEmail = e.target.value;
    //   setEmail(inputEmail);
    //   const isValid = gmailPattern.test(inputEmail);
    //   setIsValidEmail(isValid);
    // }
  
    const goBack = () => {
      navigate(routes.home)
    }
    const onSubmit = async(data: UserRegistrationT) => {
      errors.gmail && console.log(errors.gmail.message)
      try{
        
        const response = await Connect.axiosAddUser({...data})
  
        if(response.data.massage != "Nevdalo") {
          //console.log(response.data)
          signIn({...response.data.data})
          Cookies.set('token', JSON.stringify(response.data.tocken), {path: '/'})
          setToken(JSON.stringify(response.data.tocken))
          //document.cookie = JSON.stringify(response.data.tocken) + "=" + response.data.data.id + "; path=/"
          //console.log(getCookie(response.data.tocken))
          //console.log(response.data)    
          setThemesUpdate(!themesUpdate)
          navigate(routes.pick_theme)
        } 
        else alert("Users with this name already exist") 
        
        //console.log(response)
        //console.log(data, user)
      }catch{
        alert("Can't to registrate")
      }finally{}
    }
    return {errors, onSubmit, register, reset, handleSubmit, goBack}
  }