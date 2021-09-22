import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {loginArgumentsType} from "../../redux/auth-reducer";
import {Input} from "../common/LoginInput/Textarea";
import {required} from "../common/utilites/validators";
import styles from "./Login.module.css";

const LoginForm: React.FC<InjectedFormProps<loginArgumentsType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.login_field}>
                <Field placeholder={'login'} name={"email"} component={Input} validate={[required]}/>
            </div>
            <div className={styles.password_field}>
                <Field name={"password"} component={Input} placeholder={'password'}
                       validate={[required]} type={"password"}/>
            </div>
            <div className={styles.rememberme_field}>
                <Field name={"rememberMe"} component={"input"} type={"checkbox"} placeholder={undefined}/>remember me
            </div>
            {props.captchaUrl && <div><img src={props.captchaUrl} alt="captcha"/></div>}
            {props.captchaUrl &&
            <div><Field placeholder={'Type the characters you see in the picture'} name={"captcha"} component={Input}
                        validate={[required]}/></div>}
            {props.error && <div className={styles.error_field_common}>{props.error}</div>}
            <div>
                <button type={"submit"}>login</button>
            </div>
        </form>
    )
};


export const LoginReduxForm = reduxForm<loginArgumentsType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);


type LoginFormOwnProps = {
    captchaUrl: string | null
};