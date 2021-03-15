import {applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sidebarReducer from "./Sidebar-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./Auth-reducer";
import thunkMiddleware from "redux-thunk"; // yarn add redux-thunk по дефолту импортирует thunk, а не (thunkMiddleware). Передаём вторым параметром в createStore, чтобы стор смог обрабатывать thunks.
import { reducer as formReducer } from 'redux-form'

// type ReducersType = typeof reducers // тип стейта
export type StateStoreType = ReturnType<typeof reducers> // тип стейта

export type StoreType = typeof store // типизация всего стора

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

export let store = createStore(reducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store




