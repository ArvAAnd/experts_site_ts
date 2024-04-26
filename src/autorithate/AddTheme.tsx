import React from "react";
import { useForm } from "react-hook-form";
import { Connect } from "../connect/Connect";
import { Theme } from "../types/user";
import { useThemesUpdateStore } from "../store/themeUpdateStore";

export const AddTheme = () => {
    const {
        register,
        handleSubmit,
    } = useForm<Theme>();

    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore()

    const onSubmit = async(data: Theme) => {
        try{
        console.log(data)
        const response = await Connect.axiosAddTheme(data)
        console.log(response.data.message)
        setThemesUpdate(!themesUpdate)
        }catch{
            console.log("Can't to add theme")
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                type="text"
                {...register('name', {required: 'name is required'})}/>
            <input type="submit" value={"Add Theme"}/>
        </form>
        )
    
}