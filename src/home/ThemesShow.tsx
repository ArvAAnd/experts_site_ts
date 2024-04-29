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
import { useChangedModeStore } from "../store/changedMode";
import { useExpertsShow } from "../custom-hook/useExpertsShow";
import { useInterestedsShow } from "../custom-hook/useInterestedsShow";

type GetId = {
    themesIdExpert: number[],
    themesIdInterested: number[],
}

export const ThemesShow = () => {
    const {themes} = useThemesShow();
    const { interesteds } = useInterestedsShow();
    const {user} = useUserStore();
    const {changedMode} = useChangedModeStore();
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    const {experts} = useExpertsShow();
    const {
        register,
        handleSubmit,
        getValues
    } = useForm<GetId>();
    const navigate = useNavigate();
    const onSubmit = async(data: GetId) => {
        console.log(data.themesIdExpert)
        console.log(data.themesIdInterested)
        if(changedMode === true){
            const responseExpert = await Connect.axiosDeleteExpert(user ? user.id : 0)
            console.log("Experts: " + responseExpert.data.message)
            const responseInterested = await Connect.axiosDeleteInterested(user ? user.id : 0)
            //console.log("Interested: " + responseInterested.data.message)
        }
        data.themesIdExpert.map(async(themeId) => {
            const responseExpertStay = await Connect.axiosStayExpert({ user_id: user ? user.id : 0, theme_id: themeId})
        })
        data.themesIdInterested.map(async(themeId) => {
            const responseInterestedStay = await Connect.axiosStayInterested({ user_id: user ? user.id : 0, theme_id: themeId})
            //console.log(responseInterestedStay.data)
        })
        setThemesUpdate(!themesUpdate);
        navigate(routes.home)
    
        //console.log(response.data.message)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                Expert:
            {themes?.map((themeElem) => (
                <div className="themes-element" key={themeElem.id}>
                <input type="checkbox"
                 value={themeElem.id}
                 {...register(`themesIdExpert.${themeElem.id}`)} 
                 defaultChecked={experts.filter(expert => expert.user_id === user?.id).map((expert) => expert.theme_id).includes(themeElem.id)}/>
                <p>{themeElem.name}</p>
                </div>
            ))}
            </div>
            <div>
                Interested:
            {themes?.map((themeElem) => (
                <div className="themes-element" key={themeElem.id}>
                <input type="checkbox"
                 value={themeElem.id}
                 {...register(`themesIdInterested.${themeElem.id}`)} 
                 defaultChecked={interesteds.filter(interested => interested.user_id === user?.id).map((interested) => interested.theme_id).includes(themeElem.id)}/>
                <p>{themeElem.name}</p>
                </div>
            ))}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}