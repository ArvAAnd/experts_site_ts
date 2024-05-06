import React, { useEffect, useState } from "react";
import { routes } from "../Routers";
import { useNavigate, useParams } from "react-router";
import { Connect } from "../connect/Connect";
import { UserT } from "../types/user";

export const UserPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [userPicked, setUserPicked] = useState<UserT>()

    const getUserById = async() => {
        const response = await Connect.axiosGetUserById(Number(id))
        setUserPicked({...response.data})
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
        </div>}
        <button onClick={()=>navigate(routes.home)}>Back to home</button>
        </div>
}