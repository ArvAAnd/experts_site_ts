import React, { useEffect } from "react";
import { useUsersShow } from "../custom-hook/useUsersShow";
import { Link } from "react-router-dom";
import { routes } from "../Routers";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useChangedModeStore } from "../store/changedMode";

export const ShowCurrenUser = () => {
    const {user, signIn, signOut, users} = useUsersShow();
    const {themesUpdate} = useThemesUpdateStore();
    const {changedMode, setChangedMode} = useChangedModeStore();
    
    const Logout = ()=> {
        signOut();
        setChangedMode(false)
        }

    return (
        <div className="user-status">
            {user?.name ? <>
                <h1>
                Welcome, {user.name}!
                </h1>
                <div className="user-expert">Experts:
                    {user.experts?.map((expert) => {
                        return <p key={expert} className="users-element-line">{expert}</p>
                    })}
                </div>
                <div className="user-expert">Interested:
                    {user.interesteds?.map((interested) => {
                        return <p key={interested} className="users-element-line">{interested}</p>
                    })}
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