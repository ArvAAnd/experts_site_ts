import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { routes } from "../Routers";
import { useShowCurrentUser } from "../custom-hook/useShowCurrenUser";


export const ShowCurrenUser = () => {
    const {user, Logout} = useShowCurrentUser();    

    return (
        <div className="user-status">
            {user?.name ? <>
                <h1>
                Welcome, {user.name}!
                </h1>
                <div className="user-expert">Experts:
                    {user.experts?.length != 0 ? user.experts?.map((expert) => {
                        //console.log(expert)
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