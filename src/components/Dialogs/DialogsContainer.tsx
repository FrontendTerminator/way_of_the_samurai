import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import DialogItem, {DialogItemType} from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, DialogsType, MessagesType} from "../../redux/store";
import {addMessageActionCreator, addMessageInStateActionCreator} from "../../redux/Dialogs-reducer"
import {ReduxStoreType, StoreType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";

type DialogsPropsType = {
    // dialogsPage: DialogsPageType
    // dispatch: (action: ProfileActionType) => void
    store: StoreType
}

const DialogsContainer: React.FC<DialogsPropsType> = (props) => {

    let state = props.store.getState().dialogsPage

    const addNewMessage = () => {
        props.store.dispatch(addMessageInStateActionCreator())
    }

    const onChange = (newText: string) => {
        props.store.dispatch(addMessageActionCreator(newText))
    }

    return (
        <Dialogs
            addMessageActionCreator={onChange}
            addNewMessage={addNewMessage}
            dialogsPage={state}
        />
    )
}

export default DialogsContainer;

