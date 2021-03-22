import {StateStoreType} from "./redux-store";
import {createSelector} from "reselect";

export const getUsers = (state: StateStoreType) => {
    return state.usersPage.users
}

// Reselect, используется для селекторов со сложной трудозатратной логикой, чтобы при изменении стейта не выполнять лишний раз логику и не тратить на это память
// в createSelector первым параметров передаём простой селектор который возвращает из редакса ту его часть, которую
// примет колбэк реселекта. И реслект запишет это состояние в зависимость. Если в стейте оно не меняется, то тогда логика
// селектора не будет выполнятся.

export const getUsersFromReselectLibrary = createSelector(getUsers, (users)=>{
    return users.filter(u => true)
})

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





