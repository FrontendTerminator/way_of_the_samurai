import React, {Dispatch} from "react";
import {
    addMessageActionCreator,
    addMessageInStateActionCreator,
    DialogsPageType,
    DialogsReducerActionType
} from "../../redux/Dialogs-reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StateStoreType} from "../../redux/redux-store";

let mapStateToProps = (state: StateStoreType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch<DialogsReducerActionType>) => {
    return {
        addNewMessage: () => {
            dispatch(addMessageInStateActionCreator())
        },
        onChange: (newText: string) => {
            dispatch(addMessageActionCreator(newText))
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)



