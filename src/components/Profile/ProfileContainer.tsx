import React, {useEffect} from 'react';
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getUserPage, getUserStatus, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {useHistory, useParams} from "react-router-dom";

import {AppStateType} from "../../redux/redux-store";
import {UserDataType} from "../../types/types";
import withAuthRedirectComponentCreator from "../../hoc/withAuthRedirect";


export const ProfilePage: React.FC = () => {

    const status = useSelector((state: AppStateType) => state.profilePage.status);
    const loggedUserId = useSelector((state: AppStateType) => state.auth.id);
    const userData = useSelector((state: AppStateType) => state.profilePage.userData);
    const dispatch = useDispatch();
    const history = useHistory();
    const savePhotoHook = (photo: File) => {
        dispatch(savePhoto(photo));
    };
    const updateStatusHook = (status: string) => {
        dispatch(updateStatus(status));
    };
    let { userId } = useParams();

    const setUserByUserId = () => {
        if (!userId) {
            userId = loggedUserId;
            if (!userId) {
                history.push('/login');
            }
        }
        dispatch(getUserPage(userId as number));
        dispatch(getUserStatus(userId as number));
    };

    useEffect(() => {
        setUserByUserId()
    },[userId]) ;

    return <Profile
        isOwner={!userId}
        userData={userData as UserDataType}
        savePhoto={savePhotoHook}
        status={status}
        updateStatus={updateStatusHook}/>
};

export default withAuthRedirectComponentCreator(ProfilePage)
