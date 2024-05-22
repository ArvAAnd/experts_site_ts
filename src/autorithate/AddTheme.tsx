import React from "react";
import { useAddTheme } from "../custom-hook/useAddTheme";

export const AddTheme = () => {
    const {register, handleSubmit, onSubmit} = useAddTheme()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                type="text"
                {...register('name', {required: 'name is required'})}/>
            <input type="submit" value={"Add Theme"}/>
        </form>
        )
    
}