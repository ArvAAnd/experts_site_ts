import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Connect } from "../connect/Connect";
import { UserT } from "../types/user";
import { useUsersShow } from "../custom-hook/useUsersShow";

export const useUserPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [userPicked, setUserPicked] = useState<UserT>()
    const rate = [1, 2, 3, 4, 5]
    const {user} = useUsersShow()
    const getUserById = async() => {
        const response = await Connect.axiosGetUserById(Number(id))
        console.log(response.data)
        setUserPicked({...response.data})
    }

    const giveRating = async(rat: number) => {
        if(user) {
            const response = await Connect.axiosGiveRating({
                rating: rat, 
                idUserRated: Number(id), 
                idUserRating: user.id
            })
            console.log(response.data)
            if(response.data.message === 'You alredy rated'){
                alert('You alredy rated')
            }
        }
        else console.log("Current user haven't")
    }

    useEffect(() => {
        getUserById()
    }, [id])

    return {
        userPicked,
        giveRating,
        navigate,
        rate
    }
}