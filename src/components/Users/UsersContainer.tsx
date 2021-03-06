import React from "react";
import {connect} from "react-redux";
import {
    followUser, requestUsers, setCurrentPage, unfollowUser,
    UserType
} from "../../redux/Users-reducer";
import {StateStoreType} from "../../redux/redux-store";
import {Users} from "./users";
import {Preloader} from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFromReselectLibrary
} from "../../redux/users-selectors";
import style from "./UsersContainer.module.scss"


type UsersPagePropsType = {
    users: Array<UserType>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    getUsers: (currentPage: number, pageSize: number) => void
}
// Типизация классовой компоненты. Первый параметр - типизация пропсов, второй - типизация стейта.
// Пропсы конструктора типизируем как и пропсы компоненты.

class UsersContainer extends React.Component<UsersPagePropsType, Array<UserType>> {

    constructor(props: UsersPagePropsType) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <div className={style.preloaderBlock}>
                        <Preloader/>
                     </div>
                    : <Users
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        onPageChanged={this.onPageChanged}
                        followUser={this.props.followUser}
                        unfollowUser={this.props.unfollowUser}
                        followingInProgress={this.props.followingInProgress}
                    />
                }
            </>
        )
    }

}

let mapStateToProps = (state: StateStoreType) => {
    return {
        users: getUsersFromReselectLibrary
        (
            state
        ),
        pageSize: getPageSize
        (
            state
        ),
        totalUsersCount: getTotalUsersCount
        (
            state
        ),
        currentPage: getCurrentPage
        (
            state
        ),
        isFetching: getIsFetching
        (
            state
        ),
        followingInProgress: getFollowingInProgress
        (
            state
        )
    }
}

const UsersContainerContext = compose
    < React.ComponentType > (
        //withAuthRedirect,
        connect(mapStateToProps, {unfollowUser, followUser, setCurrentPage, getUsers: requestUsers})
    )(UsersContainer)

export default UsersContainerContext

// // withAuthRedirect - custom Hoc from folder hoc
// export const UsersContainerContext = withAuthRedirect(connect(mapStateToProps,
// {
//         unfollowUser, followUser, setCurrentPage, getUsers
//     })(UsersContainer))