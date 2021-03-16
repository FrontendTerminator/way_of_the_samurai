import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";

type PostsArrayType = {
    id: number
    message: string
    likesCount: number
}
export type MyPostsType = {
    posts: Array<PostsArrayType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MyPostsType> = (props) => {
    let postsElements =
        props.posts.map((p: PostsArrayType) => <Post message={p.message} likes={p.likesCount}/>)

    const addPost = (value: MyPostsFormType) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={s.postBlock}>
            <h3>My post</h3>
            <div>
                <MyPostsFormRedux onSubmit={addPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;

type MyPostsFormType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10)

const AddNewPostsForm: React.FC<InjectedFormProps<MyPostsFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   className={s.textarea}
                   name={"newPostText"}
                   placeholder={"new post"}
                   validate={[required, maxLength10]}
            />
            <div>
                <button className={s.addPost}>add</button>
            </div>
        </form>
    )
}

const MyPostsFormRedux = reduxForm<MyPostsFormType>({form: "ProfileAddPostForm"})(AddNewPostsForm)