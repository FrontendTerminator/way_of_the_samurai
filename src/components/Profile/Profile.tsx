import React from "react";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../redux/Profile-reducer";
import s from "./Profile.module.scss"
import {Preloader} from "../Common/Preloader/Preloader";

type ProfileComponentType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const Profile: React.FC<ProfileComponentType> = (props) => {
    return (
        <div className={s.profileGlobalBlock}>
            {!props.profile
                ? <div className={s.preloaderBlock}>
                    <Preloader/>
                  </div>
                : <div className={s.profileBlock}>
                    <ProfileInfo profile={props.profile}
                                 status={props.status}
                                 updateStatus={props.updateStatus}
                                 isOwner={props.isOwner}
                                 savePhoto={props.savePhoto}
                    />
                    <MyPostsContainer/>
                </div>
            }
        </div>

    )
}

export default Profile;