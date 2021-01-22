import React from 'react';
import {DispatchActionType, ProfilePageType} from "./state";

export type CType = ReturnType<typeof addPostActionCreator>
export type DType = ReturnType<typeof updateNewPostTextActionCreator>

// export type ProfileReducerActionType =
//     ReturnType<typeof addPostActionCreator> |
//     ReturnType<typeof updateNewPostTextActionCreator>

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

const profileReducer = (state: ProfilePageType, action: DispatchActionType) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ""
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST}) as const

export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const

export default profileReducer;