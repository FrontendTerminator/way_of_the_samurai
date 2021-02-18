import {combineReducers, createStore } from "redux";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sidebarReducer from "./Sidebar-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./Auth-reducer";

// type ReducersType = typeof reducers // тип стейта
export type StateStoreType = ReturnType<typeof reducers> // тип стейта

export type StoreType = typeof store // типизация всего стора

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export let store = createStore(reducers)

// @ts-ignore
window.store = store




