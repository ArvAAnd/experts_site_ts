import React, { useEffect, useState } from "react";
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
    const [themeExpert, setThemeExpert] = useState<number[]>([]);
    const [themeInterested, setThemeInterested] = useState<number[]>([]);
    const {
        register,
        reset,
        handleSubmit,
        getValues
    } = useForm<GetId>();

    const options: SelectProps['options'] = [];
    try{
        themes?.map((themeElem) => {
            if(themeElem.name !== undefined){
            options.push({ label: themeElem.name, value: themeElem.id })
        }
        })}catch{
            console.log("Error")
        }
    // useEffect(() => {
    //     try{
    //         const defaltExpert = themes?.filter(el => user?.experts?.flat().includes(el.name)).map((el) => el.id)
    //         setDefaultExpert(defaltExpert)
    //         const defaltInteres = themes?.filter(el => user?.interests?.flat().includes(el.name)).map((el) => el.id)
    //         setDefaultInterested(defaltInteres)
    //     }catch(err){
    //         console.error(err)
    //     }
    // }, []) 
    useEffect(() => {
        const defaltExpert = user?.experts?.map((expert) => expert.id).flat()
        if(defaltExpert) setThemeExpert(defaltExpert)

        const defaltInteres = user?.interests?.map((interested) => interested.id).flat()
        if(defaltInteres) setThemeInterested(defaltInteres)
    }, [])
    const defaultForExpert = () => {
        if(changedMode===true){
            const defalt = user?.experts?.map((expert) => expert.id).flat()
            return defalt
        }
        else return []
    }
    const defaultForInterested = () => {
        if(changedMode===true){
            //console.log(user?.experts?.map((expert) => expert.id).flat())
            return user?.interests?.map((interested) => interested.id).flat()
        }
        else return []
    }

    const handleSubmitExpert = (values: number[]) => {
            setThemeExpert(values)
            
            //values.map((valueD) => register(`themesIdExpert.${valueD}`, {value: valueD}))
        }

        const handleSubmitInterested = (values: number[]) => {
            setThemeInterested(values)
            
            //values.map((valueD) => register(`themesIdExpert.${valueD}`, {value: valueD}))
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
    const onSubmit = async() => {
        //console.log(data)
        console.log(themeExpert, themeInterested)
        const response = await Connect.axiosStayExpertOrInterested(
            { 
                changeMode: changedMode,
                user_id: user ? user.id : 0, 
                themesIdExpert: themeExpert,
                themesIdInterested: themeInterested
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
                onChange={handleSubmitInterested}
                defaultValue={defaultForInterested()}
                options={options}
                />
            <button type="submit">Submit</button>
        </form>
    )
}