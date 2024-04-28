import React from "react";
import { useThemesShow } from "../custom-hook/useThemesShow";
import { useForm } from "react-hook-form";
import { Theme } from "../types/user";
import { useSelectedTheme } from "../store/selectedTheme";
import { Connect } from "../connect/Connect";
import { useUserStore } from "../store/userStore";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useNavigate } from "react-router";
import { routes } from "../Routers";

type GetId = {
    themeId: number
}

export const ThemesShow = () => {
    const {themes} = useThemesShow();
    const {user} = useUserStore();
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    const {
        register,
        handleSubmit
    } = useForm<GetId>();
    const navigate = useNavigate();
    const onSumbit = async(data: GetId) => {
        const response = await Connect.axiosStayExpert({ user_id: user ? user.id : 0, theme_id: data.themeId});
        setThemesUpdate(!themesUpdate);
        navigate(routes.home)
        //console.log(response.data.message)
    }

    return(
        <form onSubmit={handleSubmit(onSumbit)}>
        <select
        {...register("themeId")}>
            <option value={0}>Select theme</option>
            {themes?.map((themeElem) => {
                return <option 
                        className="users-element" 
                        key={themeElem.id} value={themeElem.id}>
                    {themeElem.name}
                </option>
            })}
      </select>
      <input type="submit" value="Get"/>
      </form>
    )
}