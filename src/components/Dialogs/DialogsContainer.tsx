import React from "react";
import {
    addMessageActionCreator,
    addMessageInStateActionCreator,
    DialogsPageType,
    DialogsReducerActionType
} from "../../redux/Dialogs-reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StateStoreType} from "../../redux/redux-store";
import { Dispatch } from "redux";

let mapStateToProps = (state: StateStoreType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
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



