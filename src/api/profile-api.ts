import {PhotosType, UserDataType} from "../types/types";
import {instance, APIResponseType} from "./api";


export const profileAPI = {
    getUserPageByID(userID: number | null) {
        return instance.get<UserDataType>(`profile/${userID}`).then(response => response.data)
    },

    getStatus(userID: number) {
        return instance.get<string>(`/profile/status/${userID}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`/profile/status`, {status: status})
    },

    sendPhoto(photo: File) {
        let data = new FormData();
        data.append("data", photo);
        return instance.put<APIResponseType<SendPhotoResponseDataType>>(`/profile/photo`, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },

    sendNewProfileData(profileData: UserDataType) {
        return instance.put<APIResponseType>(`/profile`, profileData).then(response => response.data)
    },
};


type SendPhotoResponseDataType = {
    photos: PhotosType
};