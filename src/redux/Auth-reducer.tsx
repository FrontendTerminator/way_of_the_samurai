import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {FormAction} from "redux-form";
import {StateStoreType} from "./redux-store";
import { ThunkAction } from "redux-thunk";

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
                ...action.payload
            }
        }
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}}) as const

//Thunk
export const getAuthUserData = () => {
    return (dispatch: Dispatch<AuthReducerActionType>) => {
        authAPI.auth()
            .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AuthReducerThunkT => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                }
            })
    }
}

export const logout = (): AuthReducerThunkT => {
    return (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
    }
}

export default authReducer;


type AuthReducerThunkT<ReturnType = void> = ThunkAction<ReturnType, StateStoreType, unknown, AuthReducerActionType | FormAction>;

/*
да там все просто, первый агршумент, это тип которые санка, ПОТЕНЦИАЛЬНО будет возвращать, второй Состояние
приложения, третий это доп параметры, которые санка принемает, не считая диспатча, а 4-й это все экшены которые
ей разрешено диспатчить. Если собрать все экшенны со всего АПП и передать их в типизацию санки, то получишь
универсальную типизацию санки для всего АПП
*/