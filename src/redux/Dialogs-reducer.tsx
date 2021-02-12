export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}
export type DialogsPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
    newMessage: string
}

export type DialogsReducerActionType =
    ReturnType<typeof addMessageInStateActionCreator> |
    ReturnType<typeof addMessageActionCreator>

let initialState = {
    messages: [
        {id: 1, message: "hi"},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'yo'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'},
    ],
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    newMessage: 'new message'
}

const ADD_POST_ACTION_CONTAINER = "ADD-POST-ACTION-CONTAINER"
const ADD_MESSAGE = "ADD-MESSAGE"

const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsReducerActionType) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                newMessage: action.newText
            }
            // let stateCopy = {...state}
            // stateCopy.newMessage = action.newText;
            // return stateCopy
        case ADD_POST_ACTION_CONTAINER:
            let newMessageCopy = state.newMessage
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: newMessageCopy}],
                newMessage: ""
            }
            // let stateCopy = {...state}
            // let newMessageObj = {id: 7, message: state.newMessage}
            // stateCopy.messages = [...state.messages]
            // stateCopy.messages.push(newMessageObj)
            // stateCopy.newMessage = ''
            // return stateCopy
        default:
            return state
    }
}

export const addMessageInStateActionCreator = () => ({type: ADD_POST_ACTION_CONTAINER}) as const

export const addMessageActionCreator = (text: string) =>
    ({type: ADD_MESSAGE, newText: text}) as const

export default dialogsReducer;

