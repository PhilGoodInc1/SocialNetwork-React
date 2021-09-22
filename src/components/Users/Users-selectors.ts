import {AppStateType} from "../../redux/redux-store";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getPageSizeSelector = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPageSelector = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching;
};


export const getFollowingProgressSelector = (state: AppStateType) => {
    return state.usersPage.followingProgress;
};

export const getFilterSelector = (state: AppStateType) => {
    return state.usersPage.filter;
};