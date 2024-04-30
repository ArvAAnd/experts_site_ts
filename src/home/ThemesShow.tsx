import React from "react";
import { useThemesShow } from "../custom-hook/useThemesShow";
import { useForm } from "react-hook-form";
import { Theme, ThemeFromServerT } from "../types/user";
import { Connect } from "../connect/Connect";
import { useUserStore } from "../store/userStore";
import { useThemesUpdateStore } from "../store/themeUpdateStore";
import { useNavigate } from "react-router";
import { routes } from "../Routers";
import { useChangedModeStore } from "../store/changedMode";
import { useUsersShow } from "../custom-hook/useUsersShow";
import { useUsersStore } from "../store/usersStore";

type GetId = {
    themesIdExpert: number[],
    themesIdInterested: number[],
}

export const ThemesShow = () => {
    const {themes} = useThemesShow();
    //const { interesteds } = useInterestedsShow();
    const {user} = useUserStore();
    const {changedMode} = useChangedModeStore();
    const {themesUpdate, setThemesUpdate} = useThemesUpdateStore();
    //const {experts} = useExpertsShow();
    const {users} = useUsersStore();
    const {
        register,
        handleSubmit,
        getValues
    } = useForm<GetId>();

    const defaultForExpert = (themeElem: ThemeFromServerT) => {
        if(changedMode===true){
            const defalt = users.filter(userD => userD.id === user?.id)[0].experts.map((expert) => expert[0]).flat().includes(themeElem.name)
            console.log()
            return defalt
        }
        else return false
    }

    const defaultForInterested = (themeElem: ThemeFromServerT) => {
        if(changedMode===true){
        const defalt = users.filter(userD => userD.id === user?.id)[0].interests.map((interested) => interested[0]).flat().includes(themeElem.name)
        console.log()
        return defalt
        }
        else return false
    }

    const navigate = useNavigate();
    const onSubmit = async(data: GetId) => {
        //console.log(data.themesIdExpert)
        //console.log(data.themesIdInterested)
        if(changedMode === true){
            const responseExpert = await Connect.axiosDeleteExpert(user ? user.id : 0)
            console.log("Experts: " + responseExpert.data.message)
            const responseInterested = await Connect.axiosDeleteInterested(user ? user.id : 0)
            console.log("Interested: " + responseInterested.data.message)
        }
        await Promise.all(data.themesIdExpert.map(async(themeId) => {
            const responseExpertStay = await Connect.axiosStayExpert({ user_id: user ? user.id : 0, theme_id: themeId})
        }))
        await Promise.all(data.themesIdInterested.map(async(themeId) => {
            const responseInterestedStay = await Connect.axiosStayInterested({ user_id: user ? user.id : 0, theme_id: themeId})
            console.log(responseInterestedStay.data)
        }))
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
                 defaultChecked={defaultForExpert(themeElem)}/>
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
                 defaultChecked={defaultForInterested(themeElem)}/>
                <p>{themeElem.name}</p>
                </div>
            ))}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}