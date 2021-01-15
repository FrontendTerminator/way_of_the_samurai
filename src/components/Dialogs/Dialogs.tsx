import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, DialogsType, MessagesType} from "../../redux/state";

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addMessage: (newText: string) => void
    addMessageInState: () => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map((d: DialogsType) => <DialogItem name={d.name} id={d.id}/> )
    let messagesElements = props.dialogsPage.messages.map( (m: MessagesType) => <Message message={m.message}/>)

    const addNewMessage = () => {
        props.addMessageInState()
    }

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value
        props.addMessage(newText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea
                    value={props.dialogsPage.newMessage}
                    onChange={onChange}
                />
                <button onClick={addNewMessage}>add</button>
            </div>
        </div>
    )
}

export default Dialogs;

