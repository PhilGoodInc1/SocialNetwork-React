import axios from "axios";
import {UsersType} from "../types/types";

export let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'd4c74794-ea3e-4488-a29d-d77ae0f75cd2'
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export  enum ResultCodeWithCaptcha {
    CaptchaIsRequired = 10
}

export type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}