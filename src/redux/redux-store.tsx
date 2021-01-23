import {combineReducers, createStore } from "redux";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sidebarReducer from "./Sidebar-reducer";

type ReducersType = typeof reducers // тип стейта
export type ReduxStoreType = ReturnType<ReducersType> // типизация

export type StoreType = typeof store //

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
})

export let store = createStore(reducers)

const a:ReduxStoreType = store.getState();


