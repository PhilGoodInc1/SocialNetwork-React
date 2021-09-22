import {instance} from "./api";


export const securityAPI = {
    getCaptcha() {
        return instance.get<GetCaptchaResponseDataType>(`security/get-captcha-url`).then(response => response.data)
    },
};


type GetCaptchaResponseDataType = {
    url: string
}
