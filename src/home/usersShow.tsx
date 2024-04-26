import React from "react";
import { useUsersStore } from "../store/usersStore";

export const UsersShow = () => {
    const {users} = useUsersStore();

    return(
        <div className="users">
            {users?.map((userD) => {
                return <div className="users-element" key={userD.id}>
                    <p className="users-element-line">Key: {userD.id}</p>
                    <p className="users-element-line">Name: {userD.name}</p>
                    <p className="users-element-line">Password: {userD.password}</p>
                    {/* <p className="users-element-line">C++: {(userD["c++"] == true) ? "yes" : "no"}</p> */}
                </div>
            })}
      </div>
    )
}