type LocationType = {
    city: string
    country: string
}
export type UserType = {
    id: number
    followed: boolean
    fullName: string
    status: string
    location: LocationType
    photoUrl: string
}
export type UsersReducerStateType = {
    users: Array<UserType>
}

export type UsersReducerActionType = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC>

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

let initialState: UsersReducerStateType = {
    users: []
}

const usersReducer = (state: UsersReducerStateType = initialState, action: UsersReducerActionType) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users}) as const // need to fix

export default usersReducer;