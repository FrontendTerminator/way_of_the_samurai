import {combineReducers, createStore } from "redux";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sidebarReducer from "./Sidebar-reducer";
import usersReducer from "./Users-reducer";

type ReducersType = typeof reducers // тип стейта
export type StateStoreType = ReturnType<ReducersType> // типизация

export type StoreType = typeof store // типизация всего стора

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
})

export let store = createStore(reducers)





