import React from "react";
import style from "./Users.module.css";
import {UserType} from "../../redux/Users-reducer";
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";


type UsersComponentType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    onPageChanged: (pageNumber: number) => void
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    followingInProgress: Array<number>
}

export const Users: React.FC<UsersComponentType> = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span
                        onClick={(e) => {
                            props.onPageChanged(p)
                        }}
                        className={props.currentPage === p ? style.selectedPage : ""}>{p}</span>
                })}
            </div>
            {
                props.users.map((u: UserType) => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                     className={style.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button
                                    disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                    onClick={() => {props.unfollowUser(u.id)}}>
                                    Unfollow</button>
                                : <button
                                    disabled={props.followingInProgress.some((id: number) => id === u.id)}
                                    onClick={() => {props.followUser(u.id)}}>
                                    Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}
