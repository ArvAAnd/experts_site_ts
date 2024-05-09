import React, { useEffect, useState } from "react";
import { routes } from "../Routers";
import { useNavigate, useParams } from "react-router";
import { Connect } from "../connect/Connect";
import { UserT } from "../types/user";
import { useUserStore } from "../store/userStore";
import { Link } from "react-router-dom";
import { useChangedModeStore } from "../store/changedMode";

export const CurrentUserPage = () => {
    const navigate = useNavigate()
    const {user, signOut} = useUserStore();
    const {changedMode, setChangedMode} = useChangedModeStore();
    
    const deleteUser = async() => {
        await Connect.axiosDelete(user!.id)
        signOut()
        navigate(routes.home)
    }

    return <div>
        {user && <div>
            <p>Name: {user.name}</p>
            <p>Expert:</p>
            <div>
                {user.experts?.map((expert) => {
                    return <p key={expert.id}>{expert.name}</p>
                })}
            </div> 
            <p>Interested:</p>
            <div>
                {user.interests?.map((interested) => {
                    return <p key={interested.id}>{interested.name}</p>
                })}
            </div>
            <Link to={routes.pick_theme} onClick={() => setChangedMode(true)}>To pick theme</Link>
            <></>
            <button onClick={deleteUser}>Delete my account</button>
        </div>}
        <button onClick={()=>navigate(routes.home)}>Back to home</button>
        </div>
}