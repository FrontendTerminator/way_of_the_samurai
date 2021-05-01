import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import {Button} from "../../Common/Button/Button";

type PostsArrayType = {
    id: number
    message: string
    likesCount: number
}
export type MyPostsType = {
    posts: Array<PostsArrayType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MyPostsType> = React.memo((props) => {

    let postsElements =
        props.posts.map((p: PostsArrayType) => <Post message={p.message} likes={p.likesCount}/>)

    const addPost = (value: MyPostsFormType) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={s.postBlock}>
            <div>
                <MyPostsFormRedux onSubmit={addPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts;

type MyPostsFormType = {
    newPostText: string
}

/*const maxLength10 = maxLengthCreator(10)*/

const AddNewPostsForm: React.FC<InjectedFormProps<MyPostsFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   className={s.textarea}
                   name={"newPostText"}
                   placeholder={"new post"}
                   /*validate={[required, maxLength10]}*/
            />
            <div>
                <Button text={"Add"} />
            </div>
        </form>
    )
}

const MyPostsFormRedux = reduxForm<MyPostsFormType>({form: "ProfileAddPostForm"})(AddNewPostsForm)