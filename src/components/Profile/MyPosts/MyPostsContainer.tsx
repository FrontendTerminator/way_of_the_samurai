import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {ReduxStoreType, StoreType} from "../../../redux/redux-store";

export type MyPostsType = {
    // posts: Array<PostsArrayType>
    // newPostText: string
    // dispatch: (action: ActionType) => void
    store: StoreType
}

const MyPostsContainer: React.FC<MyPostsType> = (props) => {
    let state = props.store.getState()

    let addPost = () => {
        props.store.dispatch(addPostActionCreator())


    }

    let onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostTextActionCreator(text))

    }

    return (
        <div>
            <MyPosts
                addPost={addPost}
                updateNewPostText={onPostChange}
                posts={state.profilePage.posts}
                newPostText={state.profilePage.newPostText}

            />
        </div>
    )
}

export default MyPostsContainer;