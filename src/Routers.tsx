import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./home/homePage";
import { Registration } from "./autorithate/registrationPage";
import { Autorithation } from "./autorithate/autorithatePage";
import { ThemesShow } from "./home/ThemesShow";

export const routes = {
    home:'/',
    registration: '/registration',
    autorithation: '/autorithation',
    pick_theme: '/pick_theme',
} 

export const Router = () => {
    return(
        <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.registration} element={<Registration />} />
            <Route path={routes.autorithation} element={<Autorithation />} />
            <Route path={routes.pick_theme} element={<ThemesShow/>} />
        </Routes>
        )
}