import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import MyPostsForm from "./MyPostsForm";
import {profileActions} from "../../../redux/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


const MyPosts: React.FC = (() => {

    const posts = useSelector((state: AppStateType) => state.profilePage.posts);
    const dispatch = useDispatch();

    let postsElements =
        posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);

    const onAddPost = (values: MyPostsFormValuesType) => {
        dispatch(profileActions.addPost(values.postText));
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <MyPostsForm onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});


export default React.memo(MyPosts);


export type MyPostsFormValuesType = {
    postText: string
};