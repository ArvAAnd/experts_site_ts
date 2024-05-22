import React, { FC, useEffect } from "react";
import { Connect } from '../connect/Connect';
import { useUserStore } from '../store/userStore';
import { useThemesUpdateStore } from '../store/themeUpdateStore';
import { useTokenStore } from "../store/tokenStore";
import Cookies from 'js-cookie';

//export const useAuth:FC<{ children: JSX.IntrinsicElements }> = ({children}) => {
export const useAuth = () => {
    const {user ,signIn} = useUserStore()
    const token = Cookies.get('token')
    console.log(token)
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore()
    
    const getRespCookie = async () => {
        if(token) {
            const response = await Connect.axiosPostToken(token)
            signIn({...response.data})
            setThemesUpdate(!themesUpdate)
            //console.log(response)
        }
    }

    useEffect(() => {
        getRespCookie()
    },[])

    return {user}
    //return <>{children}</>
}