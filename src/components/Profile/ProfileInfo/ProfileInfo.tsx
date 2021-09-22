import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userAva from './../../../assets/images/user.png'
import ProfileStatus from "./ProfieStatus";
import ProfileDataFormContainer from "./ProfileDataForm";
import {UserDataType, ContactsType} from "../../../types/types";


const ProfileInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);

    let onPhotoSend = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    if (!props.userData) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.information}>
                <div className={s.descriptionBlock}>
                    <div className={s.main_info}>
                        <div className={s.fullname}>{props.userData.fullName}</div>
                        <img className={s.avatar} src={
                            props.userData.photos.large ? props.userData.photos.large : userAva} alt="avatar"/>
                        {props.isOwner && <div><input type="file"  onChange={onPhotoSend}/></div>}
                    </div>
                    {editMode ? <ProfileDataFormContainer initialValues={props.userData} setEditMode={setEditMode} userData={props.userData}/>
                        : <div className={s.block_aboutme}>
                            {props.isOwner && <div>
                                <button onClick={() => {
                                    setEditMode(true)
                                }}>Edit
                                </button>
                            </div>}

                            <div><b>Looking for a job: </b>{props.userData.lookingForAJob ? 'Yes' : 'No'}</div>
                            <div><b>Professional skills: </b>{props.userData.lookingForAJobDescription}</div>
                            <div><b>Contacts: </b>{Object.keys(props.userData.contacts).map((key) => {

                                return <Contact key={key} contactTitle={key}
                                                contactValue={props.userData.contacts[key  as keyof ContactsType]}/>
                            })}
                            </div>
                        </div>}
                </div>
                <ProfileStatus isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
};

const Contact: React.FC<ContactProps> = (props) => {
    return <div>
        <b>&nbsp; {props.contactTitle}</b>: {props.contactValue}
    </div>
};

export default ProfileInfo;


type ContactProps = {
    contactTitle: string,
    contactValue:  string | null
}

type PropsType = {
    userData: UserDataType ,
    savePhoto: (photo: File) => void,
    isOwner: boolean,
    status: string,
    updateStatus: (status: string) => void,
}