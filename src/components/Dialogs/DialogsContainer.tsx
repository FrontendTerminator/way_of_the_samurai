import React from "react";
import {
    addMessageInStateActionCreator,
    DialogsReducerActionType
} from "../../redux/Dialogs-reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {StateStoreType} from "../../redux/redux-store";
import {compose, Dispatch } from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state: StateStoreType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch<DialogsReducerActionType>) => {
    return {
        addNewMessage: (newMessageBody: string) => {
            dispatch(addMessageInStateActionCreator(newMessageBody))
        }
    }
}

export const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)




