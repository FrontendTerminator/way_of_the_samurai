import React, {Dispatch} from "react";
import {Users} from "./UsersClassComponent";
import {connect} from "react-redux";
import {followAC, setUsersAC, unfollowAC, UsersReducerActionType, UserType} from "../../redux/Users-reducer";
import {StateStoreType} from "../../redux/redux-store";

let mapStateToProps = (state: StateStoreType) => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch<UsersReducerActionType>) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)