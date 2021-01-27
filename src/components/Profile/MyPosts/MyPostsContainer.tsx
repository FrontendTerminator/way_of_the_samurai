import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

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

let mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        onPostChange: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
}

export const MyPostsContainer: any = connect(mapStateToProps, mapDispatchToProps)(MyPosts)