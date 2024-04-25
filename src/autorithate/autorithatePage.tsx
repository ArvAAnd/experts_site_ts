import React from "react";
import { useForm } from "react-hook-form";
import { UserT } from "../types/user";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router";
import { routes } from "../Routers";
import { useUsersStore } from "../store/usersStore";

export const Autorithation = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<UserT>()

    const {users, setUsers} = useUsersStore()
    const {user, signIn} = useUserStore()
    const navigate = useNavigate()

    const goBack = () => {
        navigate(routes.home)
    }

    const onSubmit = async(data: UserT) => {
        try{
            if(users.filter(el => el.name === data.name && el.password === data.password).length != 0){
                signIn({...users.filter(el => el.name === data.name && el.password === data.password)[0]})
                goBack()
            }
            else{
                alert("User not found")
            }
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