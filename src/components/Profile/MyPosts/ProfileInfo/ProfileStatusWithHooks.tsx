import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./ProfileInfo.module.css"

type ProfileInfoType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<ProfileInfoType> = (props) => {

    //console.log('render')

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

/*  console.log(`props.status + ${props.status}`)
    console.log(`status + ${status}`)*/

    useEffect(() => {
        //console.log("Effect")
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || '-----'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input
                    onChange={onStatusChange}
                    autoFocus={true}
                    onBlur={deactivateEditMode}
                    value={status}
                />
            </div>
            }
        </div>
    )
}