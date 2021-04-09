import React from 'react';
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

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
    //newPostText: string
    profile: ProfileType | null
    status: string
}
export type ProfileReducerActionType =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof setUsersProfile> |
    ReturnType<typeof setStatus> |
    ReturnType<typeof deletePost>

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 11},
        {id: 2, message: "It's my first message", likesCount: 12},
        {id: 3, message: "Yo!", likesCount: 12},
        {id: 4, message: "Dada", likesCount: 12}
    ],
    //newPostText: 'new post...',
    profile: null,
    status: ""
}

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"
const DELETE_POST = "DELETE-POST"

const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducerActionType) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case "DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        default:
            return state
    }
}

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText}) as const

export const setUsersProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const

export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const

export const deletePost = (postId: number) => ({type: DELETE_POST, postId}) as const

// Thunk
export const getUserProfile = (userId: string) => {
    return (dispatch: Dispatch<ProfileReducerActionType>) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUsersProfile(response.data))
            })
    }
}

export const getStatus = (userId: string) => {
    return (dispatch: Dispatch<ProfileReducerActionType>) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
                //console.log(`thunk api: ${response.data}`)
            })
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: Dispatch<ProfileReducerActionType>) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}


export default profileReducer;