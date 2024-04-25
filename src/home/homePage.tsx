import React, { useEffect, useState } from "react";
import {routes} from "../Routers"
import { Link } from "react-router-dom";
// import { AuthContext } from "../contextAuth/AuthProvider";
import { useUserStore } from "../store/userStore";
import { Connect } from "../connect/Connect";
import { UserFromServerT, UserT } from "../types/user";
import { useUsersStore } from "../store/usersStore";
import { UsersShow } from "./usersShow";
import { ShowCurrenUser } from "./ShowCurrenUser";
import "./home.css";


export const Home = () => {
  
  return(
    <div>
      <ShowCurrenUser />
      <UsersShow />
    </div>
  )
}