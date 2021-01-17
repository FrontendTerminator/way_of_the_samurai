type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}
type FriendsType = {
    id: number
    name: string
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type DialogsPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
    newMessage: string
}
type SidebarType = {
    friends: Array<FriendsType>
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType

}
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType //
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: DispatchActionType) => void
}
export type DispatchActionType =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof updateNewPostTextActionCreator> |
    ReturnType<typeof addMessageInStateActionCreator> |
    ReturnType<typeof addMessageActionCreator>

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const ADD_POST_ACTION_CONTAINER = "ADD-POST-ACTION-CONTAINER"
const ADD_MESSAGE = "ADD-MESSAGE"

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 11},
                {id: 2, message: "It's my first message", likesCount: 12},
                {id: 3, message: "Blabla", likesCount: 12},
                {id: 4, message: "Dada", likesCount: 12}
            ],
            newPostText: 'new post...'
        },
        dialogsPage: {
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
        },
        sidebar: {
            friends: [
                {id: 1, name: "Andrew"},
                {id: 2, name: "Sasha"},
                {id: 3, name: "Sveta"}
            ]
        }
    },
    _callSubscriber() {
        console.log('state was changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer

    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost: PostsType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ""
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber()
        } else if (action.type === ADD_POST_ACTION_CONTAINER) {
            let newMessageObj: MessagesType = {id: 7, message: this._state.dialogsPage.newMessage}
            this._state.dialogsPage.messages.push(newMessageObj)
            this._state.dialogsPage.newMessage = ''
            this._callSubscriber()
        } else if (action.type === ADD_MESSAGE) {
            this._state.dialogsPage.newMessage = action.newText;
            this._callSubscriber()
        }
    }
}

export const addPostActionCreator = () => ({type: ADD_POST}) as const

export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const

export const addMessageInStateActionCreator = () => ({type: ADD_POST_ACTION_CONTAINER}) as const

export const addMessageActionCreator = (text: string) =>
    ({type: "ADD-MESSAGE", newText: text}) as const




