import React, { useEffect } from "react";
import { useUsersShow } from "../custom-hook/useUsersShow";
import { Link } from "react-router-dom";
import { routes } from "../Routers";
import { useThemesUpdateStore } from "../store/themeUpdateStore";

export const ShowCurrenUser = () => {
    const {user, signIn, signOut, users} = useUsersShow();
    const {themesUpdate} = useThemesUpdateStore();
    useEffect(() => {
        try{
        user != undefined && signIn({...users.filter(el => el.name === user.name && el.password === user.password)[0]})
        
        }catch(err){
            console.log("Haven't user")
            console.error(err)
        }
    }, [])
    
    return (
        <div className="user-status">
            {user?.name ? <>
                <h1>
                Welcome, {user.name}!
                </h1>
                <button onClick={signOut}>Logout</button>
                </> : <>
                <h1>Registrate or autorizate pls</h1>
                <div className="links">
                    <Link to={routes.registration}>To registrate</Link>
                    <Link to={routes.autorithation}>To autorithate</Link>
                </div>
                {/* <button onClick={()=>signIn({name: "Max", password: "lox"})}>Authorization</button> */}
                </>
            }
          
            
        </div>
    )
}