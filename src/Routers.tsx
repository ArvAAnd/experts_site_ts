import React from "react";
import { Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home } from "./home/homePage";
import { Registration } from "./autorithate/registrationPage";
import { Autorithation } from "./autorithate/autorithatePage";
import { ThemesShow } from "./home/ThemesShow";
import { UserPage } from "./UserPage/UserPage";
import { CurrentUserPage } from "./UserPage/CurrentUserPage";
import App from "./App";

export const routes = {
    home:'/experts_site_ts/',
    registration: '/experts_site_ts/registration',
    autorithation: '/experts_site_ts/autorithation',
    pick_theme: '/experts_site_ts/pick_theme',
    user_page: '/experts_site_ts/user_page/:id',
    current_user_page: '/experts_site_ts/current_user_page'
} 

export const Router = () => {
    return(
        <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.registration} element={<Registration />} />
            <Route path={routes.autorithation} element={<Autorithation />} />
            <Route path={routes.pick_theme} element={<ThemesShow/>} />
            <Route path={routes.user_page} element={<UserPage/>} />
            <Route path={routes.current_user_page} element={<CurrentUserPage/>} />
        </Routes>
        )
}

// export const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path={routes.home} element={<App />}>
//         <Route index element={<Home />} />
//         <Route path={routes.registration} element={<Registration />} />
//         <Route path={routes.autorithation} element={<Autorithation />} />
//         <Route path={routes.pick_theme} element={<ThemesShow />} />
//         <Route path={routes.user_page} element={<UserPage />} />
//         <Route path={routes.current_user_page} element={<CurrentUserPage />} />
//       </Route>
//     )
//   );