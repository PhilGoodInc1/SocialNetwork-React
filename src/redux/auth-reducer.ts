import {ResultCodesEnum, ResultCodeWithCaptcha} from "../api/api";
import {stopSubmit} from "redux-form";
import {InferActionsTypes, BaseThunkType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};


const authReducer = (state = initialState, action : ActionsTypes) : initialStateType => {
    switch (action.type) {

        case "socialnetwork/auth/SET_LOGGED_USER": {
            return {
                ...state,
                id: action.payload.id,
                login: action.payload.login,
                email: action.payload.email,
                isAuth: action.payload.isAuth,
            };
        }

        case "socialnetwork/auth/SET_CAPTCHA_TO_STATE": {
            return {
                ...state,
                captchaUrl: action.payload,
            };
        }

        default :
            return state;
    }
};

const actions = {
    setLoggedUser: (id: number | null, login: string | null , email: string | null , isAuth: boolean) => ({
        type: 'socialnetwork/auth/SET_LOGGED_USER',
        payload: {id, login, email, isAuth}
    } as const),
    setCaptchaToState: (captchaUrl: string) => ({
        type: 'socialnetwork/auth/SET_CAPTCHA_TO_STATE',
        payload: captchaUrl
    } as const),
};

export const getAuthUserData = () : BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        let data = await authAPI.me();
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setLoggedUser(data.data.id, data.data.login, data.data.email, true));
        }
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string) => {
    return async (dispatch: any) => {
        let data = await authAPI.login(email, password, rememberMe, captcha);
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(getAuthUserData())
            } else {
                if (data.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptcha())
                }

                let messageError = data.messages.length > 0 ? data.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: messageError}))
            }
    }
};

export const logout = () : BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        let data = await authAPI.logout();
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.setLoggedUser(null, null, null, false))
            }
    }
};

export const getCaptcha = () : BaseThunkType<ActionsTypes> => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptcha();
            dispatch(actions.setCaptchaToState(data.url))
    }
};

export default authReducer;


type initialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

export type loginArgumentsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
};
