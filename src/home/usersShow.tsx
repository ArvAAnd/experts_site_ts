import React, { useEffect } from "react";
import { useUsersStore } from "../store/usersStore";
import { UserAndTheme, UserT } from "../types/user";
import { useThemesShow } from "../custom-hook/useThemesShow";
import { useThemesUpdateStore } from "../store/themeUpdateStore";

export const UsersShow = () => {
    const {users} = useUsersStore();
    //const {experts} = useExpertsShow();
    //const {interesteds} = useInterestedsShow();
    //const {themes} = useThemesShow();
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    
    
    
    return(
        <div className="users">
            {users?.map((userD) => {
                return <div className="users-element" key={userD.id}>
                    <p className="users-element-line">Key: {userD.id}</p>
                    <p className="users-element-line">Name: {userD.name}</p>
                    <p className="users-element-line">Password: {userD.password}</p>
                    {userD?.experts?.length > 0 && <p className="users-element-line">Experts:</p>}
                    { userD?.experts?.length > 0 && userD.experts.map((expert) => {
                        return <p key={expert} className="users-element-line">{expert}</p>
                    })}
                    { userD?.interests?.length > 0 && <p className="users-element-line">Interested:</p>}
                    { userD?.interests?.length > 0 && userD.interests.map((interested) => {
                        return <p key={interested} className="users-element-line">{interested}</p>
                    })}
                    {/* { experts.filter(el => el.user_id === userD.id).map((expert) => {
                        return <p key={expert.id}>Experts: { themes.filter(el => el.id === expert.theme_id).length > 0 &&
                            themes.filter(el => el.id === expert.theme_id)[0].name
                            }</p>
                    })
                    }
                    { interesteds.filter(el => el.user_id === userD.id).map((interested) => {
                        return <p key={interested.id}>Interested: { themes.filter(el => el.id === interested.theme_id).length > 0 &&
                            themes.filter(el => el.id === interested.theme_id)[0].name
                            }</p>
                    })}  */}
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