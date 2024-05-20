import React, { useEffect, useState } from "react";
import { routes } from "../Routers";
import { useNavigate, useParams } from "react-router";
import { Connect } from "../connect/Connect";
import { UserT } from "../types/user";
import { useUsersShow } from "../custom-hook/useUsersShow";

export const UserPage = () => {
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
    return <div>
        {userPicked && <div>
            <p>Name: {userPicked.name}</p>
            <p>Expert:</p>
            <div>
                {userPicked.experts?.map((expert) => {
                    return <p key={expert.id}>{expert.name}</p>
                })}
            </div> 
            <p>Interested:</p>
            <div>
                {userPicked.interests?.map((interested) => {
                    return <p key={interested.id}>{interested.name}</p>
                })}
            </div>
            {
                userPicked.contacts !== '' ? 
                    <>
                    <p>Contacts:</p>
                    <div>
                        <p>{userPicked.contacts}</p>
                    </div>
                    </>
                    : null
            } 
            <p>Rating: {userPicked.rating}</p>
            {
                rate.map((rat) => {
                    return <button key={rat} onClick={() => giveRating(rat)}>{rat}</button>
                })
            }
        </div>}
        <button onClick={()=>navigate(routes.home)}>Back to home</button>
        </div>
}