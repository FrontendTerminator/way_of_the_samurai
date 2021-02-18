import React from "react";
import style from "./Users.module.css";
import {UserType} from "../../redux/Users-reducer";
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersComponentType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
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
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                           "API-KEY": "5a6ca339-ef7a-4147-8ff1-68b95a39c9e7"
                                        }
                                    }).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                                }}>Unfollow</button>

                                : <button onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "5a6ca339-ef7a-4147-8ff1-68b95a39c9e7"
                                        }
                                    }).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })

                                    props.follow(u.id)

                                }}>Follow</button>}
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
