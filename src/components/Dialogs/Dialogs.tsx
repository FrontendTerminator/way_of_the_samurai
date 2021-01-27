import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import DialogItem, {DialogItemType} from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, MessagesType} from "../../redux/Dialogs-reducer";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    onChange: (newText: string) => void
    addNewMessage: () => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map((d: DialogItemType) => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map((m: MessagesType) => <Message message={m.message} key={m.id}/>)
    let newMessageBody = state.newMessage

    const addNewMessage = () => {
        props.addNewMessage()
    }

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value
        props.onChange(newText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                <textarea
                    value={newMessageBody}
                    onChange={onChange}
                />
                </div>
                <div>
                    <button onClick={addNewMessage}>add</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;

