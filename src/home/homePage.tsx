import React, { useEffect, useState } from "react";
import {routes} from "../Routers"
import { Link } from "react-router-dom";
// import { AuthContext } from "../contextAuth/AuthProvider";
import { useUserStore } from "../store/userStore";
import { Connect } from "../connect/Connect";
import { UserFromServerT, UserT } from "../types/user";
import { useUsersStore } from "../store/usersStore";
import { UsersShow } from "./usersShow";
import { ThemesShow} from '../autorithate/ThemesShow'
import { ShowCurrenUser } from "./ShowCurrenUser";
import "./home.css";
import { AddTheme } from "../autorithate/AddTheme";
import { useAuth } from "../custom-hook/useAuth";



export const Home = () => {
  const {user} = useUserStore();
  //const {user} = useAuth();
  //const [addTheme, setAddTheme] = useState(false)
  return(
    <div>
      <div>
        
        <ShowCurrenUser />
        <UsersShow />
      </div>
      {user?.name==="admin" && <AddTheme />}
    </div>
  )
}