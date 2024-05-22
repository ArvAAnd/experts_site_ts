import React from "react";
import { useAuthorizate } from "../custom-hook/useLogIn";


export const Autorithation = () => {
    const {onSubmit, register, handleSubmit, goBack} = useAuthorizate()
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p>Name</p>
                    <input
                        placeholder="Arsen"
                        type="text"
                        {...register('name', {required: 'name is required'})}
                    />
                </div>
                <div>
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