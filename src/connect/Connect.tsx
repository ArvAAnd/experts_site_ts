import React from "react";
import axios from "axios";
import { Theme, UserAndTheme, UserAndThemeForServerT, UserT } from "../types/user";
const url = 'http://127.0.0.1:5000/api/registration'
//const testUrl = 'https://httpbin.org/post'

export const Connect = {
    async axiosAddUser(data: UserT) {
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
    async axiosStayExpert(data: UserAndThemeForServerT) {
        return axios.post('http://127.0.0.1:5000/stay_expert', {
            'data': data
        });
    },
    async axiosGetExperts() {
        return axios.get('http://127.0.0.1:5000/get_experts');
    },
    async axiosDeleteExpert(user_id: number) {
        return axios.delete(`http://127.0.0.1:5000/delete_expert/${user_id}`);
    },
    async axiosStayInterested(data: UserAndThemeForServerT) {
        return axios.post('http://127.0.0.1:5000/stay_interested', {
            'data': data
        });
    },
    async axiosGetInteresteds() {
        return axios.get('http://127.0.0.1:5000/get_interesteds');
    },
    async axiosDeleteInterested(user_id: number) {
        return axios.delete(`http://127.0.0.1:5000/delete_interested/${user_id}`);
    }
};