import React from "react";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../../redux/Profile-reducer";
import {Preloader} from "../../../Common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";


type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<div>
                <img src="https://lh5.googleusercontent.com/oDUgUwudwBlIQ3WSyBE3gZ58_tqhKTDBkic65snFp2x5ZKamuzmyfG-WqYI8AC5vl1iu4RAZhW7JdwnCdyW0lA5RNyCbA5XjW6dBVcHw1hPbYZ1yGX82YIH2pWi4JdgFY38VPPd4"/>
            </div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
            <div>
                Обо мне: {props.profile.aboutMe}
            </div>
        </div>
    )
}

export default ProfileInfo;