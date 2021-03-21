import {StateStoreType} from "./redux-store";

export const getUsers = (state: StateStoreType) => {
    return state.usersPage.users
}
export const getPageSize = (state: StateStoreType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: StateStoreType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: StateStoreType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: StateStoreType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: StateStoreType) => {
    return state.usersPage.followingInProgress
}





