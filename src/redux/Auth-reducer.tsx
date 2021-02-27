import {Dispatch} from "redux";
import axios from "axios";
import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

type AuthReducerStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type AuthReducerActionType = ReturnType<typeof setAuthUserData>

let initialState: AuthReducerStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: AuthReducerStateType = initialState, action: AuthReducerActionType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}

export const setAuthUserData = (userId: number, email: string, login: string) =>
    ({type: SET_USER_DATA, data: {userId, email, login}}) as const

export const getAuthUserData = () => {
    return (dispatch: Dispatch<AuthReducerActionType>) => {
        authAPI.auth().then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }
}

export default authReducer;