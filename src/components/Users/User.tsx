import s from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import React from "react";
import {UsersType} from "../../types/types";


const User:React.FC<PropsType> = ({
                  user,
                  followingProgress,
                  sendUnfollowStatus,
                  sendFollowStatus
              }) => {
    return <div key={user.id}>
                <div className={s.users_block}>
                    <div className={s.user_wrapper}>
                        <div className={s.item}>
                            <NavLink to={"/profile/" + user.id}>
                                <img
                                    src={
                                        user.photos.small != null
                                            ? user.photos.small
                                            : userPhoto
                                    }
                                    alt="ava"/>
                            </NavLink>
                            <div>
                                {
                                    user.followed
                                        ? <button disabled={followingProgress.some((id: number) => id === user.id)}
                                                  onClick={() => {
                                                      sendUnfollowStatus(user.id);
                                                  }}>Unfollow</button>
                                        : <button disabled={followingProgress.some((id: number) => id === user.id)}
                                                  onClick={() => {
                                                      sendFollowStatus(user.id);
                                                  }}>Follow</button>
                                }
                            </div>
                        </div>
                        <div className={s.user_info}>
                            <div className={s.user_status}>
                                <h2>{user.name}</h2>
                                <p>{user.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
};

export default User;


type PropsType = {
    user: UsersType,
    followingProgress: Array<number>,
    sendUnfollowStatus: (userId:number) => void,
    sendFollowStatus: (userId:number) => void
}