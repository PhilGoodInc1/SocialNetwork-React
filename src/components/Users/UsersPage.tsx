import {useSelector} from "react-redux";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetchingSelector} from "./Users-selectors";
import withAuthRedirectComponentCreator from "../../hoc/withAuthRedirect";


const UsersPage: React.FC = () => {
    const isFetching = useSelector(getIsFetchingSelector);
    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
};

export default withAuthRedirectComponentCreator(UsersPage)







