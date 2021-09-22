import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
    }
};

function withAuthRedirectComponentCreator<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={'/login'}/>;

        return <WrappedComponent {...restProps as WCP}/>
    };

    return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
}

export default withAuthRedirectComponentCreator;


type MapPropsType = {
    isAuth: boolean
};

type DispatchPropsType = {}

