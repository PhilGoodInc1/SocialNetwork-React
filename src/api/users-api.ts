import {GetUsersResponseType, instance, APIResponseType} from "./api";


const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string, friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)).then(response => response.data )
    },

    sendUnfollow(userID: number) {
        return instance.delete<APIResponseType>(`follow/${userID}`).then(response => response.data)
    },

    sendFollow(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`).then(response => response.data)
    },

};

export default usersAPI;