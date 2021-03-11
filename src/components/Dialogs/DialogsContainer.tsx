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
import {compose, Dispatch } from "redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state: StateStoreType) => {
    return {
        dialogsPage: state.dialogsPage,
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

export const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)




