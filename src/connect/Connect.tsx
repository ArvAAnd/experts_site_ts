import React from "react";
import axios from "axios";
import { ExpertAndInterestedForServerT, GiveRating, Theme, UserAuthorizationT, UserRegistrationT, UserT } from "../types/user";
const server = 'http://127.0.0.1:5000'
//const server = 'https://expertssiteback-04981a476ea5.herokuapp.com'
//const testUrl = 'https://httpbin.org/post'

export const Connect = {
    async axiosAddUser(data: UserRegistrationT) {
        return axios.post(`${server}/api/registration`, {
            'data': data
        });
    },
    // async axiosGetUser() {
    //     return axios.get(`${server}/get_users`);
    // },
    async axiosDelete(user_id: number) {
        return axios.delete(`${server}/api/delete/${user_id}`,
        );
    },
    async axiosClear() {
        return axios.delete(`${server}/clear_table`);
    },
    async axiosAddTheme(data: Theme) {
        return axios.post(`${server}/add-theme`, {
            'data': data 
        });
    },
    async axiosGetTheme() {
        return axios.get(`${server}/get_themes`);
    },
    async axiosDeleteExpertAndInterested(user_id: number) {
        return axios.delete(`${server}/delete_expert_and_interested/${user_id}`);
    },
    async axiosStayExpertOrInterested(data: ExpertAndInterestedForServerT) {
        return axios.post(`${server}/stay_expert_and_interested`, {
            'data': data
        });
    },
    async axiosAuthorization(data: UserAuthorizationT) {
        return axios.post(`${server}/authorization`, {
            'data': data
        })
    },
    async axiosPostToken(data: string) {
        return axios.post(`${server}/read_token`, {
            'tocken': data
        })        
    },
    async axiosGetUserById(user_id: number) {
        return axios.get(`${server}/one_user/${user_id}`)
    },
    async axiosGetUserByExpert(theme_id: number[] | undefined) {
        return axios.post(`${server}/get_users_by_interested`, {
            'idTheme': theme_id
        })
    },
    async axiosChangeContacts(data: {contacts: string}) {
        return axios.post(`${server}/change-contacts`, {
            'data': data
        })
    },
    async axiosGiveRating(data: GiveRating){
        return axios.post(`${server}/give-rating`, {
            'data': data
        })
    },
    async axiosDeleteToken(data: string) {
        return axios.post(`${server}/delete-token`, {
            'tocken': data
        })
    }
};