import React from "react";
import { useForm } from "react-hook-form";
import { UserAuthorizationT, UserRegistrationT, UserT } from "../types/user";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router";
import { routes } from "../Routers";
import { useUsersStore } from "../store/usersStore";
import { Connect } from "../connect/Connect";
import Cookies from "js-cookie";

export const useAuthorizate = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<UserAuthorizationT>()

    const {user, signIn} = useUserStore()
    const navigate = useNavigate()

    const goBack = () => {
        navigate(routes.home)
    }

    const onSubmit = async(data: UserAuthorizationT) => {
        try{
            const response = await Connect.axiosAuthorization(data)
            signIn({...response.data.data})
            Cookies.set('token', response.data.tocken, {path: '/'})
            //document.cookie = JSON.stringify(response.data.tocken) + "=" + response.data.data.id + "; path=/"
            goBack()
        }catch{
            alert("Can't to autorizate")
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        goBack,
        navigate
    }
}