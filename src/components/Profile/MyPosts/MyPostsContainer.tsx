import React, {Dispatch} from "react";
import {
    addPostActionCreator,
    ProfileReducerActionType,
} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {StateStoreType} from "../../../redux/redux-store";

let mapStateToProps = (state: StateStoreType) => {
    return {
        posts: state.profilePage.posts,
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionType>) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

