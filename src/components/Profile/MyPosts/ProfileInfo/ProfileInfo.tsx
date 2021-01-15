import React from "react";
import s from "./ProfileInfo.module.css"

const ProfileInfo: React.FC = () => {
    return (
        <div>
            <div>
                <img src="https://lh5.googleusercontent.com/oDUgUwudwBlIQ3WSyBE3gZ58_tqhKTDBkic65snFp2x5ZKamuzmyfG-WqYI8AC5vl1iu4RAZhW7JdwnCdyW0lA5RNyCbA5XjW6dBVcHw1hPbYZ1yGX82YIH2pWi4JdgFY38VPPd4"/>
            </div>
            <div className={s.descriptionBlock}>
                ava
            </div>
        </div>
    )
}

export default ProfileInfo;