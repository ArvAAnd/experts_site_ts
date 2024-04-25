import React from "react";
import { useUsersShow } from "../custom-hook/useUsersShow";
import { Link } from "react-router-dom";
import { routes } from "../Routers";

export const ShowCurrenUser = () => {
    const {user, changeC, signOut, users} = useUsersShow();

    return (
        <div>
            {user?.name ? <>
                <h1>
                Welcome, {user.name}!
                Ur c++: {user["c++"] ?
                <p>yes</p>
                :
                <p>no</p>
                }
                </h1>
                <button  onClick={changeC}>change c++</button>
                <button onClick={signOut}>Logout</button>
                </> : <>
                <h1>Registrate or autorizate pls</h1>
                <Link to={routes.registration}>To registrate</Link>
                <Link to={routes.autorithation}>To autorithate</Link>
                {/* <button onClick={()=>signIn({name: "Max", password: "lox"})}>Authorization</button> */}
                </>
            }
          
            
        </div>
    )
}