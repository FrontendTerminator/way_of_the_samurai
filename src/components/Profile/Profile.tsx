import React from "react";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import {ProfileType} from "../../redux/Profile-reducer";


type ProfileComponentType = {
    profile: ProfileType | null
}

const Profile: React.FC<ProfileComponentType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer
            />
        </div>
    )
}

export default Profile;