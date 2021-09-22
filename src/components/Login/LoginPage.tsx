import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login, loginArgumentsType} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {LoginReduxForm} from "./LoginReduxForm";


const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const dispatch = useDispatch();

    const onSubmit = ({email, password, rememberMe, captcha}: loginArgumentsType) => {
        dispatch(login(email, password, rememberMe, captcha));
    };

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
};

export default LoginPage;


