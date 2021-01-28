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

// const DialogsContainer: React.FC<DialogsPropsType> = () => {
//
//     return <StoreContext.Consumer>
//         {(store) => {
//             let state = store.getState().dialogsPage
//
//             const addNewMessage = () => {
//                 store.dispatch(addMessageInStateActionCreator())
//             }
//             const onChange = (newText: string) => {
//                 store.dispatch(addMessageActionCreator(newText))
//             }
//             return <Dialogs
//                 addMessageActionCreator={onChange}
//                 addNewMessage={addNewMessage}
//                 dialogsPage={state}
//             />
//         }}
//     </StoreContext.Consumer>
// }

// type MapStateToPropsType = {
//     dialogsPage: DialogsPageType
// }
// type MapDispatchToPropsType = {
//     addNewMessage: () => void
//     onChange: (newText: string) => void
// }

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



