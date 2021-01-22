import React from "react";
import s from "./Profile.module.css";
import MyPosts, {ActionType} from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/store";

type ProfileType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionType) => void
}

const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     // addPost={props.addPost}
                     dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;