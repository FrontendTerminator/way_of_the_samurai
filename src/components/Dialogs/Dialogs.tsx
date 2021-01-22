import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, DialogsType, MessagesType} from "../../redux/state";
import {addMessageActionCreator, addMessageInStateActionCreator} from "../../redux/Dialogs-reducer"


type AddPostActionContainerType = {
    type: "ADD-POST-ACTION-CONTAINER"
}
type AddMessageType = {
    type: "ADD-MESSAGE"
    newText: string
}
type ProfileActionType = AddMessageType | AddPostActionContainerType

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: ProfileActionType) => void
}


const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map((d: DialogsType) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map((m: MessagesType) => <Message message={m.message}/>)
    let newMessageBody = props.dialogsPage.newMessage

    const addNewMessage = () => {
        props.dispatch(addMessageInStateActionCreator())
    }

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value
        props.dispatch(addMessageActionCreator(newText))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea
                    value={newMessageBody}
                    onChange={onChange}
                />
                <button onClick={addNewMessage}>add</button>
            </div>
        </div>
    )
}

export default Dialogs;

