import React from "react";
import {addMessageActionCreator, addMessageInStateActionCreator} from "../../redux/Dialogs-reducer"
import {StoreType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

type DialogsPropsType = {
    // store: StoreType
}

const DialogsContainer: React.FC<DialogsPropsType> = () => {

    return <StoreContext.Consumer>
        {(store) => {
            let state = store.getState().dialogsPage

            const addNewMessage = () => {
                store.dispatch(addMessageInStateActionCreator())
            }
            const onChange = (newText: string) => {
                store.dispatch(addMessageActionCreator(newText))
            }
            return <Dialogs
                addMessageActionCreator={onChange}
                addNewMessage={addNewMessage}
                dialogsPage={state}
            />
        }}
    </StoreContext.Consumer>
}

export default DialogsContainer;

