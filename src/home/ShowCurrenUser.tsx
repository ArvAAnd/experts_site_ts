import React, { useEffect } from "react";
import { useUsersShow } from "../custom-hook/useUsersShow";
import { Link } from "react-router-dom";
import { routes } from "../Routers";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useChangedModeStore } from "../store/changedMode";
import { useTokenStore } from "../store/tokenStore";

export const ShowCurrenUser = () => {
    const {user, signIn, signOut, users} = useUsersShow();
    const {themesUpdate} = useThemesUpdateStore();
    const {changedMode, setChangedMode} = useChangedModeStore();
    const {token} = useTokenStore();
    const deleteCookie = (name: string) => {
        const date = new Date();
    
        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    
        // Set it
        document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
    }

    const Logout = ()=> {
        signOut();
        console.log(token)
        deleteCookie("user")
        setChangedMode(false)
        }

    return (
        <div className="user-status">
            {user?.name ? <>
                <h1>
                Welcome, {user.name}!
                </h1>
                <div className="user-expert">Experts:
                    {user.experts?.length != 0 ? user.experts?.map((expert) => {
                        return <p key={expert.name} className="users-element-line">{expert.name}</p>
                    })
                : <p>U are not expert in any theme </p>}
                </div>
                <div className="user-expert">Interested:
                    {user.interests?.length != 0 ? <p></p> && user.interests?.map((interested) => {
                        return <p key={interested.name} className="users-element-line">{interested.name}</p>
                    })
                : <p>U are not interested in any theme </p>}
                </div>
                <Link to={routes.pick_theme} onClick={() => setChangedMode(true)}>To pick theme</Link>
                <button onClick={Logout}>Logout</button>
                </> : <>
                <h1>Registrate or autorizate pls</h1>
                <div className="links">
                    <Link to={routes.registration}>To registrate</Link>
                    <Link to={routes.autorithation}>To autorithate</Link>
                    
                    
                </div>
                
                </>
            }
          
            
        </div>
    )
}