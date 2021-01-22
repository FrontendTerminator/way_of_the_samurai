import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";

type PostsArrayType = {
    id: number
    message: string
    likesCount: number
}
export type MyPostsType = {
    posts: Array<PostsArrayType>
    newPostText: string
    dispatch: (action: ActionType) => void
}
type AddPostType = {
    type: "ADD-POST"
}
type UpdateNewPostTextType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
}
export type ActionType = UpdateNewPostTextType | AddPostType

const MyPosts: React.FC<MyPostsType> = (props) => {
    let postsElements =
        props.posts.map((p: PostsArrayType) => <Post message={p.message} likes={p.likesCount}/>)

    let addPost = () => {
        // props.addPost(props.newPostText)
        props.dispatch(addPostActionCreator())
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        // props.updateNewPostText(text)
        props.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <div className={s.postBlock}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChange}
                        value={props.newPostText}
                        className={s.textarea}
                    />
                </div>
                <div>
                    <button
                        className={s.addPost}
                        onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;