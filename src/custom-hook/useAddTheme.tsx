import React from "react";
import { useForm } from "react-hook-form";
import { Connect } from "../connect/Connect";
import { Theme } from "../types/user";
import { useThemesUpdateStore } from "../store/themeUpdateStore";

export const useAddTheme = () => {

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

    return {register, handleSubmit, onSubmit}
}