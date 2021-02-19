import React from "react";
import {connect} from "react-redux";
import {
    follow, setCurrentPage, setUsers,
    setUsersTotalCount, toggleIsFetching, toggleIsFollowingProgress, unfollow,
    UserType
} from "../../redux/Users-reducer";
import {StateStoreType} from "../../redux/redux-store";
import {Users} from "./users";
import {Preloader} from "../Common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

type UsersPagePropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setUsersTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress: (isFetching: boolean, id: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
// Типизация классовой компоненты. Первый параметр - типизация пропсов, второй - типизация стейта.
// Пропсы конструктора типизируем как и пропсы компоненты.

class UsersContainer extends React.Component<UsersPagePropsType, Array<UserType>> {

    constructor(props: UsersPagePropsType) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching(true)

            usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setUsersTotalCount(data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }

}

let mapStateToProps = (state: StateStoreType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export const UsersContainerContext = connect(mapStateToProps,
    {
        follow, unfollow, setUsers, setCurrentPage,
        setUsersTotalCount, toggleIsFetching, toggleIsFollowingProgress
    })(UsersContainer)