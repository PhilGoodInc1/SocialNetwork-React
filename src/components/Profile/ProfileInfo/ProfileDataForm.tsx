import React from 'react';
import s from "./ProfileInfo.module.css";
import {Field, Form, InjectedFormProps, reduxForm} from "redux-form";
import Textarea, {Input} from "../../common/LoginInput/Textarea";
import {required} from "../../common/utilites/validators";
import {connect} from "react-redux";
import {updateProfileData} from "../../../redux/profile-reducer";
import styles from "../../common/LoginInput/Textarea.module.css";
import {AppStateType} from "../../../redux/redux-store";
import {UserDataType} from "../../../types/types";


const ProfileDataForm: React.FC<InjectedFormProps<UserDataType, ProfileDataFormOwnProps> & ProfileDataFormOwnProps> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit} className={s.block_aboutme}>
            <div>
                <b>Looking for a job</b> <Field name={"lookingForAJob"}
                                                component={"input"}
                                                type={"checkbox"}
                                                validate={[required]}/>
            </div>
            <div>
                <b>Professional skills:</b> <Field placeholder={'Tell about your professional skills'}
                                                   name={"lookingForAJobDescription"}
                                                   component={Textarea}
                                                   validate={[required]}/>
            </div>
            <div>
                <b>Full name:</b> <Field placeholder={'Your full name'} name={"fullName"} component={Input}
                                         validate={[required]}/>
            </div>
            <div><b>Contacts: </b>{Object.keys(props.userData.contacts).map(key => {
                return <div>
                    <b>{key}:</b>
                    <Field name={'contacts.' + key}
                           placeholder={key}
                           component={Input}
                    />
                </div>
            })}
            </div>
            {props.error && <div className={styles.error_field_common}>{props.error}</div>}
            <button type={"submit"}>Save</button>
        </Form>
    )
};

const ProfileDataReduxForm = reduxForm<UserDataType, ProfileDataFormOwnProps>({
    form: 'profileData'
})(ProfileDataForm);

const ProfileDataFormContainer:  React.FC<ProfileDataFormContainerType> = (props) => {

    const onSubmit = (formData: UserDataType) => {
        let promise = props.updateProfileData(formData, props.loggedUserId);
        promise.then(() => {
            props.setEditMode(false);
        })
    };

    return (
        <ProfileDataReduxForm userData={props.userData} initialValues={props.userData}
                              onSubmit={onSubmit}/>
    )
};

let mapStateToProps = (state: AppStateType) => {
    return {
        loggedUserId: state.auth.id,
    }
};


export default connect(mapStateToProps, {updateProfileData})(ProfileDataFormContainer);


type ProfileDataFormOwnProps = {
    userData: UserDataType
};

type ProfileDataFormContainerType = {
    updateProfileData: (formData: UserDataType, loggedUserId: number | null) => Promise<any>,
    loggedUserId: number | null,
    setEditMode: (condition: boolean) => void,
    userData: UserDataType,
    initialValues: UserDataType
}