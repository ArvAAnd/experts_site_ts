import React from "react";
import axios from "axios";
import { UserT } from "../types/user";
const url = 'http://127.0.0.1:5000/api/registration'
//const testUrl = 'https://httpbin.org/post'

export const Connect = {
    async axiosPost(data: UserT) {
        return axios.post(url, {
            'data': data
        });
    },
    async axiosGet() {
        return axios.get('http://127.0.0.1:5000/get_users');
    },
    async axiosDelete(user_id: number) {
        return axios.delete(`http://127.0.0.1:5000/api/delete/${user_id}`,
        );
    },
    async axiosClear() {
        return axios.delete('http://127.0.0.1:5000/clear_table');
    },
    async axiosUpdate(data: UserT) {
        return axios.post('http://127.0.0.1:5000/update/cPlus', {
            'data': data 
        });
    }
};