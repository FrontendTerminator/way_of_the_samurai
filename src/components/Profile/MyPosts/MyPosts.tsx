import React, {ChangeEvent} from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

type PostsArrayType = {
    id: number
    message: string
    likesCount: number
}
export type MyPostsType = {
    posts: Array<PostsArrayType>
    newPostText: string
    onPostChange: (text: string) => void
    addPost: () => void
}

const MyPosts: React.FC<MyPostsType> = (props) => {
    let postsElements =
        props.posts.map((p: PostsArrayType) => <Post message={p.message} likes={p.likesCount}/>)

    let onAddPost = () => {
        props.addPost()
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.onPostChange(text)
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
                        onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;