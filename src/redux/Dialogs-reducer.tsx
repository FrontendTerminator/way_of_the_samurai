import React from 'react';
import {DialogsPageType, DispatchActionType} from "./state";

export type AType = ReturnType<typeof addMessageInStateActionCreator>
export type BType = ReturnType<typeof addMessageActionCreator>

// export type DialogsReducerActionType =
//     ReturnType<typeof addMessageInStateActionCreator> |
//     ReturnType<typeof addMessageActionCreator>

const ADD_POST_ACTION_CONTAINER = "ADD-POST-ACTION-CONTAINER"
const ADD_MESSAGE = "ADD-MESSAGE"

const dialogsReducer = (state: DialogsPageType, action: DispatchActionType) => {
    switch (action.type) {
        case ADD_POST_ACTION_CONTAINER:
            let newMessageObj = {id: 7, message: state.newMessage}
            state.messages.push(newMessageObj)
            state.newMessage = ''
            return state
        case ADD_MESSAGE:
            state.newMessage = action.newText;
            return state
        default:
            return state
    }
}

export const addMessageInStateActionCreator = () => ({type: ADD_POST_ACTION_CONTAINER}) as const

export const addMessageActionCreator = (text: string) =>
    ({type: ADD_MESSAGE, newText: text}) as const

export default dialogsReducer;