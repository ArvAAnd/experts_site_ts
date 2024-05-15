import React, { useState, ChangeEvent } from "react"
import "./registrationPage"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { UserRegistrationT, UserT } from "../types/user"
import {useUserStore} from "../store/userStore"
import { routes } from "../Routers"
import { Connect } from "../connect/Connect"
import { useThemesUpdateStore } from "../store/themeUpdateStore"
import { gmailPattern } from "../check pattern/GmailPattern"

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
        document.cookie = JSON.stringify(response.data.tocken) + "=" + response.data.data.id + "; path=/"
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

export function Registration(){
    const {errors, onSubmit, register, reset, handleSubmit, goBack} = useRegistration()
    return(
        <div className="main">
        <form onSubmit={handleSubmit(onSubmit)} className="allInputLines">
        <div className="inputLine">
          <p>Name</p>
          <input 
            placeholder="Maik Vathovskiy" 
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
        <div className="inputLine">
          <p>Gmail</p>
          <input
            placeholder="test@gmail.com"
            type="text" 
            {...register('gmail', {required: true, pattern: {
                value: gmailPattern, 
                message: 'Gmail is not valid', 
              }})
            }/>
          {errors.gmail?.message && <p>{errors.gmail.message}</p>}
        </div>
        <input type="submit" value="Autorizate"/>
      </form>
      <button onClick={goBack}>Back</button>
    </div>
    )
}