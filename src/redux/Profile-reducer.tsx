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
    profile: ProfileType | null
    status: string
    newPostText: string
}
export type ProfileReducerActionType =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 11},
        {id: 2, message: "It's my first message", likesCount: 12},
        {id: 3, message: "Yo!", likesCount: 12},
        {id: 4, message: "Dada", likesCount: 12}
    ],
    profile: null,
    status: "",
    newPostText: ""
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducerActionType): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST": {
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
        case "SET-STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case "SAVE-PHOTO-SUCCESS":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            }
        default:
            return state
    }
}

export const addPostActionCreator = (newPostText: string) => ({type: "ADD-POST", newPostText}) as const
export const setUsersProfile = (profile: ProfileType) => ({type: "SET-USER-PROFILE", profile}) as const
export const setStatus = (status: string) => ({type: "SET-STATUS", status}) as const
export const deletePost = (postId: number) => ({type: "DELETE-POST", postId}) as const
export const savePhotoSuccess = (photos: { small: string, large: string }) => ({
    type: "SAVE-PHOTO-SUCCESS",
    photos
}) as const

// Thunk
export const getUserProfile = (userId: string) => {
    return async (dispatch: Dispatch<ProfileReducerActionType>) => {
        const response = await usersAPI.getProfile(userId)
        dispatch(setUsersProfile(response.data))

    }
}
export const getStatus = (userId: string) => {
    return async (dispatch: Dispatch<ProfileReducerActionType>) => {
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}
export const updateStatus = (status: string) => {
    return async (dispatch: Dispatch<ProfileReducerActionType>) => {
        try {
            const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (error) {
            alert(error)
        }
    }
}
export const savePhoto = (file: File) => {
    return async (dispatch: Dispatch<ProfileReducerActionType>) => {
        const response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}


export default profileReducer;