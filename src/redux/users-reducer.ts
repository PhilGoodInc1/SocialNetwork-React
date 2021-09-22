import {ResultCodesEnum} from "../api/api";
import {UsersType} from "../types/types";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import usersAPI from "../api/users-api";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

let followUnfollowChangeStateFlow = (users: Array<UsersType>, followedStatus: boolean, actionId: number): Array<UsersType> => {
    return users.map((u) => {
        if (u.id === actionId) {
            return {...u, followed: followedStatus}
        }
        return u;
    })
};

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "socialnetwork/users/FOLLOW_USER":
            return {
                ...state,
                users: followUnfollowChangeStateFlow(state.users, true, action.id)
            };

        case "socialnetwork/users/UNFOLLOW_USER": {
            return {
                ...state,
                users: followUnfollowChangeStateFlow(state.users, false, action.id)
            }
        }

        case "socialnetwork/users/SET_USERS":
            return {...state, users: action.users};

        case "socialnetwork/users/SET_Filter":
            return {...state, filter: {
                    term: action.payload.term,
                    friend: action.payload.friend
                }};

        case "socialnetwork/users/CHANGE_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            };

        case "socialnetwork/users/CHANGE_TOTAL_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalCount
            };

        case  "socialnetwork/users/TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            };

        case  "socialnetwork/users/TOGGLE_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingProgress: (action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : [state.followingProgress.filter(id => id !== action.userId)])
            } as initialStateType;

        default:
            return state
    }
};

let actions = {
    follow: (userId: number) => ({
        type: 'socialnetwork/users/FOLLOW_USER',
        id: userId,
    } as const),
    unfollow: (userId: number) => ({
        type: 'socialnetwork/users/UNFOLLOW_USER',
        id: userId,
    } as const),
    setUsers: (users: Array<UsersType>) => ({
        type: 'socialnetwork/users/SET_USERS',
        users: users,
    } as const),
    setFilter: (filter: FilterType) => ({
        type: 'socialnetwork/users/SET_Filter',
        payload: {term: filter.term, friend: filter.friend},
    } as const),
    changeCurrentPage: (currentPage: number) => ({
        type: 'socialnetwork/users/CHANGE_CURRENT_PAGE',
        currentPage: currentPage,
    } as const),
    setTotalUserCount: (totalCount: number) => ({
        type: 'socialnetwork/users/CHANGE_TOTAL_COUNT',
        totalCount: totalCount,
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'socialnetwork/users/TOGGLE_IS_FETCHING',
        isFetching: isFetching,
    } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'socialnetwork/users/TOGGLE_FOLLOWING_PROGRESS',
        isFetching: isFetching,
        userId: userId
    } as const)
};

export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setFilter(filter));
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUserCount(data.totalCount));
    }
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));

};

export const sendUnfollowStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.sendUnfollow.bind(usersAPI), actions.unfollow);
    }
};

export const sendFollowStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.sendFollow.bind(usersAPI);
        let actionCreator = actions.follow;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

    }
};

export default usersReducer;


type initialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
