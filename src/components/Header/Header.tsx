import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";
import {Button, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";

const {Header} = Layout;

export const HeaderBlock: React.FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const login = useSelector((state:AppStateType) => state.auth.login);
    const dispatch = useDispatch();
    const logoutCB = () => {
        dispatch(logout())
    };

    return <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className={styles.log_block}>{
                isAuth ? <span><NavLink to={'/profile'}><span>{login}</span></NavLink> -
                    <Button type="primary"  onClick={logoutCB}>Log out</Button></span>
                    : <NavLink to={'/login'}> <div>Login</div> </NavLink>
            }
            </div>
        </Header>
};
