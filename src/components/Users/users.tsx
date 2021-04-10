import React from "react";
import {UserType} from "../../redux/Users-reducer";
import {Paginator} from "../Common/Paginator/Paginator";
import {User} from "./user";


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
    return (
        <div>
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       onPageChanged={props.onPageChanged}
                       currentPage={props.currentPage}/>
            <div>
                {
                    props.users.map((user: UserType) => <User user={user}
                                                              unfollowUser={props.unfollowUser}
                                                              followUser={props.followUser}
                                                              followingInProgress={props.followingInProgress}/>
                    )
                }
            </div>
        </div>
    )
}
