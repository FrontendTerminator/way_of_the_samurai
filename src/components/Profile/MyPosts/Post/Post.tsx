import React from "react";
import s from "./Post.module.css";

type PostType = {
    message: string
    likes: number
}

const Post: React.FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfqBBnGW-ntm2BhRJQQJupmw5Gh5drIDnvA&usqp=CAU"/>
            { props.message }
            <div>
                <span>like {props.likes}</span>
            </div>
        </div>
    )
}

export default Post;