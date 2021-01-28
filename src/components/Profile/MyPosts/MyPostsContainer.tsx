import React, {Dispatch} from "react";
import {
    addPostActionCreator,
    ProfileReducerActionType,
    updateNewPostTextActionCreator
} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {StateStoreType} from "../../../redux/redux-store";

let mapStateToProps = (state: StateStoreType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionType>) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        onPostChange: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

// export type MyPostsType = {
//     // store: StoreType
// }
//
// const MyPostsContainer: React.FC<MyPostsType> = () => {
//
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState()
//
//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator())
//                 }
//                 let onPostChange = (text: string) => {
//                     store.dispatch(updateNewPostTextActionCreator(text))
//                 }
//
//                 return <MyPosts
//                     addPost={addPost}
//                     updateNewPostText={onPostChange}
//                     posts={state.profilePage.posts}
//                     newPostText={state.profilePage.newPostText}
//                 />
//             }}
//         </StoreContext.Consumer>
//
//     )
// }
//
// export default MyPostsContainer;