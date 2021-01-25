import React from "react";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {StateStoreType, StoreType} from "../../redux/redux-store";

type ProfileType = {
    // store: StoreType
    // profilePage: ProfilePageType
    // dispatch: (action: ActionType) => void
}

const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                // store={props.store}
                // posts={props.profilePage.posts}
                // newPostText={props.profilePage.newPostText}
                // dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;