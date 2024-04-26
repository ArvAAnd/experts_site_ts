import React from "react";
import { useUsersShow } from "../custom-hook/useUsersShow";
import { Link } from "react-router-dom";
import { routes } from "../Routers";

export const ShowCurrenUser = () => {
    const {user, signOut, users} = useUsersShow();

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