import React, { useEffect, useState } from "react";
import { useThemesGet } from "../custom-hook/useThemesGet";
import { useForm } from "react-hook-form";
import { Theme, ThemeFromServerT } from "../types/user";
import { Connect } from "../connect/Connect";
import { useUserStore } from "../store/userStore";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useNavigate } from "react-router";
import { routes } from "../Routers";
import { useChangedModeStore } from "../store/changedMode";
import type { SelectProps } from 'antd';
import axios from "axios";
type GetId = {
    themesIdExpert: number[],
    themesIdInterested: number[],
}
export const useThemesShow = () => {
    const {themes} = useThemesGet();
    const {user, signIn} = useUserStore();
    const {changedMode} = useChangedModeStore();
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    const [themeExpert, setThemeExpert] = useState<number[]>([]);
    const [themeInterested, setThemeInterested] = useState<number[]>([]);
    const {
        register,
        reset,
        handleSubmit,
        getValues
    } = useForm<GetId>();

    
    const options: SelectProps['options'] = [];
    try{
        themes?.map((themeElem) => {
            if(themeElem.name !== undefined){
            options.push({ label: themeElem.name, value: themeElem.id })
        }
        })}catch{
            console.log("Error")
        }

    
    useEffect(() => {
        const defaltExpert = user?.experts?.map((expert) => expert.id).flat()
        if(defaltExpert) setThemeExpert(defaltExpert)

        const defaltInteres = user?.interests?.map((interested) => interested.id).flat()
        if(defaltInteres) setThemeInterested(defaltInteres)
    }, [])

    
    const defaultForExpert = () => {
        if(changedMode===true){
            const defalt = user?.experts?.map((expert) => expert.id).flat()
            return defalt
        }
        else return []
    }
    const defaultForInterested = () => {
        if(changedMode===true){
            return user?.interests?.map((interested) => interested.id).flat()
        }
        else return []
    }

    const handleSubmitExpert = (values: number[]) => {
            setThemeExpert(values)
        }

        const handleSubmitInterested = (values: number[]) => {
            setThemeInterested(values)
        }

    const navigate = useNavigate();
    const onSubmit = async() => {
        //console.log(themeExpert, themeInterested)
        const response = await Connect.axiosStayExpertOrInterested(
            { 
                changeMode: changedMode,
                user_id: user ? user.id : 0, 
                themesIdExpert: themeExpert,
                themesIdInterested: themeInterested
            }
        )
        console.log({...user, experts:response.data.experts, interests:response.data.interesteds})
        if(user!==null) signIn({...user, experts:response.data.experts, interests:response.data.interesteds})
        //console.log(response.data)
        reset()
        setThemesUpdate(!themesUpdate)
        navigate(routes.current_user_page)
    }

    return {handleSubmit, onSubmit, handleSubmitExpert, handleSubmitInterested, options, defaultForExpert, defaultForInterested}
}