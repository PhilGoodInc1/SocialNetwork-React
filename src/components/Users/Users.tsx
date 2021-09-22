import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, getUsersThunkCreator, sendFollowStatus, sendUnfollowStatus} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageSelector, getFilterSelector, getFollowingProgressSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "./Users-selectors";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";


let Users: React.FC = () => {

    const totalUsersCount = useSelector(getTotalUsersCountSelector);
    const pageSize = useSelector(getPageSizeSelector);
    const users = useSelector(getUsersSelector);
    const currentPage = useSelector(getCurrentPageSelector);
    const filter = useSelector(getFilterSelector);
    const followingProgress = useSelector(getFollowingProgressSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryStringType;
        let actualPage = currentPage;
        let actualFilter = filter;
        if (!!parsed.page) actualPage = Number(parsed.page);
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null};
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true};
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false};
                break;
        }

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [] );

    useEffect(() => {
        let query: QueryStringType = {};
        if (filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend= String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);


        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage, history]);


    const sendFollowStatusCB = (id: number) => {
        dispatch(sendFollowStatus(id))
    };

    const sendUnfollowStatusCB = (id: number) => {
        dispatch(sendUnfollowStatus(id))
    };

    const onPageChange = (currentPageNumber: number) => {
        dispatch(getUsersThunkCreator(currentPageNumber, pageSize, filter));
    };

    const onFilterChange = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter));
    };


    return <div>
        <Paginator totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChange={onPageChange}
        />
        <UsersSearchForm onFilterChange={onFilterChange}/>
        {users.map(user => <User user={user} followingProgress={followingProgress} key={user.id}
                                 sendUnfollowStatus={sendUnfollowStatusCB} sendFollowStatus={sendFollowStatusCB}/>)}
    </div>
};

export default Users;


type QueryStringType = {
    term?: string;
    friend?: string;
    page?: string
}


