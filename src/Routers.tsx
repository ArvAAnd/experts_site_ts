import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./home/homePage";
import { Registration } from "./autorithate/registrationPage";

export const routes = {
    home:'/',
    registration: '/registration'
} 

export const Router = () => {
    return(
        <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.registration} element={<Registration />} />
        </Routes>
        )
}