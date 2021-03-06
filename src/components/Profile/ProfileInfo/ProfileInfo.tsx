import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.scss"
import {ProfileType} from "../../../redux/Profile-reducer";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/user.jpg"
import {ProfileDataForm} from "./ProfileDataForm";


type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <div>loading</div>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div className={s.photoBlock}>
                    <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
                    {props.isOwner && <input type={"file"}
                                             className={s.inputFile}
                                             onChange={onMainPhotoSelected}/>}
                </div>
                <ProfileData goToEditMode={() => setEditMode(true)}
                             profile={props.profile}
                             status={props.status}
                             updateStatus={props.updateStatus}
                             isOwner={props.isOwner}/>
                {/*<ProfileStatusWithHooks status={props.status}
                                        updateStatus={props.updateStatus}
                />*/}
                {/*{editMode
                    ? <ProfileDataForm profile={props.profile}/>
                    : <ProfileData goToEditMode={() => setEditMode(true)}
                                   profile={props.profile}
                                   status={props.status}
                                   updateStatus={props.updateStatus}
                                   isOwner={props.isOwner}/>
                }*/}
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: any // FIX
    status: string
    updateStatus: (status: string) => void
}
export const ProfileData = (props: ProfileDataPropsType) => {
    return (
        <div className={s.profileData}>
            <div className={s.name}>
                {props.profile.fullName}
            </div>
            <ProfileStatusWithHooks status={props.status}
                                    updateStatus={props.updateStatus}/>
            {/*{props.isOwner && <div>
                <button onClick={props.goToEditMode}>edit</button>
            </div>}
            <div>
                <b>Full name</b>: {props.profile?.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {props.profile?.lookingForAJob ? "yes" : "no"}
            </div>
            {props.profile?.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {props.profile?.lookingForAJobDescription}
            </div>
            }

            <div>
                <b>About me</b>: {props.profile?.aboutMe}
            </div>
            <div>

                <b>Contacts</b>: {
                // @ts-ignore
                Object.keys(props.profile?.contacts).map(key => {
                    // @ts-ignore
                    return <Contact key={key} contactTitle={key} contactValue={props.profile?.contacts[key]}/>
                })}
            </div>*/}
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: any
}

export const Contact = (props: ContactPropsType) => {
    return <div className={s.contact}><b>{props.contactTitle}</b>: {props.contactValue}</div>
}

export default ProfileInfo;