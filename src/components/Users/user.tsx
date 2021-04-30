import {UserType} from "../../redux/Users-reducer";
import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.jpg";
import style from "./User.module.scss";

type UserPropsType = {
    user: UserType
    unfollowUser: (userId: number) => void
    followUser: (userId: number) => void
    followingInProgress: Array<number>
}

export const User: React.FC<UserPropsType> = (props) => {
    return (
        <div className={style.userBlock}>

            <div>
                <NavLink to={'profile/' + props.user.id}>
                    <img src={props.user.photos.small != null
                        ? props.user.photos.small
                        : userPhoto} className={style.userPhoto}/>
                </NavLink>
            </div>
            <div>
                {props.user.followed
                    ? <button disabled={props.followingInProgress.some((id: number) => id === props.user.id)}
                              className={style.btn}
                              onClick={() => {
                                  props.unfollowUser(props.user.id)
                              }}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some((id: number) => id === props.user.id)}
                              className={style.btn}
                              onClick={() => {
                                  props.followUser(props.user.id)
                              }}>Follow</button>
                }
            </div>
            <div>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
            </div>

        </div>
    )
}

