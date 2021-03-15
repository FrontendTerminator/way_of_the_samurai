import React from "react";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import {ProfileType} from "../../redux/Profile-reducer";


type ProfileComponentType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const Profile: React.FC<ProfileComponentType> = (props) => {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer
            />
        </div>
    )
}

export default Profile;