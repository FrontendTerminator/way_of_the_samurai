import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import DialogItem, {DialogItemType} from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, DialogsType, MessagesType} from "../../redux/store";
import {addMessageActionCreator, addMessageInStateActionCreator} from "../../redux/Dialogs-reducer"
import {ReduxStoreType} from "../../redux/redux-store";

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    // dispatch: (action: ProfileActionType) => void
    addMessageActionCreator: (newText: string) => void
    addNewMessage: () => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map((d: DialogItemType) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map((m: MessagesType) => <Message message={m.message}/>)
    let newMessageBody = state.newMessage

    const addNewMessage = () => {
        props.addNewMessage()
    }

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value
        props.addMessageActionCreator(newText)
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

