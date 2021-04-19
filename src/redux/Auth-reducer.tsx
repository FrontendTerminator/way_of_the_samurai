import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {FormAction} from "redux-form";
import {StateStoreType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form"

type AuthReducerStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
type AuthReducerActionType =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof getCaptchaUrlSuccess>

let initialState: AuthReducerStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state: AuthReducerStateType = initialState, action: AuthReducerActionType): AuthReducerStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
        case "GET-CAPTCHA-URL-SUCCESS":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: "SET_USER_DATA", payload: {userId, email, login, isAuth}}) as const
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: "GET-CAPTCHA-URL-SUCCESS",
    payload: {captchaUrl}
}) as const


export const getAuthUserData = () => async (dispatch: Dispatch<AuthReducerActionType>) => {
    let response = await authAPI.auth()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AuthReducerThunkT => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            /* action creator из библиотеки redux form для ошибки в введённых данных. Прекращает отправку форм
            первым параметром передаем какую форму мы останавливаем, вторым свойством (email) передаём проблемное поле которое вызвало ошибку
            если я введу неправильный меил то мне подсветит ошибку
            Общая ошибка для всей формы _error. Также есть общая ошибка для не правильно введёных данных, которая задиспачит её в стейт и через пропсы мы потом сможем вывести содержимое это ошибки */
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
            let action = stopSubmit("login", {_error: message})
            dispatch(action)
        }
    }
}
export const getCaptchaUrl = () => {
    return async (dispatch: Dispatch<AuthReducerActionType>) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
}
export const logout = (): AuthReducerThunkT => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
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