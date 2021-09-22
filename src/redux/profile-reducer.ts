import {ResultCodesEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, UserDataType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    userData: null as null | UserDataType,
    status: '',
};

const profileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "socialnetwork/profile/addPost":
            let newPost = {id: 5,
                message: action.postText,
                likesCount: 0,};
            return {
                ...state,
                posts: [...state.posts, newPost],
            };

        case "socialnetwork/profile/setOneUser": {
            return {
                ...state,
                userData: action.userData,
            }
        }

        case 'socialnetwork/profile/SET_STATUS': {
            return {
                ...state,
                status: action.status,
            }
        }

        case "socialnetwork/profile/SET_PHOTO": {
            return {
                ...state,
                userData: {...state.userData,
                    photos: action.photos,
                } as UserDataType
            }
        }


        default :
            return state
    }
};

export const profileActions = {
    addPost: (postText: string) => ({
        type: 'socialnetwork/profile/addPost',
        postText,
    } as const),

    setOneUser: (userData: UserDataType) => ({
        type: 'socialnetwork/profile/setOneUser',
        userData,
    } as const),

    setStatus: (status: string) => ({
        type: 'socialnetwork/profile/SET_STATUS',
        status: status,
    } as const),

    setPhotos: (photos: PhotosType) => ({
        type: 'socialnetwork/profile/SET_PHOTO',
        photos: photos,
    } as const),
};

export const getUserPage = (userId: number | null) : ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getUserPageByID(userId);
        dispatch(profileActions.setOneUser(data));
    }
};

export const getUserStatus = (userId: number) : ThunkType => {
    return async (dispatch) => {
        let status = await profileAPI.getStatus(userId);
        dispatch(profileActions.setStatus(status));
    }
};

export const updateStatus = (status: string) : ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(profileActions.setStatus(status));
        }
    }
};

export const savePhoto = (photo: File): ThunkType=> {
    return async (dispatch) => {
        let data = await profileAPI.sendPhoto(photo);
        if (data.resultCode === 0) {
            dispatch(profileActions.setPhotos(data.data.photos));
        }
    }
};

export const updateProfileData = (profileData: UserDataType, loggedUserId: number | null): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.sendNewProfileData(profileData);
        if (data.resultCode === 0) {
            dispatch(getUserPage(loggedUserId));
        } else {
            let messageError = data.messages.length > 0 ? data.messages[0] : 'Some error';
            dispatch(stopSubmit('profileData', {_error: messageError}));
            return Promise.reject(data.messages[0]);
        }
    }
};

export default profileReducer;


export type PostType = {
    id: number
    message: string
    likesCount: number
}
type ActionsTypes = InferActionsTypes<typeof profileActions>;
type initialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

