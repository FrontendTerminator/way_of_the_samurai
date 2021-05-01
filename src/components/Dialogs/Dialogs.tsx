import React from "react";
import s from './Dialogs.module.scss'
import DialogItem, {DialogItemType} from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, MessagesType} from "../../redux/Dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addNewMessage: (newMessageBody: string) => void
    isAuth: boolean
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map((d: DialogItemType) => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map((m: MessagesType) => <Message message={m.message} key={m.id}/>)

    const addMessage = (values: AddMessageFormType) => {
        props.addNewMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addMessage}/>
        </div>
    )
}

export default Dialogs;

type AddMessageFormType = {
    newMessageBody: string
}

const maxLength = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    validate={[required, maxLength]}
                    name={"newMessageBody"}
                    placeholder={"enter your message"}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<AddMessageFormType>({
    form: "dialogMessageForm"
})(AddMessageForm)
