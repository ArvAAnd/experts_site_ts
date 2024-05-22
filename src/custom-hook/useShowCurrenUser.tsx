import React from "react";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useChangedModeStore } from "../store/changedMode";
import { Connect } from "../connect/Connect";
import { useUserStore } from "../store/userStore";
import Cookies from "js-cookie";
export const useShowCurrentUser = () => {
    const {user, signOut} = useUserStore();
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    const {changedMode, setChangedMode} = useChangedModeStore();
    
    const Logout = async()=> {
        signOut();
        Cookies.remove('token')//delete cookie 
        await Connect.axiosDeleteToken(Cookies.get('token')!)
        setChangedMode(false)
        setThemesUpdate(!themesUpdate)
        }

    return {user, Logout}
}