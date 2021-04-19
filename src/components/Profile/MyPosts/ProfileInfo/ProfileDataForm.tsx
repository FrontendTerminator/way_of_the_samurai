import {ProfileType} from "../../../../redux/Profile-reducer";
import React from "react";
import {Field} from "redux-form";

type ProfileDataFormPropsType = {
    profile: ProfileType
    //goToEditMode: any // fix
}
export const ProfileDataForm = (props: ProfileDataFormPropsType) => {
    return <form>
        <div><button onClick={()=>{}}>save</button></div>
        <div>
            <b>Full name</b>: {<div>
            {/*<Field placeholder={} name={} />*/}
            </div>}
        </div>
        <div>
            <b>Looking for a job</b>: {props.profile?.lookingForAJob ? "yes" : "no"}
        </div>
        {props.profile?.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {props.profile?.lookingForAJobDescription}
        </div>
        }
    </form>
}