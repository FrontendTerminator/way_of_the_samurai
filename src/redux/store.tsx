import profileReducer, {ProfileReducerActionType} from "./Profile-reducer";
import dialogsReducer, {DialogsReducerActionType} from "./Dialogs-reducer";
import sidebarReducer from "./Sidebar-reducer";

type PostsType = {
    id: number
    message: string
    likesCount: number
}
type MessagesType = {
    id: number
    message: string
}
type DialogsType = {
    id: number
    name: string
}
type FriendsType = {
    id: number
    name: string
}
type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
type DialogsPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
    newMessage: string
}
type SidebarType = {
    friends: Array<FriendsType>
}
type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType

}
type StoreType = {
    _state: RootStateType
    getState: () => RootStateType //
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: any) => void
}

type DispatchActionType =
    ProfileReducerActionType |
    DialogsReducerActionType

let store: StoreType = {
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
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber()
    }
}





