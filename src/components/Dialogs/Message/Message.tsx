import React from "react";
import s from '../Dialogs.module.scss'


export type MessageType = {
    message: string
}

const Message: React.FC<MessageType> = (props) => {
    return (
        <div>
            <div className={s.message}>{props.message}</div>
        </div>
    )
}

export default Message;

