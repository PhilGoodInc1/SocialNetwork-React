import {instance, APIResponseType, ResultCodesEnum, ResultCodeWithCaptcha} from "./api";


export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(response => response.data)
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeWithCaptcha>>(`/auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },

    logout() {
        return instance.delete(`/auth/login`).then(response => response.data)
    }
};


type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}