import React, { useEffect } from "react";
import { useUsersStore } from "../store/usersStore";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useNavigate } from "react-router";
import { routes } from "../Routers";
import { Link } from "react-router-dom";
import { useUsersShow } from "../custom-hook/useUsersShow";
import { useUserStore } from "../store/userStore";
import { Select } from "antd";

export const UsersShow = () => {
    const {users, handleSubmitSearch, options, onSubmitSearch, handleSubmit} = useUsersShow();
    const {user} = useUserStore();
    
    return(<div>
            {user?.name && <form onSubmit={handleSubmit(onSubmitSearch)}>
            <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
                allowClear
                onChange={handleSubmitSearch}
                options={options}
                />
                <button type="submit">Submit</button>
            </form>}
            <div className="users">
                {user?.name ? (users.length > 0 ? users?.map((userE) => {
                    return userE?.map((userD) => {
                        return <div className="users-element" key={userD.id}>
                        <p className="users-element-line">Key: {userD.id}</p>
                        <p className="users-element-line">Name: {userD.name}</p>
                        {/* <p className="users-element-line">Password: {userD.password}</p> */}
                        {userD?.experts?.length > 0 && <p className="users-element-line">Experts:</p>}
                        { userD?.experts?.length > 0 && userD.experts.map((expert) => {
                            return <p key={expert.name} className="users-element-line">{expert.name}</p>
                        })}
                        {/* { userD?.interests?.length > 0 && <p className="users-element-line">Interested:</p>}
                        { userD?.interests?.length > 0 && userD.interests.map((interested) => {
                            return <p key={interested.name} className="users-element-line">{interested.name}</p>
                        })} */}
                        <Link to={`/experts_site_ts/user_page/${userD.id}`}>View profile</Link>
                    </div>
                    })
                })
                : <p>Pick some of interests for see recomended users</p>)
                : <p>Registrate or authorizate for start</p>} 
            </div>
        </div>
    //     <div className="users">
    //         {users[0]?.map((userD) => {
    //             return <div className="users-element" key={userD.id}>
    //                 <p className="users-element-line">Key: {userD.id}</p>
    //                 <p className="users-element-line">Name: {userD.name}</p>
    //                 {/* <p className="users-element-line">Password: {userD.password}</p> */}
    //                 {userD?.experts?.length > 0 && <p className="users-element-line">Experts:</p>}
    //                 { userD?.experts?.length > 0 && userD.experts.map((expert) => {
    //                     return <p key={expert.name} className="users-element-line">{expert.name}</p>
    //                 })}
    //                 {/* { userD?.interests?.length > 0 && <p className="users-element-line">Interested:</p>}
    //                 { userD?.interests?.length > 0 && userD.interests.map((interested) => {
    //                     return <p key={interested.name} className="users-element-line">{interested.name}</p>
    //                 })} */}
    //                 <Link to={`/user_page/${userD.id}`}>View profile</Link>
    //             </div>
    //         })}
    //   </div>
    //   <div>
    //     {experts?.map((expert) => {
    //         return <div>user_id: {expert.user_id}, theme_id: {expert.theme_id}</div>
    //     })}
    //   </div>
    )
}