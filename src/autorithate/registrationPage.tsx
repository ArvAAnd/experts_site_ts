import React, { useState, ChangeEvent } from "react"
import "./registrationPage"
import { gmailPattern } from "../check pattern/GmailPattern"
import { useRegistration } from "../custom-hook/useRegistration"

export function Registration(){
    const {errors, onSubmit, register, handleSubmit, goBack} = useRegistration()
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