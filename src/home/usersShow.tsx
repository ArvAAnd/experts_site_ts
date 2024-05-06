import React, { useEffect } from "react";
import { useUsersStore } from "../store/usersStore";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useNavigate } from "react-router";
import { routes } from "../Routers";
import { Link } from "react-router-dom";

export const UsersShow = () => {
    const {users} = useUsersStore();
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    const navigate = useNavigate();
    
    
    return(
        <div className="users">
            {users?.map((userD) => {
                return <div className="users-element" key={userD.id}>
                    <p className="users-element-line">Key: {userD.id}</p>
                    <p className="users-element-line">Name: {userD.name}</p>
                    <p className="users-element-line">Password: {userD.password}</p>
                    {userD?.experts?.length > 0 && <p className="users-element-line">Experts:</p>}
                    { userD?.experts?.length > 0 && userD.experts.map((expert) => {
                        return <p key={expert.name} className="users-element-line">{expert.name}</p>
                    })}
                    { userD?.interests?.length > 0 && <p className="users-element-line">Interested:</p>}
                    { userD?.interests?.length > 0 && userD.interests.map((interested) => {
                        return <p key={interested.name} className="users-element-line">{interested.name}</p>
                    })}
                    <Link to={`/user_page/${userD.id}`}>View profile</Link>
                </div>
            })}
      </div>
    //   <div>
    //     {experts?.map((expert) => {
    //         return <div>user_id: {expert.user_id}, theme_id: {expert.theme_id}</div>
    //     })}
    //   </div>
    )
}