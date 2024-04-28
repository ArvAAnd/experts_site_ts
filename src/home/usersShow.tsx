import React from "react";
import { useUsersStore } from "../store/usersStore";
import { useExpertsStore } from "../store/expertsStore";
import { UserAndTheme, UserT } from "../types/user";
import { useExpertsShow } from "../custom-hook/useExpertsShow";
import { useThemesShow } from "../custom-hook/useThemesShow";

export const UsersShow = () => {
    const {users} = useUsersStore();
    const {experts} = useExpertsShow();
    const {themes} = useThemesShow();
    return(
        <div className="users">
            {users?.map((userD) => {
                return <div className="users-element" key={userD.id}>
                    <p className="users-element-line">Key: {userD.id}</p>
                    <p className="users-element-line">Name: {userD.name}</p>
                    <p className="users-element-line">Password: {userD.password}</p>
                    { experts.filter(el => el.user_id === userD.id).map((expert) => {
                        return <p key={expert.id}>Experts: { themes.filter(el => el.id === expert.theme_id).length > 0 &&
                            themes.filter(el => el.id === expert.theme_id)[0].name
                            }</p>
                    })
                    } 
                    {/* { experts.filter(el => el.user_id === userD.id).length > 0 &&
                        <p>Experts: {get_expert(userD)}</p>} */}
                    {/* <p className="users-element-line">C++: {(userD["c++"] == true) ? "yes" : "no"}</p> */}
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