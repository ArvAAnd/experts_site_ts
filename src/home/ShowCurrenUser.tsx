import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { routes } from "../Routers";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useChangedModeStore } from "../store/changedMode";
import { Connect } from "../connect/Connect";
import { useUserStore } from "../store/userStore";

export const ShowCurrenUser = () => {
    const {user, signOut} = useUserStore();
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    const {changedMode, setChangedMode} = useChangedModeStore();
    
    function deleteCookie() {
        const value = document.cookie;
        const parts = value.split("=");
        //console.log(parts[0] + "    " + parts[1]);
        document.cookie = parts[0] + "=; max-age=-1; path=/;";
    }
    
    const Logout = ()=> {
        signOut();
        deleteCookie()//delete cookie 
        setChangedMode(false)
        setThemesUpdate(!themesUpdate)
        }

    return (
        <div className="user-status">
            {user?.name ? <>
                <h1>
                Welcome, {user.name}!
                </h1>
                <div className="user-expert">Experts:
                    {user.experts?.length != 0 ? user.experts?.map((expert) => {
                        console.log(expert)
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
                <Link to={routes.current_user_page}>View my profile</Link>
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