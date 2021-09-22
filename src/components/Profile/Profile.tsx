import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {UserDataType} from "../../types/types";
import MyPosts from "./MyPosts/MyPosts";

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         userData={props.userData}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <MyPosts/>
        </div>
    )
};

export default Profile;


type PropsType = {
    savePhoto:  (photo: File) => void,
    isOwner: boolean,
    userData: UserDataType,
    status: string,
    updateStatus: (status: string) => void,
};