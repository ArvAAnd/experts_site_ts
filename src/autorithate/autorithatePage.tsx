import React from "react";
import { useForm } from "react-hook-form";
import { UserRegistrationT, UserT } from "../types/user";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router";
import { routes } from "../Routers";
import { useUsersStore } from "../store/usersStore";
import { useUsersShow } from "../custom-hook/useUsersShow";
import { Connect } from "../connect/Connect";

export const Autorithation = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<UserT>()

    const {users} = useUsersShow()
    const {user, signIn} = useUserStore()
    const navigate = useNavigate()

    const goBack = () => {
        navigate(routes.home)
    }

    const onSubmit = async(data: UserRegistrationT) => {
        try{
            const response = await Connect.axiosAuthorization(data)
            signIn({...response.data.data})
            document.cookie = JSON.stringify(response.data.tocken) + "=" + response.data.data.id + "; path=/"
            goBack()
        }catch{
            alert("Can't to autorizate")
        }
    }
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