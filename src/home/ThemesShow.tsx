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
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

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
    const {users} = useUsersShow();
    const {
        register,
        reset,
        handleSubmit,
        getValues
    } = useForm<GetId>({
        defaultValues: {themesIdExpert: [], themesIdInterested: []},
    });

    const options: SelectProps['options'] = [];
    try{
        themes?.map((themeElem) => {
            if(themeElem.name !== undefined){
            options.push({ label: themeElem.name, value: themeElem.id })
        }
        })}catch{
            console.log("Error")
        }
    const defaultForExpert = () => {
        if(changedMode===true){
            try{
                const defalt = users?.filter(userD => userD.id === user?.id)[0].experts?.map((expert) => themes?.filter((el) => el.name===expert[0])[0].id).flat()
                return defalt
            }catch(err){
                console.error(err)
                return []
            }
        }
        else return []
    }

    const handleSubmitExpert = (values: number[]) => {
            console.log(values)
            values.map((valueD) => register(`themesIdExpert.${valueD}`, {value: valueD}))
        }

    const defaultForInterested = () => {
        if(changedMode===true){
            try{
                if(user!==undefined){
                    const defalt = users?.filter(userD => userD.id === user?.id)[0].experts?.map((expert) => themes?.filter((el) => el.name===expert[0])[0].id).flat()
                    console.log(defalt)
                    const defalt1 = defalt
                    return defalt1
                }
            }catch(err){
                console.error(err)
                return []
            }
        }
        else return []
    }
    // const defaultForInterested = (themeElem: ThemeFromServerT) => {
    //     if(changedMode===true){
    //     const defalt = users.filter(userD => userD.id === user?.id)[0].interests.map((interested) => interested[0]).flat().includes(themeElem.name)
    //     console.log()
    //     return defalt
    //     }
    //     else return false
    // }

    const navigate = useNavigate();
    const onSubmit = async(data: GetId) => {
        console.log(data)
        const response = await Connect.axiosStayExpertOrInterested(
            { 
                changeMode: changedMode,
                user_id: user ? user.id : 0, 
                themesIdExpert: data.themesIdExpert, 
                themesIdInterested: data.themesIdInterested
            }
        )
        reset()
        setThemesUpdate(!themesUpdate);
        navigate(routes.home)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div>
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
            </div> */}
            <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
                allowClear
                onChange={handleSubmitExpert}
                defaultValue={defaultForExpert()}
                options={options}
                />
            <Select
                mode="multiple"
                placeholder="Please select"
                style={{ width: '100%' }}
                allowClear
                onChange={(values: number[]) => {
                    values.map((valueD) => register(`themesIdInterested.${valueD}`, {value: valueD}))
                }}
                defaultValue={defaultForInterested()}
                options={options}
                />
            <button type="submit">Submit</button>
        </form>
    )
}