import React from 'react';
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: null //
        vk: string
        twitter: string
        instagram: string
        youtube: null //
        github: string
        mainLink: null
    },
    lookingForAJob: true,
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
    profile: ProfileType | null
}
export type ProfileReducerActionType =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof updateNewPostTextActionCreator>|
    ReturnType<typeof setUsersProfile>

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 11},
        {id: 2, message: "It's my first message", likesCount: 12},
        {id: 3, message: "Yo!", likesCount: 12},
        {id: 4, message: "Dada", likesCount: 12}
    ],
    newPostText: 'new post...',
    profile: null
}

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_USER_PROFILE = "SET-USER-PROFILE"

const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducerActionType) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE:{
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST}) as const

export const setUsersProfile = (profile: ProfileType) =>
    ({type: SET_USER_PROFILE, profile}) as const

export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const

// Thunk
export const getUserProfile = (userId: string) => {
    return (dispatch: Dispatch<ProfileReducerActionType>) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUsersProfile(response.data))
            })
    }
}

export default profileReducer;