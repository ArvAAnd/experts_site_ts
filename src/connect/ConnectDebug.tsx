import React from "react";
import axios from "axios";
import { ExpertAndInterestedForServerT, Theme, UserAndTheme, UserAndThemeForServerT, UserAuthorizationT, UserRegistrationT, UserT } from "../types/user";
const url = 'http://127.0.0.1:5000/api/registration'

export const Connect = {    
    async axiosAddUser(data: UserRegistrationT) {
        return axios.post(url, {
            'data': data
        });
    },
    async axiosGetUser() {
        return axios.get('http://127.0.0.1:5000/get_users');
    },
    async axiosDelete(user_id: number) {
        return axios.delete(`http://127.0.0.1:5000/api/delete/${user_id}`,
        );
    },
    async axiosClear() {
        return axios.delete('http://127.0.0.1:5000/clear_table');
    },
    async axiosAddTheme(data: Theme) {
        return axios.post('http://127.0.0.1:5000/add-theme', {
            'data': data 
        });
    },
    async axiosGetTheme() {
        return axios.get('http://127.0.0.1:5000/get_themes');
    },
    async axiosDeleteExpertAndInterested(user_id: number) {
        return axios.delete(`http://127.0.0.1:5000/delete_expert_and_interested/${user_id}`);
    },
    async axiosStayExpertOrInterested(data: ExpertAndInterestedForServerT) {
        return axios.post('http://127.0.0.1:5000/stay_expert_and_interested', {
            'data': data
        });
    },
    async axiosAuthorization(data: UserAuthorizationT) {
        return axios.post('http://127.0.0.1:5000/authorization', {
            'data': data
        })
    },
    async axiosPostToken(data: number) {
        return axios.post('http://127.0.0.1:5000/read_token', {
            'id': data
        })        
    },
    async axiosGetUserById(user_id: number) {
        return axios.get(`http://127.0.0.1:5000/one_user/${user_id}`)
    },
    async axiosGetUserByExpert(theme_id: number[] | undefined) {
        return axios.post('http://127.0.0.1:5000/get_users_by_interested', {
            'idTheme': theme_id
        })
    }
};