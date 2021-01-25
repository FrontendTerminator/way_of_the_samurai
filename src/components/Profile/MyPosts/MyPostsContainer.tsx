import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {StoreType} from "../../../redux/redux-store";
import StoreContext from "../../../StoreContext";

export type MyPostsType = {
    // store: StoreType
}

const MyPostsContainer: React.FC<MyPostsType> = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState()

                let addPost = () => {
                    store.dispatch(addPostActionCreator())
                }
                let onPostChange = (text: string) => {
                    store.dispatch(updateNewPostTextActionCreator(text))
                }

                return <MyPosts
                    addPost={addPost}
                    updateNewPostText={onPostChange}
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
                />
            }}
        </StoreContext.Consumer>

    )
}

export default MyPostsContainer;