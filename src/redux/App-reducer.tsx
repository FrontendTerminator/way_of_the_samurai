import {getAuthUserData} from "./Auth-reducer";
import {ThunkAction} from "redux-thunk";
import {StateStoreType} from "./redux-store";


const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

type AppReducerStateType = {
    initialized: boolean
}
type AppReducerActionType = ReturnType<typeof initializedSuccess>

let initialState: AppReducerStateType = {
    initialized: false
}

export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerActionType): AppReducerStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = (): AppReducerThunkType => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData())
        promise.then(() => {
            dispatch(initializedSuccess())
        })
    }
}

type AppReducerThunkType<ReturnType = void> = ThunkAction<ReturnType, StateStoreType, unknown, AppReducerActionType>;

/*
да там все просто, первый агршумент, это тип которые санка, ПОТЕНЦИАЛЬНО будет возвращать, второй Состояние
приложения, третий это доп параметры, которые санка принемает, не считая диспатча, а 4-й это все экшены которые
ей разрешено диспатчить. Если собрать все экшенны со всего АПП и передать их в типизацию санки, то получишь
универсальную типизацию санки для всего АПП
*/

